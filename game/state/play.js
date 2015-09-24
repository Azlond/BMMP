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
		this.loadLevel();

		/**
		 * add aliens
		 */
		this.alien = new Alien(this.game, 700, 600);
		this.game.add.existing(this.alien);

		score = 0;
		scoreText = game.add.text(this.astronaut.x - 50, 20, 'Score: ' + score,
				{
					font : '30px Courier',
					fill : '#ffffff'
				});
		scoreText.fixedToCamera = true;

	},

	update : function() {

		// logic(game, this.astronaut, layer, this.alien, cursors, jumpTimer);

		this.game.physics.arcade.collide(this.astronaut, layer);
		this.game.physics.arcade.collide(this.astronaut, this.alien,
				this.collideWithAlien, null, this);

		this.game.physics.arcade.overlap(this.astronaut, this.collectscrewdriver, collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectwrench, collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectpliers, collectTools, null, this);

		/*
		 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
		 */
		if (cursors.left.isDown) {
			this.astronaut.body.velocity.x = -175;
			this.astronaut.animations.play('walk', 7, true);
			this.astronaut.scale.x = -1;
		} else if (cursors.right.isDown) {
			this.astronaut.body.velocity.x = 175;
			this.astronaut.scale.x = 1;
			this.astronaut.animations.play('walk', 7, true);
		} else {
			this.astronaut.body.velocity.x = 0;
			this.astronaut.animations.play('stop', 7, true);
		}

		if (cursors.up.isDown && this.astronaut.body.onFloor()
				&& game.time.now > jumpTimer) {
			this.astronaut.body.velocity.y = -700;
			jumpTimer = game.time.now + 750;
		}

	},

	loadLevel : function() {

		if (this.astronaut != null) {
			this.astronaut.kill();
		}

		if (map != null) {
			map.destroy();
		}

		if (layer != null) {
			layer.destroy();
		}

		// the backgrounds of the first level
		this.background3 = this.game.add.image(0, 0, 'level' + levelNumber
				+ 'background3');
		this.background2 = this.game.add.image(0, 0, 'level' + levelNumber
				+ 'background2');
		this.background1 = this.game.add.image(0, 0, 'level' + levelNumber
				+ 'background1');
		this.ground = this.game.add.image(0, 32, 'level' + levelNumber
				+ 'ground');

		/*
		 * adds the character
		 */
		this.astronaut = new Astronaut(this.game, 100, 100);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [ 1, 2, 3, 4, 5 ], 20, true);
		this.astronaut.animations.add('stop', [ 0 ], 20, true);
		this.astronaut.anchor.setTo(0.5, 0.5);

		this.game.camera.follow(this.astronaut);

		/*
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		map = game.add.tilemap('level' + levelNumber);

		// the second parameter needs to be the same as the one used in
		// loading.js
		// TODO: image names need to be adjusted to the level number
//		map.addTilesetImage('fmap-tiles', 'fmap-tiles');
//		map.addTilesetImage('coin', 'coin');
//		map.addTilesetImage('finish', 'finish')
		map.addTilesetImage('level1_tilemap', 'level1_tilemap');

		// TODO: amount of tiles needs to be the same for all levels - should be
		// default
		map.setCollisionBetween(1, 20);

//		map.setTileIndexCallback(73, this.hitCoin, this);
//
//		map.setTileIndexCallback(79, this.hitFinish, this);

		// the parameter can be found in the json file
		layer = map.createLayer('Kachelebene 2');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();
	},

	hitCoin : function(astronaut, tile) {

		map.removeTile(tile.x, tile.y, layer);

		score += 1;
		scoreText.text = 'Score: ' + score;

		return false;

	},

	hitFinish : function(astronaut, finish) {
		console.log("Level finished!");
		levelNumber += 1;
		this.loadLevel();
	},

	collideWithAlien : function(astronaut, alien) {

		lifeCounter--;
		if (lifeCounter <= 3 && lifeCounter > 0) {
			console.log(lifeCounter);
		}
		if (lifeCounter <= 0) {
			console.log("LOSE");
		}

	}

};

function collectTools(astronaut, tools) {

	if(tools == this.collectpliers) {
		console.log("pliers")
		this.collectpliers.kill();
		this.nopliers.kill();
		this.pliers = new Tools(this.game, 230, 15, 0);
		this.game.add.existing(this.pliers);
		this.pliers.fixedToCamera = true;
	}
	if(tools == this.collectscrewdriver) {
		console.log("screwdriver")
		this.collectscrewdriver.kill();
		this.noscrewdriver.kill();
		this.screwdriver = new Tools(this.game, 290, 15, 4);
		this.game.add.existing(this.screwdriver);
		this.screwdriver.fixedToCamera = true;
	}
	if(tools == this.collectwrench) {
		console.log("wrench")
		this.collectwrench.kill();
		this.nowrench.kill();
		this.wrench = new Tools(this.game, 260, 15, 2);
		this.game.add.existing(this.wrench);
		this.wrench.fixedToCamera = true;
	}
	}
