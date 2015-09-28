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

menu.prototype = {

	create : function() {
		
		var startBackground = game.add.sprite(0, 0, 'startBackground'); // adds background
		startBackground.inputEnabled = true;
		startBackground.input.priorityID = 1;
		startBackground.input.useHandCursor = true;

		startBackground.events.onInputDown.add(openOption, this);
	}
};


function startGame() { //starts the game

	game.state.start('intro');
	if (soundOn) {
		sound.stop();
	}
}

function openOption () {
	sound = game.add.audio ('music');
	sound.play();
	
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'optionBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);
	popup.inputEnabled = true;

	startButton = new button (game, -46.5, 185, 0, startGame, 'startButton');
	startButton.events.onInputOver.add(highlight, this);
	popup.addChild(startButton);

	soundButton = game.make.sprite (297, 180, 'sound_button');
	soundButton.inputEnabled = true;
	soundButton.input.priorityID = 1;
	soundButton.input.useHandCursor = true;
	soundButton.events.onInputDown.add(soundOption, this);
	popup.addChild(soundButton);

	scoreButton = game.make.sprite (-333, 180, 'score_button');
	scoreButton.inputEnabled = true;
	scoreButton.input.priorityID = 1;
	scoreButton.input.useHandCursor = true;
	scoreButton.events.onInputDown.add(scoreOption, this);
	popup.addChild(scoreButton);
	
}


/********* panel to switch music and sound on/off ******************/

function soundOption () {
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'soundBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);
	popup.inputEnabled = true;
	
	musicControl = new controlButton (game, mControlX, mControlY,  1, changeMusic);
	popup.addChild(musicControl);
	
	soundControl = new controlButton (game, sControlX, sControlY,  1, changeSound);
	popup.addChild(soundControl);
	
	closeButton = new button (game, -36, 185, 0, closeWindow, 'doneButton');
	popup.addChild(closeButton);
}

function changeMusic() {
	if (musicOn) {
		musicOn = false;
		musicControl.kill();
		musicControl = new controlButton(game, mControlX, mControlY, 0, changeMusic);
		popup.addChild(musicControl);
		sound.pause();
		console.log(soundOn);
	} else {
		musicOn = true;
		musicControl.kill();
		musicControl = new controlButton(game, mControlX, mControlY, 1, changeMusic);
		popup.addChild(musicControl);
		sound.resume();
		console.log(soundOn);
	}
}
function changeSound() {
	if (soundOn) {
		soundOn = false;
		soundControl.kill();
		soundControl = new controlButton(game, sControlX, sControlY, 0, changeSound);
		popup.addChild(soundControl);
		//sound.pause();
		console.log(soundOn);
	} else {
		soundOn = true;
		soundControl.kill();
		soundControl = new controlButton(game, sControlX, sControlY, 1, changeSound);
		popup.addChild(soundControl);
		//sound.resume();
		console.log(soundOn);
	}
}


/**** panel for score  *****/

function scoreOption() {
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'startBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);
	popup.inputEnabled = true;
	
	closeButton = new button (game, -36, 185, 0, closeWindow, 'doneButton');
	popup.addChild(closeButton);
	
	
}

/**** diverse methods*****/


function highlight () {}

function closeWindow() {
	popup.kill();
}


var button = function (game, x, y, frame, option, keyName) { 
	this.game = game;
	Phaser.Sprite.call(this, this.game, x, y, keyName, frame);
	this.inputEnabled = true;
	this.input.priorityID = 1;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(option, this);
	
};
button.prototype = Object.create(Phaser.Sprite.prototype);
button.prototype.constructor = button;