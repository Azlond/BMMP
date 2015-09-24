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
var lifeCounter;
var scoreText;
var levelNumber = 1;
<<<<<<< Updated upstream
var finalLevel = 3;
var lifeTimer;
=======
var soundOn = true;
>>>>>>> Stashed changes

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
		this.loadLevel("");

		/**
		 * add aliens
		 */
		this.alien = new Alien(this.game, 700, 350);
		this.game.add.existing(this.alien);

		score = 0;
		scoreText = game.add.text(this.astronaut.x - 50, 20, 'Score: ' + score,
				{
					font : '30px Courier',
					fill : '#ffffff'
				});
		scoreText.fixedToCamera = true;

		/*
		 * add tools
		 */
		this.nopliers = new Tools(this.game, 230, 15, 1);
		this.game.add.existing(this.nopliers);
		this.nopliers.fixedToCamera = true;

		this.nowrench = new Tools(this.game, 260, 15, 3);
		this.game.add.existing(this.nowrench);
		this.nowrench.fixedToCamera = true;

		this.noscrewdriver = new Tools(this.game, 290, 15, 5);
		this.game.add.existing(this.noscrewdriver);
		this.noscrewdriver.fixedToCamera = true;

		this.collectpliers = new Tools(this.game, 200, 400, 0);
		this.game.add.existing(this.collectpliers);
		this.collectpliers.body.allowGravity = false;

		this.collectwrench = new Tools(this.game, 111, 400, 2);
		this.game.add.existing(this.collectwrench);
		this.collectwrench.body.allowGravity = false;

		this.collectscrewdriver = new Tools(this.game, 111, 400, 4);
		this.game.add.existing(this.collectscrewdriver);
		this.collectscrewdriver.body.allowGravity = false;

	},

	update : function() {

		// logic(game, this.astronaut, layer, this.alien, cursors, jumpTimer);

		this.game.physics.arcade.collide(this.astronaut, layer);
		this.game.physics.arcade.collide(this.alien, layer);
		this.game.physics.arcade.overlap(this.astronaut, this.alien,
				this.collideWithAlien, null, this);

		this.game.physics.arcade.overlap(this.astronaut,
				this.collectscrewdriver, this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectwrench,
				this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectpliers,
				this.collectTools, null, this);

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

		if (lifeCounter == 0) {
			this.astronaut.kill();
			game.add.text(game.width / 2, game.height / 2, 'Game Over...', {
				font : '50px Courier',
				fill : '#8B1A1A'
			});
		}

	},

	loadLevel : function(string) {

		if (this.astronaut != null) {
			this.astronaut.kill();
		}

		if (map != null) {
			map.destroy();
		}

		if (layer != null) {
			layer.destroy();
		}

		lifeTimer = 0;

		if (string != "restart") {
			lifeCounter = 3;
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
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		map = game.add.tilemap('level' + levelNumber);

		// the second parameter needs to be the same as the one used in
		// loading.js
		// TODO: image names need to be adjusted to the level number
		// map.addTilesetImage('fmap-tiles', 'fmap-tiles');
		// map.addTilesetImage('coin', 'coin');
		// map.addTilesetImage('finish', 'finish')
		map.addTilesetImage('level1_tilemap', 'level1_tilemap');

		// TODO: amount of tiles needs to be the same for all levels - should be
		// default
		map.setCollisionBetween(1, 20);

		map.forEach(function(t) {
			if (t) {
				t.collideDown = false;
			}
		}, game, 0, 0, map.width, map.height, layer);

		// map.setTileIndexCallback(73, this.hitCoin, this);
		//
		// map.setTileIndexCallback(79, this.hitFinish, this);

		// the parameter can be found in the json file
		layer = map.createLayer('Kachelebene 2');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();

		/*
		 * adds the character
		 */
		this.astronaut = new Astronaut(this.game, 100, 450);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [ 1, 2, 3, 4, 5 ], 20, true);
		this.astronaut.animations.add('stop', [ 0 ], 20, true);
		this.astronaut.anchor.setTo(0.5, 0.5);

		this.game.camera.follow(this.astronaut);

	},

	hitCoin : function(astronaut, tile) {

		map.removeTile(tile.x, tile.y, layer);

		score += 1;
		scoreText.text = 'Score: ' + score;

		return false;

	},

	hitFinish : function(astronaut, finish) {
		if (levelNumber != finalLevel) {
			console.log("Level finished!");
			levelNumber += 1;
			this.loadLevel("");
		} else {
			game.add.text(game.width / 2, game.height / 2, 'You win!', {
				font : '50px Courier',
				fill : '#8B1A1A'
			});
		}
	},

	collideWithAlien : function(astronaut, alien) {
		if (game.time.now > lifeTimer) {
			lifeCounter--;
			if (lifeCounter <= 3 && lifeCounter > 0) {
				console.log(lifeCounter);
			}
			if (lifeCounter <= 0) {
				console.log("LOSE");
			}

			lifeTimer = game.time.now + 750;
		}

	},

	collectTools : function(astronaut, tools) {

		if (tools == this.collectpliers) {
			console.log("pliers")
			this.collectpliers.kill();
			this.nopliers.kill();
			this.pliers = new Tools(this.game, 230, 15, 0);
			this.game.add.existing(this.pliers);
			this.pliers.fixedToCamera = true;
		}
		if (tools == this.collectscrewdriver) {
			console.log("screwdriver")
			this.collectscrewdriver.kill();
			this.noscrewdriver.kill();
			this.screwdriver = new Tools(this.game, 290, 15, 4);
			this.game.add.existing(this.screwdriver);
			this.screwdriver.fixedToCamera = true;
		}
		if (tools == this.collectwrench) {
			console.log("wrench")
			this.collectwrench.kill();
			this.nowrench.kill();
			this.wrench = new Tools(this.game, 260, 15, 2);
			this.game.add.existing(this.wrench);
			this.wrench.fixedToCamera = true;
		}
	}

};
