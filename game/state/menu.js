/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}

var musicOn = true;
var soundIsOn = true;
var popup;
var background;
var soundControl;
var musicControl
var background_music;
var missionVideo;
var introVideo;
var introFinished;
var mControlX = -66;
var mControlY = -130;
var sControlX = -156;
var sControlY = -45;
var player1;
var player2;
var player3;
var player4;
var startButton;
var soundButton;
var scoreButton;
var closeButton;
var playerName;
var highScoreGroup;
var activeAstronaut;
var buttonSound;

menu.prototype = {

	create : function() {

		if (musicOn) {
			background_music = game.add.audio('background_music');
			background_music.play('', 0, 1, true);
		}

		background = game.add.sprite(400, 300, 'optionBackground');
		background.alpha = 1.0;
		background.anchor.set(0.5);

		buttonSound = game.add.audio('buttonSound');

		/* characterauswahl */

		player1 = game.add.button(-306, -130, 'player1', function() {
			highlightButton(1)
		}, this, 1, 0);
		background.addChild(player1);

		player2 = game.add.button(-153, -130, 'player2', function() {
			highlightButton(2)
		}, this, 1, 0);
		background.addChild(player2);

		player3 = game.add.button(0, -130, 'player3', function() {
			highlightButton(3)
		}, this, 1, 0);
		background.addChild(player3);

		player4 = game.add.button(153, -130, 'player4', function() {
			highlightButton(4)
		}, this, 1, 0);
		background.addChild(player4);

		/* buttons */

		startButton = game.add.button(-36, 193, 'startButton', startIntro, this, 1, 0);
		background.addChild(startButton);

		soundButton = game.add.button(280, 188, 'soundButton', soundOption, this, 1, 0);
		background.addChild(soundButton);

		scoreButton = game.add.button(-316, 188, 'scoreButton', scoreOption, this, 1, 0);
		background.addChild(scoreButton);

		if (playerName == null) {
			playerName = game.add.text(370, 136, "", {
				font : '27px Raleway',
				fill : '#ffffff'
			});
		} else {
			playerName = game.add.text(370, 136, playerName.text, {
				font : '27px Raleway',
				fill : '#ffffff'
			});
		}

		/* The RegEx only allows letters and backspace */
		game.input.keyboard.onUpCallback = function(e) {
			if (/8|6[5-9]|7[0-9]|8[0-9]|90/.test(e.keyCode)) {
				updateName(e);
			}
		}
	}
};

function changeMusic() {
	if (soundIsOn) {
		buttonSound.play('', 0, 0.2);
	}
	musicOn = !musicOn;
	musicControl.kill();
	musicControl = new button(game, mControlX, mControlY, (musicOn ? 1 : 0), changeMusic, 'controlSound');
	popup.addChild(musicControl);
	background_music.pause();
}

