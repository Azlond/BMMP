/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {}

var score;
var oldScore; // the score at the beginning of a level - needed for restarting a level
var lifeCounter; // the amount of lives the player has
var oxygenCounter;
var pathCounter = 0;
var life;
var alienGroup;
var oxygenGroup;

// sounds

var loseLifeSound;
var collectToolSound;
var collectOxygenSound;
var completeLevelSound;
var collideWithAlienSound;
var gameOverSound;

var videoBackground;

var restartButton;
var quitButton;
var continueButton;
var pauseMenu;
var pauseMenuActive = true;
var videoOn = false;
var isPaused = false;

var cutScene;

play.prototype = {

	create: function () {

		/* Physics for the platforms */
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		/* reduces jump height */
		this.game.physics.arcade.gravity.y = 300;

		/* score at the beginning of the game */
		score = 0;
		lifeCounter = 3;

		/* first level */
		this.levelNumber = 1;
		/* last level */
		this.finalLevel = 4;

		/* Keyboard controls */
		cursors = game.input.keyboard.createCursorKeys();

		/* loads the first level level number, has to be increased once the player has reached the finish line */
		this.loadLevel("");

		/* Space key for pause menu and skipping videos */
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

		/* game sounds */
		loseLifeSound = game.add.audio('loseLife');
		collectElementSound = game.add.audio('collectElement');
		gameOverSound = game.add.audio('gameOver');
		collectToolSound = game.add.audio('collectTool');
		collectOxygenSound = game.add.audio('collectOxygen');
		completeLevelSound = game.add.audio('completeLevel');
		collideWithAlienSound = game.add.audio('collideWithAlien');

	},

	update: function () {

		/* collision between astronaut/alien/rocket and the platform/ground layer */
		this.game.physics.arcade.collide(this.astronaut, this.layer);
		this.game.physics.arcade.collide(this.astronaut, this.wall);
		this.game.physics.arcade.collide(alienGroup, this.layer);
		this.game.physics.arcade.collide(this.rocket, this.layer);

		/* collision between astronaut and rocket/alien */
		this.game.physics.arcade.collide(this.astronaut, this.rocket, this.hitFinish, null, this);
		this.game.physics.arcade.overlap(this.astronaut, alienGroup, this.collideWithAlien, null, this);

		/* collision between astronaut and tools */
		// this.game.physics.arcade.overlap(this.astronaut, this.collectscrewdriver, this.collectTools, null, this);
		// this.game.physics.arcade.overlap(this.astronaut, this.collectwrench, this.collectTools, null, this);
		// this.game.physics.arcade.overlap(this.astronaut, this.collectpliers, this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.toolGroup, this.collectTools, null, this);

		/* collision between astronaut and oxygen */
		this.game.physics.arcade.overlap(this.astronaut, oxygenGroup, this.collectOxygen, null, this);

		/* interaction that must not happen if the game is paused */
		if (!isPaused) {

			/*
			 * Moving the player
			 * 
			 * based on http://phaser.io/examples/v2/arcade-physics/platformer-tight
			 * 
			 * the second condition is needed to make the backgrounds stop moving once the player is inside the rocket
			 */

			/* Astronaut going left, backgrounds moving right */
			if (cursors.left.isDown && this.rocket.body.y == 69) {
				this.astronaut.body.velocity.x = -175;
				if (this.astronaut.body.onFloor()) {
					this.astronaut.animations.play('walk', 6, true);
				}
				this.astronaut.scale.x = -1;
				if (this.astronaut.body.x > 50) {
					this.background2.x += 0.25;
					this.background1.x += 0.3;
				}
				/* Astronaut going right, backgrounds moving left */
			} else if (cursors.right.isDown && this.rocket.body.y == 69) {
				this.astronaut.body.velocity.x = 175;
				this.astronaut.scale.x = 1;
				if (this.astronaut.body.onFloor()) {
					this.astronaut.animations.play('walk', 6, true);
				}
				/* second parameter needed because level 1 is shorter than the other levels */
				if ((this.astronaut.body.x < 2200 && this.levelNumber == 1) || (this.astronaut.body.x < 4600 && this.levelNumber != 1)) {
					this.background2.x -= 0.25;
					this.background1.x -= 0.3;
				}
				/* Astronaut is not moving on x-Axis - play stop sprite only when Astronaut is on the ground, so that is no interference with the jump animation */
			} else {
				this.astronaut.body.velocity.x = 0;
				if (this.astronaut.body.onFloor()) {
					this.astronaut.animations.play('stop', 6, true);
				}
			}

			/* Jumping */
			if (cursors.up.isDown) {
				this.astronaut.animations.play('jump', 12, true);
				if (this.astronaut.body.onFloor()) {
					this.astronaut.body.velocity.y = -700;
				}
			}

			/*
			 * alien movement and interaction
			 */
			for (i = 0; i < alienGroup.children.length; i++) {
				var enemy = alienGroup.children[i];
				enemy.animations.play('walk');

				/* increase path counter */
				if (enemy.pathCounter >= 0) {
					enemy.pathCounter++;
				}

				/* enemy is at its turning point, pathCounter has reached the distance */
				if (enemy.pathCounter >= enemy.distance) {
					enemy.pathCounter = 0;
					enemy.scale.x = -enemy.scale.x;
					enemy.body.velocity.x = -enemy.body.velocity.x;
				}

				/*
				 * simple AI, always moving towards the Astronaut if s/he is within walking distance
				 * 
				 * timers needed to give the Astronaut the chance to jump over alien. Without the timers, the alien would change direction instantly
				 */

				/* enemy facing right,the Astronaut is within walking distance of the alien and the alien is facing the wrong direction */
				if ((enemy.scale.x == 1) && ((this.astronaut.body.x > (enemy.body.x - enemy.pathCounter)) && (this.astronaut.body.x < (enemy.body.x + (enemy.distance - enemy.pathCounter)))) && (this.astronaut.body.x < enemy.body.x)) {

					if (!enemy.timerLSet) {
						enemy.turnLTimer = game.time.now + 100;
						enemy.timerLSet = true;
					}
					if (game.time.now > enemy.turnLTimer) {
						enemy.scale.x = -enemy.scale.x
						enemy.pathCounter = enemy.distance - enemy.pathCounter;
						enemy.body.velocity.x = -enemy.body.velocity.x;
						enemy.timerLSet = false;
					}
					/* enemy facing left,the Astronaut is within walking distance of the alien and the alien is facing the wrong direction */
				} else if ((enemy.scale.x != 1) && ((this.astronaut.body.x > (enemy.body.x - (enemy.distance - enemy.pathCounter))) && (this.astronaut.body.x < (enemy.body.x + enemy.pathCounter))) && (this.astronaut.body.x > enemy.body.x)) {

					if (!enemy.timerRSet) {
						enemy.turnRTimer = game.time.now + 100;
						enemy.timerRSet = true;
					}
					if (game.time.now > enemy.turnRTimer) {
						enemy.scale.x = -enemy.scale.x
						enemy.pathCounter = enemy.distance - enemy.pathCounter;
						enemy.body.velocity.x = -enemy.body.velocity.x;
						enemy.timerRSet = false;
					}
				}
			}
		}

		/*
		 * check if the player has fallen into a rift
		 * 
		 * if the player has more than 0 lives left, restart the level
		 */
		if (this.astronaut.body.y > 600 && !this.fallen) {
			lifeCounter--;
			if (soundIsOn) {
				loseLifeSound.play();
			}
			showLife(lifeCounter);
			this.fallen = true;
			this.checkLifeCounter();
			if (lifeCounter != 0) {
				this.loadLevel("restart");
			}

		}

		/* Space pressed - either open the pause menu, or skip the cutScene */
		if (this.spaceKey.isDown) {
			if (pauseMenuActive) {
				isPaused = true;
				this.timer.pause();
				this.pauseGame();
				createPauseMenu(this);
			} else if (videoOn) {
				this.endLevel(this);
			}
		}
	},

	/* change the sprite for the oxygen counter */
	changeDisplay: function () {
		if (oxygenCounter > 3) {
			oxygenTank.frame = oxygenCounter;
			--oxygenCounter;
		} else if (oxygenCounter < 4 && oxygenCounter > 0) {
			oxygenTank.animations.add('blink1', [oxygenCounter, 0], 5, true);
			oxygenTank.animations.play('blink1');
			--oxygenCounter;
		} else if (oxygenCounter === 0) {
			oxygenTank.animations.stop();
			oxygenTank.frame = 0;
			lifeCounter--;
			if (soundIsOn) {
				loseLifeSound.play();
			}
			this.checkLifeCounter();
			this.timer.stop();
			this.loadLevel("restart");
		} else {
			this.timer.stop();
		}
	},

	/* check if the player is dead */
	checkLifeCounter: function () {
		if (lifeCounter == 0) {
			if (soundIsOn) {
				gameOverSound.play();
			}
			this.game.state.start('gameOver', true, false);
		}
	},

	/* collecting an element and removing it from the game */
	collectElement: function (astronaut, tile) {

		var str = astronaut.key.toString();
		/* check to see if it is actually the astronaut collecting the element and not an alien */
		if (str.indexOf("char") != -1) {

			this.map.removeTile(tile.x, tile.y, this.layer);
			if (soundIsOn) {
				collectElementSound.play();
			}
			score += 5;
			this.scoreText.text = score;

			/* count up total collecting element for each level - if all elements are collected, the astronaut may get a bonus life */
			this.astronaut.collected++;

			return false;
		}

	},

	/*
	 * collect Oxygen bottles, refill the oxygen tank
	 */
	collectOxygen: function (astronaut, oxygenBottle) {
		oxygenBottle.kill();
		this.timer.stop();
		if (soundIsOn) {
			collectOxygenSound.play();
		}
		oxygenCounter = 9;
		oxygenTank.kill();
		oxygenTank = game.add.sprite(750, 510, 'tank');
		oxygenTank.frame = oxygenCounter;
		oxygenTank.fixedToCamera = true;
		oxygenCounter--;
		this.timeDown();
	},

	/*
	 * called when the player overlaps with the tools
	 */
	collectTools: function (astronaut, tools) {

		if (tools == this.collectpliers) {
			this.nopliers.kill();
			if (soundIsOn) {
				collectToolSound.play();
			}
			this.pliers = new Tools(690, 10, 1);
			this.game.add.existing(this.pliers);
			this.pliers.fixedToCamera = true;
		}
		if (tools == this.collectscrewdriver) {
			this.noscrewdriver.kill();
			if (soundIsOn) {
				collectToolSound.play();
			}
			this.screwdriver = new Tools(755, 10, 3);
			this.game.add.existing(this.screwdriver);
			this.screwdriver.fixedToCamera = true;
		}
		if (tools == this.collectwrench) {
			this.nowrench.kill();
			if (soundIsOn) {
				collectToolSound.play();
			}
			this.wrench = new Tools(720, 10, 5);
			this.game.add.existing(this.wrench);
			this.wrench.fixedToCamera = true;
		}
		tools.kill();
		this.toolsCollected += 1;
	},

	/*
	 * called when player collides with an alien
	 * 
	 * lifeTimer is needed to make the player survive the contact after a life has already been lost
	 */
	collideWithAlien: function (astronaut, alien) {
		if (game.time.now > this.lifeTimer) {
			lifeCounter--;
			if (soundIsOn) {
				collideWithAlienSound.play();
			}
			showLife(lifeCounter);

			this.lifeTimer = game.time.now + 1000;

			this.checkLifeCounter();
		}
	},

	/* go to next level */
	endLevel: function (o) {
		cutScene.stop();

		o.levelNumber += 1;
		o.loadLevel("");
	},

	/*
	 * called when the player collides with the rocket
	 * 
	 * checks if all tools have been collected
	 * 
	 * awards 25 points for finishing the level
	 * 
	 * awards an extra life if the player has less then 3 and has collected all elements
	 * 
	 */
	hitFinish: function (astronaut, finish) {

		if (this.toolsCollected == 3) {
			this.astronaut.kill();
			this.timer.stop();
			if (soundIsOn) {
				completeLevelSound.play();
			}
			this.rocket.body.immovable = false;
			this.rocket.body.velocity.y = -150;
			this.rocket.animations.play('full');
			score += 25;
			this.scoreText.text = score;

			if (this.astronaut.collected == amountElements["level" + this.levelNumber] && lifeCounter < 3) {
				lifeCounter++;
				showLife(lifeCounter);
			}

			this.timer2 = game.time.create(false);
			this.timer2.add(3500, function () {
				this.playVideo(this)
			}, this);
			this.timer2.start();
		}

	},

	/* function to load each level */
	loadLevel: function (string) {

		/* reset values */

		/* if a map exists, so do all other objects - we need to destroy them. */
		if (this.map != null) {
			this.map.destroy();
			this.astronaut.kill();
			this.layer.destroy();
			this.rocket.kill();
			this.nopliers.kill();
			this.nowrench.kill();
			this.noscrewdriver.kill();
			alienGroup.destroy();
			this.toolGroup.destroy();
			oxygenGroup.destroy();
			this.timer.stop();
		}

		if (videoOn) {
			videoOn = false;
		}

		this.timer4 = game.time.create(false);
		this.timer4.add(300, this.startPauseMenu, this);
		this.timer4.start();

		if (musicOn) {
			background_music.play();
			background_music.loopFull();
		}

		this.toolsCollected = 0;
		this.lifeTimer = 0;
		this.fallen = false;
		this.rocketGone = false;

		/* if a new level is loaded (string !=restart), the current score is the new oldScore, else we keep the oldScore */
		if (string != "restart") {
			oldScore = score;
		}

		/* loading the backgrounds */
		this.background3 = this.game.add.image(0, 0, 'level' + this.levelNumber + 'background3');
		this.background2 = this.game.add.image(0, 0, 'level' + this.levelNumber + 'background2');
		this.background1 = this.game.add.image(-15, 0, 'level' + this.levelNumber + 'background1');

		/*
		 * adds the tile map to the game
		 * 
		 * !Tilemap JSON files need to be created with the CSV preset and not base64 compressed, or this won't work!
		 */
		this.map = game.add.tilemap('level' + this.levelNumber);

		/* the second parameter needs to be the same as the one used in loading.js */
		this.map.addTilesetImage('level' + this.levelNumber + '_tilemap', 'level' + this.levelNumber + '_tilemap');
		this.map.addTilesetImage('level' + this.levelNumber + '_tilemap_ground', 'level' + this.levelNumber + '_tilemap_ground');

		/* collision for the platforms */
		this.map.setCollisionBetween(1, 39);

		/* player may only collide with platform top, so that it is possible to jump on one from beneath it. */
		this.map.forEach(function (t) {
			if (t) {
				t.collideDown = false;
				t.collideLeft = false;
				t.collideRight = false;
			}
		}, game, 0, 0, this.map.width, this.map.height, this.layer);

		/* collision with the ground */
		this.map.setCollision(41);

		/* element collision, with callBackFunction for the score */
		this.map.setTileIndexCallback(40, this.collectElement, this);

		/* the parameter can be found in the JSON Tiled-file */
		this.layer = this.map.createLayer('Kachelebene 1');

		/* This resizes the game world to match the layer dimensions */
		this.layer.resizeWorld();

		/* add tool-placeholder icons for toolbar */
		this.nopliers = new Tools(690, 10, 0);
		this.game.add.existing(this.nopliers);
		this.nopliers.fixedToCamera = true;

		this.nowrench = new Tools(720, 10, 4);
		this.game.add.existing(this.nowrench);
		this.nowrench.fixedToCamera = true;

		this.noscrewdriver = new Tools(755, 10, 2);
		this.game.add.existing(this.noscrewdriver);
		this.noscrewdriver.fixedToCamera = true;

		/* add tools to the levels */
		this.toolGroup = this.game.add.group();

		this.collectpliers = new Tools(toolLocations['level' + this.levelNumber + 'PliersX'], toolLocations['level' + this.levelNumber + 'PliersY'], 1);
		this.game.add.existing(this.collectpliers);
		this.collectpliers.body.allowGravity = false;
		this.toolGroup.add(this.collectpliers);

		this.collectwrench = new Tools(toolLocations['level' + this.levelNumber + 'WrenchX'], toolLocations['level' + this.levelNumber + 'WrenchY'], 5);
		this.game.add.existing(this.collectwrench);
		this.collectwrench.body.allowGravity = false;
		this.toolGroup.add(this.collectwrench);

		this.collectscrewdriver = new Tools(toolLocations['level' + this.levelNumber + 'ScrewX'], toolLocations['level' + this.levelNumber + 'ScrewY'], 3);
		this.game.add.existing(this.collectscrewdriver);
		this.collectscrewdriver.body.allowGravity = false;
		this.toolGroup.add(this.collectscrewdriver);

		/*
		 * adds the rocket
		 * 
		 * if-clause needed because level 1 is only half as long as the other levels
		 * 
		 * rocket needs to be immovable until player is inside so that it can't be kicked around
		 * 
		 * no gravity to make departure cleaner
		 */

		this.rocket = this.game.add.sprite(((this.levelNumber == 1) ? 2246 : 4646), 69, 'rocket' + activeAstronaut);
		this.game.physics.arcade.enableBody(this.rocket);
		this.rocket.body.allowGravity = false;
		this.rocket.body.immovable = true;
		this.rocket.animations.add('empty', [0], 1, true);
		this.rocket.animations.add('full', [1], 1, true);
		this.rocket.animations.play('empty');

		/* adds the character */
		this.astronaut = new Astronaut(100, 440);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [1, 2, 3, 4, 5], 26, true);
		this.astronaut.animations.add('jump', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 26, true);
		this.astronaut.animations.add('stop', [0], 26, true);
		this.astronaut.anchor.setTo(0.5, 0.5);
		this.game.camera.follow(this.astronaut);

		/* update the score */
		score = oldScore;

		/* add Score to toolbar */
		this.scoreElement = game.add.image(9, 10, 'elementScore');
		this.scoreElement.fixedToCamera = true;
		this.scoreText = game.add.text(45, 10, score, {
			font: '30px Raleway',
			fill: '#ffffff'
		});
		this.scoreText.fixedToCamera = true;

		/* adding the invisible Wall to make sure the character can't walk out of the screen on the left side */

		this.wall = this.game.add.sprite(-10, 0, 'invisWall');
		this.game.physics.arcade.enableBody(this.wall);
		this.wall.body.allowGravity = false;
		this.wall.body.immovable = true;

		/* add aliens */
		alienGroup = game.add.group();

		var alienInfo = aliens["level" + this.levelNumber];
		var amountAliens = alienInfo["amount"];
		var alienCoordinates = alienInfo["coordinates"];

		for (i = 1; i <= amountAliens; i++) {
			this.alien = new Alien(alienCoordinates["alien" + i][0], alienCoordinates["alien" + i][1], alienCoordinates["alien" + i][2]);
			this.game.add.existing(this.alien);
			this.alien.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
			this.alien.animations.add('stop', [0], 7, true);
			this.alien.anchor.setTo(0.5, 0.5);
			this.alien.animations.play('walk');
			alienGroup.add(this.alien);
		}

		/* add oxygen bottles */
		oxygenGroup = game.add.group();

		var oxygenInfo = oxygens["level" + this.levelNumber];
		var amountOxygen = oxygenInfo["amount"];
		var oxygenCoordinates = oxygenInfo["coordinates"];

		for (i = 1; i <= amountOxygen; i++) {
			this.oxygenBottle = new oxygen(oxygenCoordinates["oxygen" + i][0], oxygenCoordinates["oxygen" + i][1]);
			this.game.add.existing(this.oxygenBottle);
			oxygenGroup.add(this.oxygenBottle);
		}

		/* shows oxygen-counter in each level */
		oxygenCounter = 9;
		oxygenTank = game.add.sprite(750, 510, 'tank');
		oxygenTank.frame = oxygenCounter;
		oxygenTank.fixedToCamera = true;
		oxygenCounter--;
		this.timeDown();

		/* shows life counter in each level */
		var bar = game.add.sprite(0, 0, 'toolbar');
		bar.fixedToCamera = true;
		showLife(lifeCounter);
	},

	/* stop Astronaut and alien movement */
	pauseGame: function () {
		this.astronaut.body.velocity.x = 0;
		this.astronaut.body.velocity.y = 0;
		if (this.rocket.body.velocity.y != 0) {
			this.rocket.body.velocity.y = 0;
			this.timer2.pause();
		}
		this.astronaut.body.allowGravity = false;
		this.astronaut.animations.play('stop', 6, true);

		for (i = 0; i < alienGroup.children.length; i++) {
			var enemy = alienGroup.children[i];
			enemy.body.velocity.x = 0;
			if (isPaused == true) {
				enemy.animations.play('stop');
			}
		}
	},

	/* play the cutScene between levels */
	playVideo: function (o) {
		this.timer2.stop();
		background_music.stop();
		videoOn = true;

		/* kill pause if active */
		pauseMenuActive = false;
		isPaused = false;
		if (pauseMenu != null) {
			pauseMenu.kill();
		}

		if (this.levelNumber < this.finalLevel) {

			videoBackground = game.add.sprite(((this.levelNumber == 1) ? 1600 : 4000), 8, 'startBackground');
			cutScene = game.add.video(`${charNames[activeAstronaut]}animation${this.levelNumber}`, `./assets/videos/${charNames[activeAstronaut]}animation${this.levelNumber}.mkv`);
			if (!soundIsOn) {
				cutScene.mute = true;
			} else {
				cutScene.mute = false;
			}
			cutScene.add(videoBackground);
			cutScene.play();
			cutScene.onComplete.add(function () {
				o.endLevel(o);
			}, this);

			videoBackground.bringToTop();

		} else {
			/* award points for remaining lives */
			for (i = 0; i < lifeCounter; i++) {
				score += 50;
			}
			game.state.start('bonus');
		}

	},

	/* pause the game */
	startPauseMenu: function () {
		pauseMenuActive = true;
		this.timer4.stop();

	},

	/*
	 * Countdown for the oxygen-timer
	 * 
	 * Different value for the tutorial, to make reading the instructions easier
	 */
	timeDown: function () {
		var countdown = ((this.levelNumber == 1) ? 5000 : 3000);
		this.timer = game.time.create(false);
		this.timer.loop(countdown, this.changeDisplay, this);
		this.timer.start();
	}
};

