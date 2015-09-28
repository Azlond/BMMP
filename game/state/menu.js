/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}
var musicOn = true;
var soundOn = true;
var popup;
var soundControl;
var musicControl
var sound;
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
		var startBackground = game.add.sprite(0, 0, 'startBackground'); // adds background
		startBackground.inputEnabled = true;
		startBackground.input.priorityID = 1;
		startBackground.input.useHandCursor = true;
		startBackground.events.onInputDown.add(openOption, this);
	}
};

function startGame() { // starts the game
	var str = playerName.text;

	if (!(str.length < 1)) {
		game.state.start('intro');
		if (soundOn) {
			sound.stop();
		}
	}
}

function updateName(e) {

	var str = playerName.text;

	var nameLength = str.length;

	// Backspace
	if (e.keyCode == 8) {
		str = str.substring(0, str.length - 1);
		playerName.text = str;
	} else if (e.keyCode >= 60 && e.keyCode <= 90 && nameLength < 20) {
		console.log(e.keyCode);
		var str = String.fromCharCode(e.keyCode);
		playerName.text = playerName.text + str;
	}
}

function openOption() {
	sound = game.add.audio('music');
	sound.play();

	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'optionBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	startButton = new button(game, -36, 185, 0, startGame, 'startButton');
	popup.addChild(startButton);

	soundButton = new button(game, 280, 188, 0, soundOption, 'soundButton');
	popup.addChild(soundButton);

	scoreButton = new button(game, -316, 188, 0, scoreOption, 'scoreButton');
	popup.addChild(scoreButton);

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

/** ******* panel to switch music and sound on/off ***************** */

function soundOption() {
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'soundBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	musicControl = new button(game, mControlX, mControlY, 1, changeMusic, 'controlSound');
	popup.addChild(musicControl);

	soundControl = new button(game, sControlX, sControlY, 1, changeSound, 'controlSound');
	popup.addChild(soundControl);

	closeButton = new button(game, -36, 185, 0, closeWindow, 'closeButton');
	popup.addChild(closeButton);
}

function changeMusic() {
	if (musicOn) {
		musicOn = false;
		musicControl.kill();
		musicControl = new button(game, mControlX, mControlY, 0, changeMusic, 'controlSound');
		popup.addChild(musicControl);
		sound.pause();
		console.log(soundOn);
	} else {
		musicOn = true;
		musicControl.kill();
		musicControl = new button(game, mControlX, mControlY, 1, changeMusic, 'controlSound');
		popup.addChild(musicControl);
		sound.resume();
		console.log(soundOn);
	}
}
function changeSound() {
	if (soundOn) {
		soundOn = false;
		soundControl.kill();
		soundControl = new button(game, sControlX, sControlY, 0, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.pause();
		console.log(soundOn);
	} else {
		soundOn = true;
		soundControl.kill();
		soundControl = new button(game, sControlX, sControlY, 1, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.resume();
		console.log(soundOn);
	}
}

/** ** panel for score **** */

function scoreOption() {
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'scoreBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	closeButton = new button(game, -36, 185, 0, closeWindow, 'closeButton');
	popup.addChild(closeButton);

}

/** ** diverse methods**** */

function closeWindow() {
	popup.kill();
}
/*
 * var controlButton = function(game, x, y, frame, option) { this.game = game; Phaser.Sprite.call(this, this.game, x, y, 'controlSound', frame);
 * this.inputEnabled = true; this.input.priorityID = 1; this.input.useHandCursor = true; this.events.onInputDown.add(option, this); }; controlButton.prototype =
 * Object.create(Phaser.Sprite.prototype); controlButton.prototype.constructor = controlButton;
 */
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