function scoreOption() {
	popup = game.add.sprite(400, 300, 'scoreBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	soundButton.kill();
	scoreButton.kill();
	startButton.kill();
	player1.kill();
	player2.kill();
	player3.kill();
	player4.kill();

	closeButton = game.add.button(-316, 188, 'closeButton', closeWindow, this, 1, 0);
	popup.addChild(closeButton);

	resetButton = game.add.button(260, 188, 'resetButton', resetScore, this, 1, 0);
	popup.addChild(resetButton);

	var highScoreList = readLocal();

	if (highScoreList != null) {
		highScoreList = sortHighScore(highScoreList);

		var firstPlace = 125;

		highScoreGroup = game.add.group();

		for (i = 0; (i < highScoreList.length) && (i < 10); i++) {

			var p = game.add.text(190, firstPlace, i + 1 + ". ", {
				font : '30px Raleway',
				fill : '#ffffff'
			});

			var n = game.add.text(250, firstPlace, highScoreList[i][0], {
				font : '30px Raleway',
				fill : '#ffffff'
			});

			var s = game.add.text(550, firstPlace, highScoreList[i][1], {
				font : '30px Raleway',
				fill : '#ffffff'
			});
			highScoreGroup.add(n);
			highScoreGroup.add(s);
			highScoreGroup.add(p);
			firstPlace += 35;
		}
	}
}

function changeSound() {
	soundIsOn = !soundIsOn;
	if (soundIsOn) {
		buttonSound.play('', 0, 0.2);
	}
	soundControl.kill();
	soundControl = new button(game, sControlX, sControlY, (soundIsOn ? 1 : 0), changeSound, 'controlSound');
	popup.addChild(soundControl);
}

function closeWindow() {
	popup.kill();
	player1 = game.add.button(-306, -130, 'player1', function() {
		highlightButton(1)
	}, this, 1, 0);
	background.addChild(player1);

	player2 = game.add.button(-153, -130, 'player2', function() {
		highlightButton(2)
	}, this, 1, 0);
	background.addChild(player2);

	player3 = game.add.button(0, -130, 'player3', function() {
		highlightButton(3)
	}, this, 1, 0);
	background.addChild(player3);

	player4 = game.add.button(153, -130, 'player4', function() {
		highlightButton(4)
	}, this, 1, 0);
	background.addChild(player4);

	if (activeAstronaut != null) {

		switch (activeAstronaut) {
			case 1:
				player1 = game.add.sprite(-306, -130, 'player1');
				player1.frame = 1;
				background.addChild(player1);
				break;
			case 2:
				player2 = game.add.sprite(-153, -130, 'player2');
				player2.frame = 1;
				background.addChild(player2);
				break;
			case 3:
				player3 = game.add.sprite(0, -130, 'player3');
				player3.frame = 1;
				background.addChild(player3);
				break;
			case 4:
				player4 = game.add.sprite(153, -130, 'player4');
				player4.frame = 1;
				background.addChild(player4);
				break;
			default:
				break;
		}

	}

	/* buttons */

	startButton = game.add.button(-36, 193, 'startButton', startIntro, this, 1, 0);
	background.addChild(startButton);

	soundButton = game.add.button(280, 188, 'soundButton', soundOption, this, 1, 0);
	background.addChild(soundButton);

	scoreButton = game.add.button(-316, 188, 'scoreButton', scoreOption, this, 1, 0);
	background.addChild(scoreButton);

	if (highScoreGroup != null) {
		highScoreGroup.destroy();
	}

}

function handleComplete() {
	if (!introFinished) {
		game.state.start('play', true, false);
		introFinished = true;
		missionVideo.stop(true);
		game.state.start('play');
	}
}

function highlightButton(player) {
	if (activeAstronaut != null) {
		switch (activeAstronaut) {
			case 1:
				player1.kill();
				player1 = game.add.button(-306, -130, 'player1', function() {
					highlightButton(1)
				}, this, 1, 0);
				background.addChild(player1);
				break;
			case 2:
				player2.kill();
				player2 = game.add.button(-153, -130, 'player2', function() {
					highlightButton(2)
				}, this, 1, 0);
				background.addChild(player2);
				break;
			case 3:
				player3.kill();
				player3 = game.add.button(0, -130, 'player3', function() {
					highlightButton(3)
				}, this, 1, 0);
				background.addChild(player3);
				break;
			case 4:
				player4.kill();
				player4 = game.add.button(153, -130, 'player4', function() {
					highlightButton(4)
				}, this, 1, 0);
				background.addChild(player4);
				break;
		}

	}

	switch (player) {
		case 1:
			player1 = game.add.sprite(-306, -130, 'player1');
			player1.frame = 1;
			background.addChild(player1);
			activeAstronaut = 1;
			break;
		case 2:
			player2 = game.add.sprite(-153, -130, 'player2');
			player2.frame = 1;
			background.addChild(player2);
			activeAstronaut = 2;
			break;
		case 3:
			player3 = game.add.sprite(0, -130, 'player3');
			player3.frame = 1;
			background.addChild(player3);
			activeAstronaut = 3;
			break;
		case 4:
			player4 = game.add.sprite(153, -130, 'player4');
			player4.frame = 1;
			background.addChild(player4);
			activeAstronaut = 4;
			break;
		default:
			break;
	}

}

function readLocal() {
	/* get the highscore object */
	var scores = localStorage.getItem("highScore");
	scores = JSON.parse(scores);

	return scores;
}

function resetScore() {
	localStorage.clear();
	closeWindow();
	scoreOption();
}

/* bubbleSort */
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

function soundOption() {

	popup = game.add.sprite(400, 300, 'soundBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	soundButton.kill();
	scoreButton.kill();
	startButton.kill();
	player1.kill();
	player2.kill();
	player3.kill();
	player4.kill();

	musicControl = new button(game, mControlX, mControlY, (musicOn ? 1 : 0), changeMusic, 'controlSound');
	popup.addChild(musicControl);

	soundControl = new button(game, sControlX, sControlY, (soundIsOn ? 1 : 0), changeSound, 'controlSound');
	popup.addChild(soundControl);

	closeButton = game.add.button(-36, 188, 'closeButton', closeWindow, this, 1, 0);
	popup.addChild(closeButton);
}

function startGame() {
	introVideo.stop();
	missionVideo = game.add.video('mission');
	missionVideo.play(true);
	introFinished = false;
	missionVideo.loop = false;
	missionVideo.onComplete.add(handleComplete);
	missionVideo.addToWorld(400, 300, 0.5, 0.5);
	game.input.keyboard.onUpCallback = function(e) {
		handleComplete();
	}
}

function startIntro() {
	var str = playerName.text;

	if (!(str.length < 1) && activeAstronaut != null) {
		background.kill();
		introVideo = this.game.add.video('intro');
		introVideo.play(true);
		introVideo.loop = false;
		introVideo.onComplete.add(startGame);
		introVideo.addToWorld(400, 300, 0.5, 0.5);
		game.input.keyboard.onUpCallback = function(e) {
			startGame();
		}
		if (musicOn) {
			background_music.stop();
		}
	}
}

function updateName(e) {
	var str = playerName.text;

	/* Backspace */
	if (e.keyCode == 8) {
		str = str.substring(0, str.length - 1);
		playerName.text = str;
	} else if (e.keyCode >= 65 && e.keyCode <= 90 && str.length < 13) {
		var str = String.fromCharCode(e.keyCode);
		playerName.text = playerName.text + str;
	}
}

function button(game, x, y, frame, option, keyName) {
	this.game = game;
	Phaser.Sprite.call(this, this.game, x, y, keyName, frame);
	this.inputEnabled = true;
	this.input.priorityID = 1;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(option, this);
}

button.prototype = Object.create(Phaser.Sprite.prototype);
button.prototype.constructor = button;