/* continue the game - used in the pause menu */
function continueGame(o) {

	isPaused = false;
	o.astronaut.body.allowGravity = true;
	o.timer.resume();

	for (i = 0; i < alienGroup.children.length; i++) {
		var enemy = alienGroup.children[i];
		if (enemy.scale.x == 1) {
			enemy.body.velocity.x = 50;
		} else {
			enemy.body.velocity.x = -50;
		}
	}

	if (o.rocket.body.y != 69) {
		o.rocket.body.velocity.y = -150;
		o.timer2.resume();
	}

	pauseMenu.kill();
	pauseMenuActive = true;

}

/* edit the music settings */
function changeMusicOnPauseMenu() {
	if (soundIsOn) {
		buttonSound.play('', 0, 0.2);
	}
	musicOn = !musicOn;
	musicControl.kill();
	musicControl = new button(game, 75, -165, (musicOn ? 1 : 0), changeMusicOnPauseMenu, 'controlSound');
	pauseMenu.addChild(musicControl);
	background_music.resume();
}

/* edit the sound settings */
function changeSoundOnPauseMenu() {
	if (soundIsOn) {
		buttonSound.play('', 0, 0.2);
	}
	soundIsOn = !soundIsOn;
	soundControl.kill();
	soundControl = new button(game, -20, -70, (soundIsOn ? 1 : 0), changeSoundOnPauseMenu, 'controlSound');
	pauseMenu.addChild(soundControl);

}

