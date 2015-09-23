/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {
}

var map; // tilemap, for the platforms
var jumpTimer = 0;
var layer;
var score;
var lifeCounter = 3;
var scoreText;
var levelNumber = 1;

play.prototype = {

	create : function() {

		// Physics for the platforms
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// reduces jump height
		this.game.physics.arcade.gravity.y = 300;

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// loads the first level
		// level number has to be increased once the player has reached the
		// finish line
		loadLevel(levelNumber, null, null);

		/*
		 * adds the character
		 */
		this.astronaut = new Astronaut(this.game, 100, 100);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [ 1, 2, 3, 4, 5 ], 20, true);
		this.astronaut.animations.add('stop', [ 0 ], 20, true);
		this.astronaut.anchor.setTo(0.5, 0.5);

		this.game.camera.follow(this.astronaut);

		/**
		 * add aliens
		 */
		this.alien = new Alien(this.game, 700, 600);
		this.game.add.existing(this.alien);

		score = 0;
		scoreText = game.add.text(this.astronaut.x - 50, 20, 'Score: ' + score, {
			font : '30px Courier',
			fill : '#ffffff'
		});
		scoreText.fixedToCamera = true;

	},

	update : function() {

		logic(game, this.astronaut, layer, this.alien, cursors, jumpTimer);

	}
};

function loadLevel(levelNumber, astronaut, alien) {

	// the backgrounds of the first level
	this.background3 = this.game.add.image(0, 0, 'level' + levelNumber + 'background3');
	this.background2 = this.game.add.image(0, 0, 'level' + levelNumber + 'background2');
	this.background1 = this.game.add.image(0, 0, 'level' + levelNumber + 'background1');
	this.ground = this.game.add.image(0, 32, 'level' + levelNumber + 'ground');

	/*
	 * adds the tile map to the game !!tilemap json files need to be created
	 * with the csv preset and not base64 compressed, or this won't work!!
	 */
	map = game.add.tilemap('level' + levelNumber);

	// the second parameter needs to be the same as the one used in
	// loading.js
	// TODO: image names need to be adjusted to the level number
	map.addTilesetImage('fmap-tiles', 'fmap-tiles');
	map.addTilesetImage('coin', 'coin');
	map.addTilesetImage('finish', 'finish')

	// TODO: amount of tiles needs to be the same for all levels - should be
	// default
	map.setCollisionBetween(1, 72);

	map.setTileIndexCallback(73, hitCoin, this);

	map.setTileIndexCallback(79, hitFinish, this);

	// the parameter can be found in the json file
	layer = map.createLayer('world1');

	// This resizes the game world to match the layer dimensions
	layer.resizeWorld();

	if (astronaut != null) {
		// astronaut.body.set.x = 100;
		// astronaut.body.set.y = 100;
	}

}
