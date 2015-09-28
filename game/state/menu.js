/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}
var musicOn = 1;
var soundOn = 1;
var popup;
var popupOption;
var soundControl;
var musicControl
var sound;
var video;
var introFinished = false;
var mControlX = -66;
var mControlY = -185;
var sControlX = -156;
var sControlY = -100;
var character;
var startButton;
var soundButton;
var scoreButton;
var closeButton;
var playerName;
var playerRegEx = /8|6[5-9]|7[0-9]|8[0-9]|90/;

menu.prototype = {

	create : function() {
		sound = game.add.audio('music');
		sound.play();

		popupOption = game.add.sprite(game.world.centerX, game.world.centerY, 'optionBackground');
		popupOption.alpha = 1.0;
		popupOption.anchor.set(0.5);

		startButton = new button (game, -36,185, 0, startGame, 'startButton');
		popupOption.addChild(startButton);
	
		soundButton = new button (game, 280, 188, 0, soundOption, 'soundButton');
		popupOption.addChild(soundButton);

		scoreButton = new button (game, -316, 188, 0, scoreOption, 'scoreButton');	
		popupOption.addChild(scoreButton);

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


function startGame() {
	var str = playerName.text;

	if (!(str.length < 1)) {
		video = this.game.add.video('intro');
		video.play(true);
		video.loop = false;
		video.onComplete.add(handleComplete);
		video.addToWorld(400, 300, 0.5, 0.5);
		game.input.keyboard.onUpCallback = function(e) {
			handleComplete();
		}
		if (soundOn) {
			sound.stop();
		}
	}
}

function updateName(e) {

	// Backspace
	if (e.keyCode == 8) {
		var str = playerName.text;
		str = str.substring(0, str.length - 1);
		playerName.text = str;
	} else {
		var str = String.fromCharCode(e.keyCode);
		playerName.text = playerName.text + str;
	}
}


function handleComplete() {
	if (!introFinished) {
		game.state.start('play');
		introFinished = true;
		video.stop(true);
		video.destroy();
	}
}


function soundOption () {
	
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'soundBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);
	
	soundButton.kill();
	scoreButton.kill();
	startButton.kill();
	
	musicControl = new button (game, mControlX, mControlY, musicOn, changeMusic, 'controlSound');
	popup.addChild(musicControl);

	soundControl = new button(game, sControlX, sControlY, 1, changeSound, 'controlSound');
	popup.addChild(soundControl);

	closeButton = new button (game, -36, 185, 0, closeWindow, 'closeButton');
	popup.addChild(closeButton);
}


function changeMusic() {
	if (musicOn == 1) {
		musicOn = 0;
		musicControl.kill();
		musicControl = new button (game, mControlX, mControlY, 0, changeMusic, 'controlSound');
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
	if (soundOn == 1) {
		soundOn = 0;
		soundControl.kill();
		soundControl = new button (game, sControlX, sControlY, 0, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.pause();
		console.log(soundOn);
	} else {
		soundOn = 1;
		soundControl.kill();
		soundControl = new button (game, sControlX, sControlY, 1, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.resume();
		console.log(soundOn);
	}
}

function scoreOption () {
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'scoreBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	soundButton.kill();
	scoreButton.kill();
	startButton.kill();

	closeButton = new button (game, -36, 185, 0, closeWindow, 'closeButton');
	popup.addChild(closeButton);
}


function closeWindow() {
	popup.kill();
	soundButton = new button (game, 280, 188, 0, soundOption, 'soundButton');
	popupOption.addChild(soundButton);

	scoreButton = new button (game, -316, 188, 0, scoreOption, 'scoreButton');	
	popupOption.addChild(scoreButton);
	
	startButton = new button (game, -36,185, 0, startGame, 'startButton');
	popupOption.addChild(startButton);
	
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