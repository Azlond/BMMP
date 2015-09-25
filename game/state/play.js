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
var oldScore;
var lifeCounter = 3;
var oxygenCounter;
var scoreText;
var pathCounter = 0;
var levelNumber = 1;
var timer;

var finalLevel = 4;
var lifeTimer;
var soundOn = true;
var fallen;
var toolsCollected = 0;

play.prototype = {

	create : function() {

		// Physics for the platforms
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// reduces jump height
		this.game.physics.arcade.gravity.y = 300;

		score = 0;

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// loads the first level
		// level number has to be increased once the player has reached the
		// finish line
		this.loadLevel("");

	},

	update : function() {

		this.game.physics.arcade.collide(this.astronaut, layer);
		this.game.physics.arcade.collide(this.alien, layer);
		this.game.physics.arcade.collide(this.rocket, layer);
		this.game.physics.arcade.overlap(this.astronaut, this.alien, this.collideWithAlien, null, this);
		this.game.physics.arcade.collide(this.astronaut, this.rocket, this.hitFinish, null, this);

		this.game.physics.arcade.overlap(this.astronaut, this.collectscrewdriver, this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectwrench, this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectpliers, this.collectTools, null, this);

		/*
		 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
		 */
		if (cursors.left.isDown) {
			this.astronaut.body.velocity.x = -175;
			this.astronaut.animations.play('walk', 7, true);
			this.astronaut.scale.x = -1;
			this.background2.x += 0.25;
			this.background1.x += 0.3;
		} else if (cursors.right.isDown) {
			this.astronaut.body.velocity.x = 175;
			this.astronaut.scale.x = 1;
			this.astronaut.animations.play('walk', 7, true);
			this.background2.x -= 0.25;
			this.background1.x -= 0.3;
		} else {
			this.astronaut.body.velocity.x = 0;
			this.astronaut.animations.play('stop', 7, true);
		}

		if (cursors.up.isDown && this.astronaut.body.onFloor() && game.time.now > jumpTimer) {
			this.astronaut.body.velocity.y = -700;
			jumpTimer = game.time.now + 500;
		}
		 
		
		
		if (lifeCounter == 0) {
			this.astronaut.kill();

			this.game.add.image(0, 0, 'gameOver');

			var gameOverText = game.add.text(this.game.camera.x, this.game.camera.y, 'Game Over...', {
				font : '50px Courier',
				fill : '#8B1A1A'
			});

			gameOverText.fixedToCamera = true;
		}

		if (this.astronaut.body.y > 600 && !fallen) {
			lifeCounter--;
			console.log(lifeCounter);
			fallen = true;
			if (lifeCounter != 0) {
				this.loadLevel("restart");
			}
		}

		if (fireButton.isDown) {
			console.log("X: " + this.astronaut.body.x + " Y: " + this.astronaut.body.y);
		}

		if (this.rocket.body.y <= -420) {
			this.rocketGone = true;
		}

		if (this.rocketGone) {
			if (levelNumber == finalLevel) {
				game.add.text(game.width / 2, game.height / 2, 'You win!', {
					font : '50px Courier',
					fill : '#8B1A1A'
				});
			} else {
				this.loadLevel("");
			}
		}

		if (pathCounter >= 0) {
			pathCounter++;
			// console.log(pathCounter);
		}
		if (pathCounter >= 300) {
			if (this.alien.scale.x == -1 && this.alien.body.velocity.x == -50) {
				pathCounter = 0;
				this.alien.scale.x = 1;
				this.alien.body.velocity.x = 50;
			} else if (this.alien.scale.x == 1 && this.alien.body.velocity.x == 50) {
				pathCounter = 0;
				this.alien.scale.x = -1;
				this.alien.body.velocity.x = -50;
			}
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

		if (this.rocket != null) {
			this.rocket.kill();
		}

		if (toolsCollected != 0) {
			toolsCollected = 0;
		}

		if (this.nopliers != null) {
			this.nopliers.kill();
		}

		if (this.nowrench != null) {
			this.nowrench.kill();
		}

		if (this.noscrewdriver != null) {
			this.noscrewdriver.kill();
		}

		lifeTimer = 0;
		fallen = false;

		if (string != "restart") {
			lifeCounter = 3;
			oldScore = score;
		}

		// the backgrounds of the first level
		this.background3 = this.game.add.image(0, 0, 'level' + levelNumber + 'background3');
		this.background2 = this.game.add.image(0, 0, 'level' + levelNumber + 'background2');
		this.background1 = this.game.add.image(-15, 0, 'level' + levelNumber + 'background1');
		this.rocketGone = false;
		/*
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		map = game.add.tilemap('level' + levelNumber);

		// the second parameter needs to be the same as the one used in
		// loading.js
		// TODO: image names need to be adjusted to the level number
		// map.addTilesetImage('level1_tilemap', 'level1_tilemap');
		map.addTilesetImage('level' + levelNumber + '_tilemap', 'level' + levelNumber + '_tilemap');
		map.addTilesetImage('level' + levelNumber + '_tilemap_ground', 'level' + levelNumber + '_tilemap_ground');

		// TODO: amount of tiles needs to be the same for all levels - should be
		// default
		map.setCollisionBetween(1, 39);

		map.forEach(function(t) {
			if (t) {
				t.collideDown = false;
				t.collideLeft = false;
				t.collideRight = false;
			}
		}, 
		
		
		game, 0, 0, map.width, map.height, layer);

		map.setCollision(41);

		map.setTileIndexCallback(40, this.collectElement, this);

		// the parameter can be found in the json file
		layer = map.createLayer('Kachelebene 1');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();

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

		switch (levelNumber) {
		case 1:
			this.collectpliers = new Tools(this.game, level1pliers[0], level1pliers[1], 0);
			this.game.add.existing(this.collectpliers);
			this.collectpliers.body.allowGravity = false;

			this.collectwrench = new Tools(this.game, level1wrench[0], level1wrench[1], 2);
			this.game.add.existing(this.collectwrench);
			this.collectwrench.body.allowGravity = false;

			this.collectscrewdriver = new Tools(this.game, level1screw[0], level1screw[1], 4);
			this.game.add.existing(this.collectscrewdriver);
			this.collectscrewdriver.body.allowGravity = false;
			break;
		case 2:
			this.collectpliers = new Tools(this.game, level2pliers[0], level2pliers[1], 0);
			this.game.add.existing(this.collectpliers);
			this.collectpliers.body.allowGravity = false;

			this.collectwrench = new Tools(this.game, level2wrench[0], level2wrench[1], 2);
			this.game.add.existing(this.collectwrench);
			this.collectwrench.body.allowGravity = false;

			this.collectscrewdriver = new Tools(this.game, level2screw[0], level2screw[1], 4);
			this.game.add.existing(this.collectscrewdriver);
			this.collectscrewdriver.body.allowGravity = false;
			break;
		case 3:
			this.collectpliers = new Tools(this.game, level3pliers[0], level3pliers[1], 0);
			this.game.add.existing(this.collectpliers);
			this.collectpliers.body.allowGravity = false;

			this.collectwrench = new Tools(this.game, level3wrench[0], level3wrench[1], 2);
			this.game.add.existing(this.collectwrench);
			this.collectwrench.body.allowGravity = false;

			this.collectscrewdriver = new Tools(this.game, level3screw[0], level3screw[1], 4);
			this.game.add.existing(this.collectscrewdriver);
			this.collectscrewdriver.body.allowGravity = false;
			break;
		case 4:
			this.collectpliers = new Tools(this.game, level4pliers[0], level4pliers[1], 0);
			this.game.add.existing(this.collectpliers);
			this.collectpliers.body.allowGravity = false;

			this.collectwrench = new Tools(this.game, level4wrench[0], level4wrench[1], 2);
			this.game.add.existing(this.collectwrench);
			this.collectwrench.body.allowGravity = false;

			this.collectscrewdriver = new Tools(this.game, level4screw[0], level4screw[1], 4);
			this.game.add.existing(this.collectscrewdriver);
			this.collectscrewdriver.body.allowGravity = false;
			break;
		default:
		}

		/*
		 * adds the rocket
		 */
		switch (levelNumber) {
		case 1:
			this.rocket = this.game.add.sprite(2246, 71, 'rocket');
			break;
		default: // 2, 3,4
			this.rocket = this.game.add.sprite(4646, 71, 'rocket');
		}
		this.game.physics.arcade.enableBody(this.rocket);
		this.rocket.body.allowGravity = false;
		this.rocket.body.immovable = true;
		this.rocket.animations.add('empty', [ 0 ], 1, true);
		this.rocket.animations.add('full', [ 1 ], 1, true);
		this.rocket.animations.play('empty');

		/*
		 * adds the character
		 */
		this.astronaut = new Astronaut(this.game, 100, 450);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [ 1, 2, 3, 4, 5 ], 20, true);
		this.astronaut.animations.add('stop', [ 0 ], 20, true);
		this.astronaut.anchor.setTo(0.5, 0.5);

		this.game.camera.follow(this.astronaut);

		score = oldScore;

		scoreText = game.add.text(this.astronaut.x - 50, 20, 'Score: ' + score, {
			font : '30px Courier',
			fill : '#ffffff'
		});
		scoreText.fixedToCamera = true;

		/**
		 * add aliens
		 */
		this.alien = new Alien(this.game, 700, 350);
		this.game.add.existing(this.alien);
		this.alien.animations.add('walk', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 7, true);
		this.alien.anchor.setTo(0.5, 0.5);
		this.alien.animations.play('walk');

		
		oxygenCounter = 9;
		oxygenTank = game.add.sprite (3, 3, 'tank');
		oxygenTank.frame = 0;
		oxygenTank.fixedToCamera = true;
       		--oxygenCounter;
        	timeDown();

	},

	collectElement : function(astronaut, tile) {

		map.removeTile(tile.x, tile.y, layer);

		score += 1;
		scoreText.text = 'Score: ' + score;

		return false;

	},

	hitFinish : function(astronaut, finish) {

		if (levelNumber != finalLevel && toolsCollected == 3) {
			levelNumber += 1;
			this.astronaut.kill();
			this.rocket.body.immovable = false;
			this.rocket.body.velocity.y = -150;
			this.rocket.animations.play('full');
		} else if (toolsCollected == 3) {
			this.astronaut.kill();
			this.rocket.body.immovable = false;
			this.rocket.body.velocity.y = -150;
			this.rocket.animations.play('full');
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
			toolsCollected += 1;
		}
		if (tools == this.collectscrewdriver) {
			console.log("screwdriver")
			this.collectscrewdriver.kill();
			this.noscrewdriver.kill();
			this.screwdriver = new Tools(this.game, 290, 15, 4);
			this.game.add.existing(this.screwdriver);
			this.screwdriver.fixedToCamera = true;
			toolsCollected += 1;
		}
		if (tools == this.collectwrench) {
			console.log("wrench")
			this.collectwrench.kill();
			this.nowrench.kill();
			this.wrench = new Tools(this.game, 260, 15, 2);
			this.game.add.existing(this.wrench);
			this.wrench.fixedToCamera = true;
			toolsCollected += 1;
		}
	}

};
