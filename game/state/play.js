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
var timer;
var life;
var alienGroup;

var restartButton;
var quitButton;
var continueButton;
var popup;
var soundOn;
var soundOff;
var musicOn;
var musicOff;

var soundOn = true;

play.prototype = {

	create : function() {

		// Physics for the platforms
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		// reduces jump height
		this.game.physics.arcade.gravity.y = 300;

		// score at the beginning of the game
		score = 0;
		lifeCounter = 3;

		this.levelNumber = 1;// first level
		this.finalLevel = 4;// last level

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// loads the first level level number has to be increased once the player has reached the finish line
		this.loadLevel("");

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

	},

	update : function() {
		/*
		 * collision between astronaut/alien/rocket and the platform/ground layer
		 */
		this.game.physics.arcade.collide(this.astronaut, this.layer);
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
		 * Moving the player
		 * 
		 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
		 * 
		 * the second condition is needed to make the backgrounds stop moving once the player is inside the rocket
		 */
		if (cursors.left.isDown && this.rocket.body.y == 69) {
			this.astronaut.body.velocity.x = -175;
			if (this.astronaut.body.onFloor()) {
				this.astronaut.animations.play('walk', 7, true);
			}
			this.astronaut.scale.x = -1;
			this.background2.x += 0.25;
			this.background1.x += 0.3;
		} else if (cursors.right.isDown && this.rocket.body.y == 69) {
			this.astronaut.body.velocity.x = 175;
			this.astronaut.scale.x = 1;
			if (this.astronaut.body.onFloor()) {
				this.astronaut.animations.play('walk', 7, true);
			}
			this.background2.x -= 0.25;
			this.background1.x -= 0.3;
		} else {
			this.astronaut.body.velocity.x = 0;
			if (this.astronaut.body.onFloor()) {
				this.astronaut.animations.play('stop', 7, true);
			}
		}

		if (cursors.down.isDown) {
			readLocal();
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
		 * check if the player is dead
		 */
		if (lifeCounter == 0) {
			this.saveLocal();
			this.game.state.start('gameOver');
		}

		/*
		 * check if the player has fallen into a rift
		 * 
		 * if the player has more than 0 lives left, restart the level
		 */
		if (this.astronaut.body.y > 600 && !this.fallen) {
			lifeCounter--;
			showLife(lifeCounter);
			this.fallen = true;
			if (lifeCounter != 0) {
				this.loadLevel("restart");
			}
		}

		/*
		 * check if the rocket has left the camera fov
		 */
		if (this.rocket.body.y <= -420) {
			this.rocketGone = true;
		}

		/*
		 * rocket has left camera fov, either load the next level or display win message
		 */
		if (this.rocketGone) {
			if (this.levelNumber == this.finalLevel) {
				game.state.start('win');
			} else {
				this.levelNumber += 1;
				this.loadLevel("");
			}
		}

		/*
		 * TODO: Make AI responsive to player
		 */

		for (i = 0; i < alienGroup.children.length; i++) {
			var enemy = alienGroup.children[i];
			if (enemy.pathCounter >= 0) {
				enemy.pathCounter++;
			}
			if (enemy.pathCounter >= enemy.distance) {
				if (enemy.scale.x == -1 && enemy.body.velocity.x == -50) {
					enemy.pathCounter = 0;
					enemy.scale.x = 1;
					enemy.body.velocity.x = 50;
				} else if (enemy.scale.x == 1 && enemy.body.velocity.x == 50) {
					enemy.pathCounter = 0;
					enemy.scale.x = -1;
					enemy.body.velocity.x = -50;
				}
			}
		}

		if (this.spaceKey.isDown) {

			popup = game.add.image(400, 300, 'pauseBackground');
			popup.alpha = 1.0;
			popup.anchor.set(0.5);
			popup.fixedToCamera = true;

			restartButton = game.add.button(-300, 180, 'restartButton', this.restartGame, this, 1, 0);
			popup.addChild(restartButton);

			continueButton = game.add.button(-50, 180, 'continueButton', this.continueGame, this, 1, 0);
			popup.addChild(continueButton);

			quitButton = game.add.button(210, 185, 'quitButton', this.quitGame, this, 1, 0);
			popup.addChild(quitButton);

		}

	},

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

		this.toolsCollected = 0;
		this.lifeTimer = 0;
		this.fallen = false;

		// if a new level is loaded (string !=restart), the current score is the new oldScore
		// else we keep the oldScore
		if (string != "restart") {
			oldScore = score;
		}

		// loading the backgrounds
		this.background3 = this.game.add.image(0, 0, 'level' + this.levelNumber + 'background3');
		this.background2 = this.game.add.image(0, 0, 'level' + this.levelNumber + 'background2');
		this.background1 = this.game.add.image(-15, 0, 'level' + this.levelNumber + 'background1');
		this.rocketGone = false;
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
		this.nopliers = new Tools(this.game, 230, 15, 1);
		this.game.add.existing(this.nopliers);
		this.nopliers.fixedToCamera = true;

		this.nowrench = new Tools(this.game, 260, 15, 3);
		this.game.add.existing(this.nowrench);
		this.nowrench.fixedToCamera = true;

		this.noscrewdriver = new Tools(this.game, 290, 15, 5);
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
			this.rocket = this.game.add.sprite(2246, 69, 'rocket');
			break;
		default: // 2, 3,4
			this.rocket = this.game.add.sprite(4646, 69, 'rocket');
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
		this.astronaut = new Astronaut(this.game, 100, 440);
		this.game.add.existing(this.astronaut);
		this.astronaut.animations.add('walk', [ 1, 2, 3, 4, 5 ], 20, true);
		this.astronaut.animations.add('jump', [ 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ], 20, true);
		this.astronaut.animations.add('stop', [ 0 ], 20, true);
		this.astronaut.anchor.setTo(0.5, 0.5);
		this.game.camera.follow(this.astronaut);

		score = oldScore;// update the score

		this.scoreText = game.add.text(0, 20, 'Score: ' + score, {
			font : '30px Courier',
			fill : '#ffffff'
		});
		this.scoreText.fixedToCamera = true;

		/**
		 * add aliens TODO: hashmap with locations similar to the tools to support multiple aliens
		 */
		alienGroup = game.add.group();

		var alienInfo = aliens["level" + this.levelNumber];
		var amountAliens = alienInfo["amount"];
		var alienCoordinates = alienInfo["coordinates"];

		for (i = 1; i <= amountAliens; i++) {
			this.alien = new Alien(this.game, alienCoordinates["alien" + i][0], alienCoordinates["alien" + i][1], alienCoordinates["alien" + i][2]);
			this.game.add.existing(this.alien);
			this.alien.animations.add('walk', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 7, true);
			this.alien.anchor.setTo(0.5, 0.5);
			this.alien.animations.play('walk');
			alienGroup.add(this.alien);
		}

		/* shows oxygencounter in each level */
		oxygenCounter = 9;
		oxygenTank = game.add.sprite(750, 63, 'tank');
		oxygenTank.frame = oxygenCounter;
		oxygenTank.fixedToCamera = true;
		--oxygenCounter;
		this.timeDown();

		/* shows life counter in each level */
		var toolbar = game.add.sprite(0, 0, 'toolbar');
		toolbar.fixedToCamera = true;
		showLife(lifeCounter);
	},

	/*
	 * collecting an element and removing it from the game
	 */
	collectElement : function(astronaut, tile) {
		// if (astronaut.key.contains("char")) {
		// astronaut.key does not work in safari
		this.map.removeTile(tile.x, tile.y, this.layer);

		score += 1;
		this.scoreText.text = 'Score: ' + score;

		return false;
		// }

	},

	/*
	 * called when the player collides with the rocket
	 * 
	 * checks if all tools have been collected
	 */
	hitFinish : function(astronaut, finish) {

		if (this.toolsCollected == 3) {
			this.astronaut.kill();
			this.rocket.body.immovable = false;
			this.rocket.body.velocity.y = -150;
			this.rocket.animations.play('full');
			score += 50;
			this.scoreText.text = 'Score: ' + score;
			this.saveLocal();
		}
	},

	/*
	 * called when player collides with an alien
	 * 
	 * lifeTimer is needed to make the player survive the contact after a life has already been lost
	 */
	collideWithAlien : function(astronaut, alien) {
		if (game.time.now > this.lifeTimer) {
			lifeCounter--;
			showLife(lifeCounter);
			if (lifeCounter <= 3 && lifeCounter > 0) {
				console.log(lifeCounter);
			}

			this.lifeTimer = game.time.now + 750;
		}
	},

	/*
	 * called when the player overlaps with the tools
	 */

	collectTools : function(astronaut, tools) {

		if (tools == this.collectpliers) {
			this.nopliers.kill();
			this.pliers = new Tools(this.game, 230, 15, 0);
			this.game.add.existing(this.pliers);
			this.pliers.fixedToCamera = true;
		}
		if (tools == this.collectscrewdriver) {
			this.noscrewdriver.kill();
			this.screwdriver = new Tools(this.game, 290, 15, 4);
			this.game.add.existing(this.screwdriver);
			this.screwdriver.fixedToCamera = true;
		}
		if (tools == this.collectwrench) {
			this.nowrench.kill();
			this.wrench = new Tools(this.game, 260, 15, 2);
			this.game.add.existing(this.wrench);
			this.wrench.fixedToCamera = true;
		}
		tools.kill();
		this.toolsCollected += 1;
	},

	timeDown : function() {
		var countdown = 100000;
		timer = game.time.create(false);
		timer.loop(countdown, this.changeDisplay, this);
		timer.start();
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
			this.loadLevel("restart");
			timer.stop();
		} else {
			timer.stop();
		}
	},

	saveLocal : function() {
		if (score != 0) {
			var scores = localStorage.getItem('highScore') || [];

			if (scores.length != 0) {
				scores = JSON.parse(scores);
			}
			this.parseJson(scores);
		}
	},

	quitGame : function() { // quits the game

		console.log("Quit the game");
		this.game.state.start('intro');

	},

	restartGame : function() {

		console.log("Restart the game");
		this.loadLevel("restart");

	},

	continueGame : function() {

		popup.kill();
		console.log("Continue the game");

	},

	restartHover : function() {
		this.game.add.button(-300, 180, 'restartHighlight', this.restartGame, this, 1, 0);
	},

	continueHover : function() {

	},

	quitHover : function() {

	},

	parseJson : function(json) {
		var pName = playerName.text.toString();
		var playerExists = false;

		if (json.length == 0) {
			var tjson = [ pName, score ];
			json.push(tjson);
			localStorage.setItem("highScore", JSON.stringify(json));
		} else {
			for (i = 0; i < json.length; i++) {
				var tArray = json[i];
				var highScoreName = tArray[0];
				var playerHighScore = tArray[1];

				if (highScoreName == pName) {
					playerExists = true;
					if (playerHighScore < score) {
						json.splice(i, 1);
						var tjson = [ pName, score ];
						json.push(tjson);
						localStorage.setItem("highScore", JSON.stringify(json));
					}
				}
			}
			if (!playerExists) {
				var tjson = [ pName, score ];
				json.push(tjson);
				localStorage.setItem("highScore", JSON.stringify(json));
			}
		}
	}

};

function readLocal() {
	// localStorage.clear();
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
