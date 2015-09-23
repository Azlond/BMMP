/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {
}

var map; // tilemap, for the platforms
var jumpTimer = 0;
var layer;

var lifeCounter = 3;

play.prototype = {

	create : function() {

		// Physics for the platforms
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.game.physics.arcade.gravity.y = 300;

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// the background of the first level
		this.background = this.game.add.image(0, 0, 'level1background');

		/*
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		map = game.add.tilemap('level1');

		// the second parameter needs to be the same as the one used in
		// loading.js
		map.addTilesetImage('fmap-tiles', 'fmap-tiles');
		map.addTilesetImage('coin', 'coin');

		map.setCollisionBetween(1, 72);

		map.setTileIndexCallback(73, hitCoin, this);
		
		// the parameter can be found in the json file
		layer = map.createLayer('world1');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();


		/*
		 * adds the character
		 */
		this.astronaut = new Astronaut(this.game, 100, this.game.height/2);
    	this.game.add.existing(this.astronaut);


    	/**
		player = game.add.sprite(25, 255, 'char');
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.collideWorldBounds = true;
		player.body.gravity.y = 1000;
		player.body.maxVelocity.y = 500;
		**/

		this.game.camera.follow(this.astronaut);

		/**
		* add aliens
		*/
		this.alien = new Alien(this.game, 700, 600);
		this.game.add.existing(this.alien);

	},

	update : function() {

		this.game.physics.arcade.collide(this.astronaut, layer);
		this.game.physics.arcade.collide(this.astronaut, this.alien, collideWithAlien, null, this);

		/*
		 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
		 */
		if (cursors.left.isDown) {
			this.astronaut.body.velocity.x = -175;
		} else if (cursors.right.isDown) {
			this.astronaut.body.velocity.x = 175;
		} else {
			this.astronaut.body.velocity.x = 0;
		}

		if (cursors.up.isDown && this.astronaut.body.onFloor()
				&& game.time.now > jumpTimer) {
			this.astronaut.body.velocity.y = -700;
			jumpTimer = game.time.now + 750;
		}

	}
};

function hitCoin(astronaut, tile) {

//	tile.alpha = 0.2;

//	layer.dirty = true;

//	console.log("coin");

	return false;

}

function collideWithAlien(astronaut, alien) {

	lifeCounter--;
	if(lifeCounter <= 3 && lifeCounter > 0) {
	console.log(lifeCounter);
	} if(lifeCounter <= 0) {
		console.log("LOSE");
	}

}
