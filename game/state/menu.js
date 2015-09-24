/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}
var soundOn = true;
var popup;
var control;
var sound;
var controlX;
var controlY;

menu.prototype = {

	create : function() {

		game.add.sprite(0, 0, 'menubackground'); // adds background

		/*
		 * Game Title TODO: Maybe change this to an image later on, to match
		 * better with the background.
		 */
/*
		var nameLabel = game.add.text(game.world.centerX - 175, 25,
				'Game Title', {
					font : '75px Arial',
					fill : '#ffffff'
				});



*/
		sound = game.add.audio('music');
		sound.play('', 0, 1, true);

		var startButton = game.add.button(game.world.centerX - 225.5, 400, 'buttonStart', actionOnClick); // button to start the game
		var optionButton = game.add.button (game.world.centerX -72.5, 400, 'button', openOption);
		var characterButton = game.add.button (game.world.centerX + 73, 400, 'button', chooseCharacter);
	}

};

function actionOnClick() {
	game.state.start('intro'); // starts the game
}


var controlButton = function (game, x, y, frame) {
	this.game = game;
	Phaser.Sprite.call (this, this.game, x, y, 'control', frame);
	this.inputEnabled = true;
	this.input.priorityID = 1;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(changeSound, this);
};

controlButton.prototype = Object.create(Phaser.Sprite.prototype);
controlButton.prototype.constructor = controlButton;


function openOption () {
	//opens controlpanel as popup to opt sound off/sound on
	popup = game.add.sprite (game.world.centerX, game.world.centerY, 'controlpanel');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);
  popup.inputEnabled = true;

	var cx = (popup.width/2) - 70;
	var cy = (popup.height/2) - 30;

	var closeButton = game.make.sprite (cx, -cy, 'close');
	closeButton.inputEnabled = true;
	closeButton.input.priorityID = 1;
 	closeButton.input.useHandCursor = true;
 	closeButton.events.onInputDown.add(closeWindow, this);

	popup.addChild(closeButton);
	controlX = (popup.width/2)-290;
	controlY = (popup.height/2)-280;

	control = new controlButton (game, controlX, controlY, 1);
	popup.addChild(control);

}


function changeSound () {
	if (soundOn) {
		soundOn = false;
		control.kill();
		control = new controlButton (game, controlX, controlY, 0);
		popup.addChild(control);
		sound.stop();
		console.log (soundOn);
	} else {
		soundOn = true;
		control.kill();
		control = new controlButton (game, controlX, controlY, 1);
		popup.addChild(control);
		sound.play('', 0, 1, true);
		console.log (soundOn);
	}
}

function closeWindow () {
		popup.kill();

}

function chooseCharacter () {

}
