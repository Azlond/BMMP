/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {
}

var map; // tilemap, for the platforms
var player; // the player char itself
var jumpTimer = 0;

play.prototype = {

	create : function() {

		// Physics for the platforms
		game.physics.startSystem(Phaser.Physics.P2JS);

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// the background of the first level
		var background = game.add.image(0, 0, 'background');

		/*
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		var map = game.add.tilemap('level1');

		// the second parameter needs to be the same as the one used in
		// loading.js
		map.addTilesetImage('fmap-tiles', 'fmap-tiles');

		map.setCollisionBetween(1, 36);

		// the parameter can be found in the json file
		var layer = map.createLayer('world1');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();

		// convert tiles into bodies to interact with
		game.physics.p2.convertTilemap(map, layer);

		game.physics.p2.restitution = 0.2;
		game.physics.p2.gravity.y = 400;

		/*
		 * adds the character
		 */
		player = game.add.sprite(25, 320, 'char');
		game.physics.enable(player, Phaser.Physics.P2JS);

		game.camera.follow(player);

	},

	update : function() {

		if (cursors.left.isDown) {
			player.body.moveLeft(200);
		} else if (cursors.right.isDown) {
			player.body.moveRight(200);
		} else {
			player.body.velocity.x = 0;
		}

		if (cursors.up.isDown && game.time.now > jumpTimer && checkIfCanJump()) {
			player.body.moveUp(300);
			jumpTimer = game.time.now + 750;
		}
	}

};

/*
 * from phaser.io/examples/v2/p2-physics/tilemap-gravity
 */

function checkIfCanJump() {

	var yAxis = p2.vec2.fromValues(0, 1);
	var result = false;

	for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
		var c = game.physics.p2.world.narrowphase.contactEquations[i];

		if (c.bodyA === player.body.data || c.bodyB === player.body.data) {
			var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
			if (c.bodyA === player.body.data)
				d *= -1;
			if (d > 0.5)
				result = true;
		}
	}

	return result;

}