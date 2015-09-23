/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {
}

var map; // tilemap, for the platforms
var player; // the player char itself
var jumpTimer = 0;
var layer;

play.prototype = {

	create : function() {

		// Physics for the platforms
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.physics.arcade.gravity.y = 300;

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// the background of the first level
		var background = game.add.image(0, 0, 'background');

		/*
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		map = game.add.tilemap('level1');

		// the second parameter needs to be the same as the one used in
		// loading.js
		map.addTilesetImage('fmap-tiles', 'fmap-tiles');
		map.addTilesetImage('coin', 'coin');

		map.setCollisionBetween(1, 73);

		map.setTileIndexCallback(73, hitCoin, this);

		// the parameter can be found in the json file
		layer = map.createLayer('world1');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();

		/*
		 * adds the character
		 */
		player = game.add.sprite(25, 255, 'char');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;
		player.body.maxVelocity.y = 500;

		game.camera.follow(player);

	},

	update : function() {

		game.physics.arcade.collide(player, layer);

		/*
		 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
		 */
		if (cursors.left.isDown) {
			player.body.velocity.x = -175;
		} else if (cursors.right.isDown) {
			player.body.velocity.x = 175;
		} else {
			player.body.velocity.x = 0;
		}

		if (cursors.up.isDown && player.body.onFloor()
				&& game.time.now > jumpTimer) {
			player.body.velocity.y = -700;
			jumpTimer = game.time.now + 750;
		}

	}
};

function hitCoin(player, tile) {

//	tile.alpha = 0.2;

//	layer.dirty = true;

	console.log("coin");

	return false;

}