/* show the pause menu */
function createPauseMenu(o) {

	isPaused = true;
	pauseMenuActive = false;

	pauseMenu = game.add.sprite(400, 300, 'pauseBackground');
	pauseMenu.alpha = 1.0;
	pauseMenu.anchor.set(0.5);
	pauseMenu.fixedToCamera = true;

	musicControl = new button(this.game, 75, -165, (musicOn ? 1 : 0), changeMusicOnPauseMenu, 'controlSound');
	pauseMenu.addChild(musicControl);

	soundControl = new button(this.game, -20, -70, (soundIsOn ? 1 : 0), changeSoundOnPauseMenu, 'controlSound');
	pauseMenu.addChild(soundControl);

	restartButton = this.game.add.button(-300, 180, 'restartButton', function () {
		restart(o)
	}, this, 1, 0);
	pauseMenu.addChild(this.restartButton);

	continueButton = this.game.add.button(-50, 180, 'continueButton', function () {
		continueGame(o)
	}, this, 1, 0);
	pauseMenu.addChild(this.continueButton);

	quitButton = this.game.add.button(210, 185, 'quitButton', quitGame, this, 1, 0);
	pauseMenu.addChild(this.quitButton);

}

/* quits the game - used in the pause menu */
function quitGame() {
	isPaused = false;
	game.state.start('intro');
	pauseMenuActive = true;
}

/* restart the level - used in the pause menu */
function restart(o) {
	isPaused = false;
	lifeCounter = 3;
	o.loadLevel("restart");
	pauseMenuActive = true;
}
