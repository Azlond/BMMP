/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {
}

var score;
var oldScore;// the score at the beginning of a level - needed for restarting a level
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
var animation1;
var animation2;
var animation3;
var videoBackground;

var restartButton;
var quitButton;
var continueButton;
var pauseMenu;
var pauseMenuActive = true;
var videoOn = false;
var isPaused = false;

play.prototype = {

	create : function() {

		// Physics for the platforms
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// reduces jump height
		this.game.physics.arcade.gravity.y = 300;

		// score at the beginning of the game
		score = 0;
		lifeCounter = 3;

		this.levelNumber = 4;// first level
		this.finalLevel = 4;// last level

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// loads the first level level number has to be increased once the player has reached the finish line
		this.loadLevel("");

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

		loseLifeSound = game.add.audio('loseLife');
		collectToolSound = game.add.audio('collectTool');
		collectOxygenSound = game.add.audio('collectOxygen');
		completeLevelSound = game.add.audio('completeLevel');
		collideWithAlienSound = game.add.audio('collideWithAlien');
		animation1 = game.add.video('animation1');
		animation2 = game.add.video('animation2');
		animation3 = game.add.video('animation3');

		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},

	update : function() {

		if (this.enterKey.isDown){
			console.log(this.astronaut.body.x);
			console.log(this.astronaut.body.y);
		}

		/*
		 * collision between astronaut/alien/rocket and the platform/ground layer
		 */
		this.game.physics.arcade.collide(this.astronaut, this.layer);
		this.game.physics.arcade.collide(this.astronaut, this.wall);
		this.game.physics.arcade.collide(alienGroup, this.layer);
		this.game.physics.arcade.collide(this.rocket, this.layer);

		/*
		 * collision between astronaut and rocket/alien
		 */
		this.game.physics.arcade.collide(this.astronaut, this.rocket, this.hitFinish, null, this);
		this.game.physics.arcade.overlap(this.astronaut, alienGroup, this.collideWithAlien, null, this);

		/*
		 * collision between astronaut and tools
		 */
		this.game.physics.arcade.overlap(this.astronaut, this.collectscrewdriver, this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectwrench, this.collectTools, null, this);
		this.game.physics.arcade.overlap(this.astronaut, this.collectpliers, this.collectTools, null, this);

		/*
		 * collision between astronaut and oxygen
		 */

		this.game.physics.arcade.overlap(this.astronaut, oxygenGroup, this.collectOxygen, null, this);

		/*
		 * Moving the player
		 *
		 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
		 *
		 * the second condition is needed to make the backgrounds stop moving once the player is inside the rocket
		 */
		if (isPaused == false) {

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
			} else if (cursors.right.isDown && this.rocket.body.y == 69) {
				this.astronaut.body.velocity.x = 175;
				this.astronaut.scale.x = 1;
				if (this.astronaut.body.onFloor()) {
					this.astronaut.animations.play('walk', 6, true);
				}
				if ((this.astronaut.body.x < 2200 && this.levelNumber == 1) || (this.astronaut.body.x < 4600 && this.levelNumber != 1)) {
					this.background2.x -= 0.25;
					this.background1.x -= 0.3;
				}
			} else {
				this.astronaut.body.velocity.x = 0;
				if (this.astronaut.body.onFloor()) {
					this.astronaut.animations.play('stop', 6, true);
				}
			}

			/*
			 * Jumping
			 */
			if (cursors.up.isDown) {
				this.astronaut.animations.play('jump', 12, true);
				if (this.astronaut.body.onFloor()) {
					this.astronaut.body.velocity.y = -700;
				}
			}

			/*
			 * check if the player has fallen into a rift
			 *
			 * if the player has more than 0 lives left, restart the level
			 */
			if (this.astronaut.body.y > 600 && !this.fallen) {
				lifeCounter--;
				if (soundIsOn == 1) {
					loseLifeSound.play();
				}
				showLife(lifeCounter);
				this.fallen = true;
				if (lifeCounter != 0) {
					this.loadLevel("restart");
				}
			}

			/*
			 * check if the player is dead
			 */
			if (lifeCounter == 0) {
				this.game.state.start('gameOver', true, false);
			}

		}

		/*
		 * alien movement and interaction
		 */

		if (isPaused) {

			for (i = 0; i < alienGroup.children.length; i++) {
				var enemy = alienGroup.children[i];
				enemy.body.velocity.x = 0;
				if (isPaused == true) {
					enemy.animations.play('stop');
				}
			}
		} else {
			for (i = 0; i < alienGroup.children.length; i++) {
				var enemy = alienGroup.children[i];
				if (enemy.pathCounter >= 0) {
					enemy.pathCounter++;
				}

				enemy.animations.play('walk');

				if (enemy.scale.x == 1) {
					enemy.body.velocity.x = 50;
				} else {
					enemy.body.velocity.x = -50;
				}

				if (enemy.pathCounter >= enemy.distance) {
					enemy.pathCounter = 0;
					enemy.scale.x = -enemy.scale.x;
				}

				// enemy facing right,the astronaut is within walking distance of the alien and the alien is facing the wrong direction
				if ((enemy.scale.x == 1)
						&& ((this.astronaut.body.x > (enemy.body.x - enemy.pathCounter)) && (this.astronaut.body.x < (enemy.body.x + (enemy.distance - enemy.pathCounter))))
						&& (this.astronaut.body.x < enemy.body.x)) {

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
				} else if ((enemy.scale.x != 1)
						&& ((this.astronaut.body.x > (enemy.body.x - (enemy.distance - enemy.pathCounter))) && (this.astronaut.body.x < (enemy.body.x + enemy.pathCounter)))
						&& (this.astronaut.body.x > enemy.body.x)) {
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

		if (this.spaceKey.isDown && pauseMenuActive) {
				isPaused = true;
				createPauseMenu(this);
				console.log(isPaused);
			}
			if(isPaused == true) {
				this.timer.pause(); 		}
				else if (isPaused == false)
					{ 			this.timer.resume(); 		}  	},
		/*if (this.spaceKey.isDown) {
			if (pauseMenuActive) {
				isPaused = true;
				this.astronaut.body.velocity.x = 0;
				this.alien.body.velocity.x = 0;
				createPauseMenu();
			} else if (videoOn) {
				this.levelNumber +=1;
				this.loadLevel("restart");
			}

		if (isPaused == true) {
			this.timer.pause();
		} else if (isPaused == false) {
			this.timer.resume();
		}
	}
	},
			*/

	/*
	 * function to load each level
	 */
	loadLevel : function(string) {

		/*
		 * reset values
		 */

		if (this.map != null) { // if a map exists, so do all other objects - we need to destroy them.
			this.map.destroy();
			this.astronaut.kill();
			this.layer.destroy();
			this.rocket.kill();
			this.nopliers.kill();
			this.nowrench.kill();
			this.noscrewdriver.kill();
			alienGroup.destroy();
		}
		sound.play();
		this.toolsCollected = 0;
		this.lifeTimer = 0;
		this.fallen = false;
		this.rocketGone = false;

		// if a new level is loaded (string !=restart), the current score is the new oldScore
		// else we keep the oldScore
		if (string != "restart") {
			oldScore = score;
		}

		// loading the backgrounds
		this.background3 = this.game.add.image(0, 0, 'level' + this.levelNumber + 'background3');
		this.background2 = this.game.add.image(0, 0, 'level' + this.levelNumber + 'background2');
		this.background1 = this.game.add.image(-15, 0, 'level' + this.levelNumber + 'background1');
		/*
		 * adds the tile map to the game !!tilemap json files need to be created with the csv preset and not base64 compressed, or this won't work!!
		 */
		this.map = game.add.tilemap('level' + this.levelNumber);

		// the second parameter needs to be the same as the one used in loading.js
		this.map.addTilesetImage('level' + this.levelNumber + '_tilemap', 'level' + this.levelNumber + '_tilemap');
		this.map.addTilesetImage('level' + this.levelNumber + '_tilemap_ground', 'level' + this.levelNumber + '_tilemap_ground');

		this.map.setCollisionBetween(1, 39); // collision for the platforms

		/*
		 * player may only collide with platform top, so that it is possible to jump on one from beneath it.
		 */
		this.map.forEach(function(t) {
			if (t) {
				t.collideDown = false;
				t.collideLeft = false;
				t.collideRight = false;
			}
		}, game, 0, 0, this.map.width, this.map.height, this.layer);

		this.map.setCollision(41);// collision with the ground

		// element collision
		this.map.setTileIndexCallback(40, this.collectElement, this);

		// the parameter can be found in the json file
		this.layer = this.map.createLayer('Kachelebene 1');

		// This resizes the game world to match the layer dimensions
		this.layer.resizeWorld();

		/*
		 * add tool-placeholder icons for topbar
		 */
		this.nopliers = new Tools(this.game, 690, 10, 1);
		this.game.add.existing(this.nopliers);
		this.nopliers.fixedToCamera = true;

		this.nowrench = new Tools(this.game, 710, 10, 3);
		this.game.add.existing(this.nowrench);
		this.nowrench.fixedToCamera = true;

		this.noscrewdriver = new Tools(this.game, 730, 10, 5);
		this.game.add.existing(this.noscrewdriver);
		this.noscrewdriver.fixedToCamera = true;

		/*
		 * add tools to the levels
		 */
		this.collectpliers = new Tools(this.game, toolLocations['level' + this.levelNumber + 'PliersX'], toolLocations['level' + this.levelNumber + 'PliersY'],
				0);
		this.game.add.existing(this.collectpliers);
		this.collectpliers.body.allowGravity = false;

		this.collectwrench = new Tools(this.game, toolLocations['level' + this.levelNumber + 'WrenchX'], toolLocations['level' + this.levelNumber + 'WrenchY'],
				2);
		this.game.add.existing(this.collectwrench);
		this.collectwrench.body.allowGravity = false;

		this.collectscrewdriver = new Tools(this.game, toolLocations['level' + this.levelNumber + 'ScrewX'], toolLocations['level' + this.levelNumber
				+ 'ScrewY'], 4);
		this.game.add.existing(this.collectscrewdriver);
		this.collectscrewdriver.body.allowGravity = false;

		/*
		 * adds the rocket switch-case needed because level 1 is only half as long as the other levels
		 *
		 * rocket needs to be immovable until player is inside so that it can't be kicked around
		 *
		 * no gravity to make departure cleaner
		 */
		switch (this.levelNumber) {
		case 1:
			switch (activeAstronaut) {
			case 1:
				this.rocket = this.game.add.sprite(2246, 69, 'rocket1');
				break;
			case 2:
				this.rocket = this.game.add.sprite(2246, 69, 'rocket2');
				break;
			case 3:
				this.rocket = this.game.add.sprite(2246, 69, 'rocket3');
				break;
			case 4:
				this.rocket = this.game.add.sprite(2246, 69, 'rocket3');
				break;
			default:
				break;
			}
			break;
		default: // 2, 3,4
			switch (activeAstronaut) {
			case 1:
				this.rocket = this.game.add.sprite(4646, 69, 'rocket1');
				break;
			case 2:
				this.rocket = this.game.add.sprite(4646, 69, 'rocket2');
				break;
			case 3:
				this.rocket = this.game.add.sprite(4646, 69, 'rocket3');
				break;
			case 4:
				this.rocket = this.game.add.sprite(4646, 69, 'rocket4');
				break;
			}
			break;
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
		this.astronaut = new Astronaut(this.game, 4000, 440);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [ 1, 2, 3, 4, 5 ], 26, true);
		this.astronaut.animations.add('jump', [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23 ], 26, true);
		this.astronaut.animations.add('stop', [ 0 ], 26, true);
		this.astronaut.anchor.setTo(0.5, 0.5);
		this.game.camera.follow(this.astronaut);

		score = oldScore;// update the score

		this.scoreText = game.add.text(45, 10, score, {
			font : '30px Raleway',
			fill : '#ffffff'
		});

		this.scoreElement = game.add.image (6, 18, 'elementScore');
		this.scoreText.fixedToCamera = true;

		/*
		 * adding the invisible Wall to make sure the character can't walk out of the screen on the left size
		 */

		this.wall = this.game.add.sprite(-10, 0, 'invisWall');
		this.game.physics.arcade.enableBody(this.wall);
		this.wall.body.allowGravity = false;
		this.wall.body.immovable = true;

		/**
		 * add aliens
		 */
		alienGroup = game.add.group();

		var alienInfo = aliens["level" + this.levelNumber];
		var amountAliens = alienInfo["amount"];
		var alienCoordinates = alienInfo["coordinates"];

		for (i = 1; i <= amountAliens; i++) {
			this.alien = new Alien(this.game, alienCoordinates["alien" + i][0], alienCoordinates["alien" + i][1], alienCoordinates["alien" + i][2]);
			this.game.add.existing(this.alien);
			this.alien.animations.add('walk', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 7, true);
			this.alien.animations.add('stop', [ 0 ], 7, true);
			this.alien.anchor.setTo(0.5, 0.5);
			this.alien.animations.play('walk');
			alienGroup.add(this.alien);
		}

		oxygenGroup = game.add.group();

		var oxygenInfo = oxygens["level" + this.levelNumber];
		var amountOxygen = oxygenInfo["amount"];
		var oxygenCoordinates = oxygenInfo["coordinates"];

		for (i = 1; i <= amountOxygen; i++) {
			this.oxygenBottle = new oxygen(this.game, oxygenCoordinates["oxygen" + i][0], oxygenCoordinates["oxygen" + i][1]);
			this.game.add.existing(this.oxygenBottle);
			oxygenGroup.add(this.oxygenBottle);
		}

		/* shows oxygencounter in each level */
		oxygenCounter = 9;
		oxygenTank = game.add.sprite(750, 510, 'tank');
		oxygenTank.frame = oxygenCounter;
		oxygenTank.fixedToCamera = true;
		--oxygenCounter;
		this.timeDown();

		/* shows life counter in each level */
		var bar = game.add.sprite(0, 0, 'toolbar');
		bar.fixedToCamera = true;
		showLife(lifeCounter);
	},

	/*
	 * collecting an element and removing it from the game
	 */
	collectElement : function(astronaut, tile) {

		var str = astronaut.key.toString();
		if (str.indexOf("char") != -1) {

			this.map.removeTile(tile.x, tile.y, this.layer);

			score += 1;
			this.scoreText.text = 'Score: ' + score;

			this.astronaut.collected++;

			return false;
		}

	},

	/*
	 * called when the player collides with the rocket
	 *
	 * checks if all tools have been collected
	 *
	 */
	hitFinish : function(astronaut, finish) {

		if (this.toolsCollected == 0) {
			this.astronaut.kill();
			this.timer.stop();
			if (soundIsOn == 1) {
				completeLevelSound.play();
			}
			this.rocket.body.immovable = false;
			this.rocket.body.velocity.y = -150;
			this.rocket.animations.play('full');
			score += 50;
			this.scoreText.text = 'Score: '+ score;

			switch (this.levelNumber) {
			case 2:
				if (this.astronaut.collected == amountElements["level" + this.levelNumber]) {
					lifeCounter++;
					showLife(lifeCounter);
				}
				break;
			case 3:
				if (this.astronaut.collected == amountElements["level" + this.levelNumber]) {
					lifeCounter++;
					showLife(lifeCounter);
				}
				break;
			case 4:
				if (this.astronaut.collected == amountElements["level" + this.levelNumber]) {
					lifeCounter++;
					showLife(lifeCounter);
				}
				break;

			default:
				break;
			}

			this.timer2 = game.time.create(false);
			this.timer2.add(3500, function () {this.playVideo(this)}, this);
			this.timer2.start();
		}

	},

	playVideo : function(o) {
		this.timer2.stop();
		videoOn = true;
		pauseMenuActive = false;
		this.timer3 = game.time.create(false);
		this.timer3.add(20000,function (){o.endLevel(o)}, this);
		this.timer3.start();

		if (this.levelNumber < this.finalLevel) {
			switch (this.levelNumber) {
			case 1:
				videoBackground = game.add.sprite(1600, 8, 'startBackground');
				animation1.add(videoBackground);
				animation1.play();
				break;

			case 2:
				videoBackground = game.add.sprite(4000, 8, 'startBackground');
				animation2.add(videoBackground);
				animation2.play();
				break;

			case 3:
				videoBackground = game.add.sprite(4000, 8, 'startBackground');
				animation3.add(videoBackground);
				animation3.play();
				break;
			}
			videoBackground.bringToTop();


		} else if (this.levelNumber == this.finalLevel) {
			game.state.start('bonus');
		}

	},

	endLevel : function(o) {
		animation1.stop();
		o.levelNumber += 1;
		o.loadLevel("");
		pauseMenuActive = true;
		videoOn = false;
	},

	/*
	 * called when player collides with an alien
	 *
	 * lifeTimer is needed to make the player survive the contact after a life has already been lost
	 */
	collideWithAlien : function(astronaut, alien) {
		if (game.time.now > this.lifeTimer) {
			lifeCounter--;
			if (soundIsOn == 1) {
				collideWithAlienSound.play();
			}
			showLife(lifeCounter);
			if (lifeCounter <= 3 && lifeCounter > 0) {
				console.log(lifeCounter);
			}

			this.lifeTimer = game.time.now + 1000;
		}
	},

	collectOxygen : function(astronaut, oxygenBottle) {
		oxygenBottle.kill();
		this.timer.stop();
		if (soundIsOn == 1) {
			collectOxygenSound.play();
		}
		oxygenCounter = 9;
		oxygenTank.kill();
		oxygenTank = game.add.sprite(750, 63, 'tank');
		oxygenTank.frame = oxygenCounter;
		oxygenTank.fixedToCamera = true;
		--oxygenCounter;
		this.timeDown();
	},

	/*
	 * called when the player overlaps with the tools
	 */

	collectTools : function(astronaut, tools) {

		if (tools == this.collectpliers) {
			this.nopliers.kill();
			if (soundIsOn == 1) {
				collectToolSound.play();
			}
			this.pliers = new Tools(this.game, 690, 10, 0);
			this.game.add.existing(this.pliers);
			this.pliers.fixedToCamera = true;
		}
		if (tools == this.collectscrewdriver) {
			this.noscrewdriver.kill();
			if (soundIsOn == 1) {
				collectToolSound.play();
			}
			this.screwdriver = new Tools(this.game, 740, 10, 4);
			this.game.add.existing(this.screwdriver);
			this.screwdriver.fixedToCamera = true;
		}
		if (tools == this.collectwrench) {
			this.nowrench.kill();
			if (soundIsOn == 1) {
				collectToolSound.play();
			}
			this.wrench = new Tools(this.game, 710, 10, 2);
			this.game.add.existing(this.wrench);
			this.wrench.fixedToCamera = true;
		}
		tools.kill();
		this.toolsCollected += 1;
	},

	timeDown : function() {
		var countdown = 30000;
		this.timer = game.time.create(false);
		this.timer.loop(countdown, this.changeDisplay, this);
		this.timer.start();
	},

	changeDisplay : function() {
		if (oxygenCounter > 3) {
			oxygenTank.frame = oxygenCounter;
			--oxygenCounter;
		} else if (oxygenCounter < 4 && oxygenCounter > 0) {
			oxygenTank.animations.add('blink1', [ oxygenCounter, 0 ], 5, true);
			oxygenTank.animations.play('blink1');
			--oxygenCounter;
		} else if (oxygenCounter === 0) {
			oxygenTank.animations.stop();
			oxygenTank.frame = 0;
			--lifeCounter;
			if (soundIsOn == 1) {
				loseLifeSound.play();
			}
			this.loadLevel("restart");
			this.timer.stop();
		} else {
			this.timer.stop();
		}
	}
};

function readLocal() {
	// get the highscores object
	var scores = localStorage.getItem("highScore");
	scores = JSON.parse(scores);

	return scores;
}

/*
 * bubbleSort
 */
function sortHighScore(highScoreList) {
	var swapped;

	do {
		swapped = false;
		for (var i = 0; i < highScoreList.length - 1; i++) {
			v1 = highScoreList[i];
			v2 = highScoreList[i + 1];

			if (v1[1] < v2[1]) {
				var temp = [ v1[0], v1[1] ];
				v1 = [ v2[0], v2[1] ];
				v2 = temp;
				highScoreList[i] = v1;
				highScoreList[i + 1] = v2;
				swapped = true;
			}
		}
	} while (swapped);

	return highScoreList;
}

function createPauseMenu(o) {

	isPaused = true;
	pauseMenuActive = false;

	pauseMenu = game.add.sprite(400, 300, 'pauseBackground');
	pauseMenu.alpha = 1.0;
	pauseMenu.anchor.set(0.5);
	pauseMenu.fixedToCamera = true;

	musicControl = new button(this.game, 75, -165, musicOn, changeMusicOnPauseMenu, 'controlSound');
	pauseMenu.addChild(musicControl);

	soundControl = new button(this.game, -20, -70, soundIsOn, changeSoundOnPauseMenu, 'controlSound');
	pauseMenu.addChild(soundControl);

	restartButton = this.game.add.button(-300, 180, 'restartButton', function() {
		restart(o)
	}, this, 1, 0);
	pauseMenu.addChild(this.restartButton);

	continueButton = this.game.add.button(-50, 180, 'continueButton', continueGame, this, 1, 0);
	pauseMenu.addChild(this.continueButton);

	quitButton = this.game.add.button(210, 185, 'quitButton', quitGame, this, 1, 0);
	pauseMenu.addChild(this.quitButton);

}

function quitGame() { // quits the game

	isPaused = false;
	game.state.start('intro');
	pauseMenuActive = true;

}

function restart(o) {

	isPaused = false;
	lifeCounter = 3;
	o.loadLevel("restart");
	pauseMenuActive = true;

}

function continueGame() {

	isPaused = false;
	pauseMenu.kill();
	pauseMenuActive = true;

}

function changeMusicOnPauseMenu() {
	if (musicOn == 1) {
		musicOn = 0;
		musicControl.kill();
		musicControl = new button(game, 75, -165, 0, changeMusicOnPauseMenu, 'controlSound');
		pauseMenu.addChild(musicControl);
		sound.pause();
	} else {
		musicOn = 1;
		musicControl.kill();
		musicControl = new button(game, 75, -165, 1, changeMusicOnPauseMenu, 'controlSound');
		pauseMenu.addChild(musicControl);
		sound.resume();
	}
}

function changeSoundOnPauseMenu() {
	if (soundIsOn == 1) {
		soundIsOn = 0;
		soundControl.kill();
		soundControl = new button(game, -20, -70, 0, changeSoundOnPauseMenu, 'controlSound');
		pauseMenu.addChild(soundControl);
		// sound.pause();
	} else {
		soundIsOn = 1;
		soundControl.kill();
		soundControl = new button(game, -20, -70, 1, changeSoundOnPauseMenu, 'controlSound');
		pauseMenu.addChild(soundControl);
		// sound.resume();
	}
}
