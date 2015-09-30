/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}

var musicOn = 1;
var soundIsOn = 1;
var popup;
var background;
var soundControl;
var musicControl
var sound;
var missionVideo;
var introVideo;
var introFinished;
var mControlX = -66;
var mControlY = -185;
var sControlX = -156;
var sControlY = -100;
var player1;
var player2;
var player3;
var player4;
var startButton;
var soundButton;
var scoreButton;
var closeButton;
var playerName;
var playerRegEx = /8|6[5-9]|7[0-9]|8[0-9]|90/;
var highScoreGroup;
var activeAstronaut = 1;

menu.prototype = {

	create : function() {
		
		sound = game.add.audio('music'); sound.play();
		
		background = game.add.sprite(400, 300, 'optionBackground');
		background.alpha = 1.0;
		background.anchor.set(0.5);

		/* characterauswahl */

		player1 = game.add.button(-286, -120, 'player1', highlightButton, this, 0, 1);
		background.addChild(player1);

		player2 = game.add.button(-138, -120, 'player2', highlightButton, this, 0);
		background.addChild(player2);

		player3 = game.add.button(10, -120, 'player3', highlightButton, this, 0);
		background.addChild(player3);

		player4 = game.add.button(158, -120, 'player4', highlightButton, this, 0);
		background.addChild(player4);

		/* buttons */

		startButton = game.add.button(-36, 193, 'startButton', startIntro, this, 1, 0);
		background.addChild(startButton);

		soundButton = game.add.button(280, 188, 'soundButton', soundOption, this, 1, 0);
		background.addChild(soundButton);

		scoreButton = game.add.button(-316, 188, 'scoreButton', scoreOption, this, 1, 0);
		background.addChild(scoreButton);

		playerName = game.add.text(370, 139, "", {
			font : '30px Courier',
			fill : '#ffffff'
		});

		game.input.keyboard.onUpCallback = function(e) {
			if (playerRegEx.test(e.keyCode)) {
				updateName(e);
			}
		}
	}
};

function startIntro() {
	var str = playerName.text;

	if (!(str.length < 1)) {
		introVideo = this.game.add.video('intro');
		introVideo.play(true);
		introVideo.loop = false;
		introVideo.onComplete.add(startGame);
		introVideo.addToWorld(400, 300, 0.5, 0.5);
		game.input.keyboard.onUpCallback = function(e) {
			startGame();
		}
		if (soundOn) {
			sound.stop();
		}
	}
}

function startGame() {
	introVideo.stop();
	missionVideo = this.game.add.video('mission');
	missionVideo.play(true);
	introFinished = false;
	missionVideo.loop = false;
	missionVideo.onComplete.add(handleComplete);
	missionVideo.addToWorld(400, 300, 0.5, 0.5);
	game.input.keyboard.onUpCallback = function(e) {
		handleComplete();
	}
}

function updateName(e) {
	var str = playerName.text;

	// Backspace
	if (e.keyCode == 8) {
		str = str.substring(0, str.length - 1);
		playerName.text = str;
	} else if (e.keyCode >= 65 && e.keyCode <= 90 && str.length < 13) {
		var str = String.fromCharCode(e.keyCode);
		playerName.text = playerName.text + str;
	}
}

function handleComplete() {
	if (!introFinished) {
		introFinished = true;
		missionVideo.stop(true);
		game.state.start('play');
		missionVideo.destroy();
		if (soundOn) {
		sound.play();
		}
	}
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

	musicControl = new button(game, mControlX, mControlY, musicOn, changeMusic, 'controlSound');
	popup.addChild(musicControl);

	soundControl = new button(game, sControlX, sControlY, soundIsOn, changeSound, 'controlSound');
	popup.addChild(soundControl);

	closeButton = game.add.button(-36, 188, 'closeButton', closeWindow, this, 1, 0);
	popup.addChild(closeButton);
}

function changeMusic() {
	if (musicOn == 1) {
		musicOn = 0;
		musicControl.kill();
		musicControl = new button(game, mControlX, mControlY, 0, changeMusic, 'controlSound');
		popup.addChild(musicControl);
		sound.pause();
	} else {
		musicOn = 1;
		musicControl.kill();
		musicControl = new button(game, mControlX, mControlY, 1, changeMusic, 'controlSound');
		popup.addChild(musicControl);
		sound.resume();
	}
}
function changeSound() {
	if (soundIsOn == 1) {
		soundIsOn = 0;
		soundControl.kill();
		soundControl = new button(game, sControlX, sControlY, 0, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.pause();
	} else {
		soundIsOn = 1;
		soundControl.kill();
		soundControl = new button(game, sControlX, sControlY, 1, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.resume();
	}
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
				font : '30px Courier',
				fill : '#ffffff'
			});

			var n = game.add.text(250, firstPlace, highScoreList[i][0], {
				font : '30px Courier',
				fill : '#ffffff'
			});

			var s = game.add.text(550, firstPlace, highScoreList[i][1], {
				font : '30px Courier',
				fill : '#ffffff'
			});
			highScoreGroup.add(n);
			highScoreGroup.add(s);
			highScoreGroup.add(p);
			firstPlace += 35;
		}
	}

}

function resetScore() {
	localStorage.clear();
	closeWindow();
	scoreOption();
}

function closeWindow() {
	popup.kill();
	soundButton = new button(game, 280, 188, 0, soundOption, 'soundButton');
	background.addChild(soundButton);

	player1 = game.add.button(-314, -120, 'player1', highlightButton(1), this, 0);
	background.addChild(player1);

	player2 = game.add.button(-157, -120, 'player2', highlightButton(2), this, 0);
	background.addChild(player2);

	player3 = game.add.button(20, -120, 'player3', highlightButton(3), this, 0);
	background.addChild(player3);

	player4 = game.add.button(177, -120, 'player4', highlightButton(4), this, 0);
	background.addChild(player4);

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

function highlightButton(player) {
	/*
	 * switch (player) { case 1: player1.kill(); player1 = game.add.sprite(-314, -120, 'player1'); player1.frame = 0; background.addChild(player1);
	 * activeAstronaut = 1; break; case 2: player2.kill(); player2 = game.add.sprite(-314, -120, 'player2'); player2.frame = 0; background.addChild(player2);
	 * activeAstronaut = 2; break; case 3: player3.kill(); player3 = game.add.sprite(-314, -120, 'player1'); player3.frame = 0; background.addChild(player3);
	 * activeAstronaut = 3; break; case 4: player4.kill(); player4 = game.add.sprite(-314, -120, 'player1'); player4.frame = 0; background.addChild(player4);
	 * activeAstronaut = 4; break; default: break; }
	 * 
	 */
}

var button = function(game, x, y, frame, option, keyName) {
	this.game = game;
	Phaser.Sprite.call(this, this.game, x, y, keyName, frame);
	this.inputEnabled = true;
	this.input.priorityID = 1;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(option, this);

};
button.prototype = Object.create(Phaser.Sprite.prototype);
button.prototype.constructor = button;
