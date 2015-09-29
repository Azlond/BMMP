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

menu.prototype = {

	create : function() {
		sound = game.add.audio('music');
		sound.play();

		popupOption = game.add.sprite(game.world.centerX, game.world.centerY, 'optionBackground');
		popupOption.alpha = 1.0;
		popupOption.anchor.set(0.5);

<<<<<<< HEAD
		/* characterauswahl*/
		
		player1 = game.add.button (-314, -120, 'player1', highlightButton, this, 0);
		popupOption.addChild(player1);
		
		player2 = game.add.button (-157, -120, 'player2', highlightButton, this, 0);
		popupOption.addChild(player2);
		
		player3 = game.add.button (20, -120, 'player3', highlightButton, this, 0);
		popupOption.addChild(player3);
		
		player4 = game.add.button (177, -120, 'player4', highlightButton, this, 0);
		popupOption.addChild(player4);
		
		/* buttons */
	
		startButton = game.add.button(-36, 193, 'startButton', startGame, this, 1, 0);
		popupOption.addChild(startButton);
	
		soundButton = game.add.button (280, 188, 'soundButton', soundOption, this, 1, 0);
		popupOption.addChild(soundButton);

		scoreButton = game.add.button (-316, 188, 'scoreButton', scoreOption, this, 1, 0);
=======
		startButton = new button(game, -36, 185, 0, startGame, 'startButton');
		popupOption.addChild(startButton);

		soundButton = new button(game, 280, 188, 0, soundOption, 'soundButton');
		popupOption.addChild(soundButton);

		scoreButton = new button(game, -316, 188, 0, scoreOption, 'scoreButton');
>>>>>>> master
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

function soundOption() {

	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'soundBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	soundButton.kill();
	scoreButton.kill();
	startButton.kill();
<<<<<<< HEAD
	player1.kill();
	player2.kill();
	player3.kill();
	player4.kill();
	
	
	musicControl = new button (game, mControlX, mControlY, musicOn, changeMusic, 'controlSound');
=======

	musicControl = new button(game, mControlX, mControlY, musicOn, changeMusic, 'controlSound');
>>>>>>> master
	popup.addChild(musicControl);

	soundControl = new button(game, sControlX, sControlY, 1, changeSound, 'controlSound');
	popup.addChild(soundControl);

<<<<<<< HEAD
	closeButton = game.add.button (-36, 188, 'closeButton', closeWindow, this, 1, 0);
=======
	closeButton = new button(game, -36, 185, 0, closeWindow, 'closeButton');
>>>>>>> master
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
	if (soundOn == 1) {
		soundOn = 0;
		soundControl.kill();
		soundControl = new button(game, sControlX, sControlY, 0, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.pause();
		console.log(soundOn);
	} else {
		soundOn = 1;
		soundControl.kill();
		soundControl = new button(game, sControlX, sControlY, 1, changeSound, 'controlSound');
		popup.addChild(soundControl);
		// sound.resume();
		console.log(soundOn);
	}
}

function scoreOption() {
	popup = game.add.sprite(game.world.centerX, game.world.centerY, 'scoreBackground');
	popup.alpha = 1.0;
	popup.anchor.set(0.5);

	soundButton.kill();
	scoreButton.kill();
	startButton.kill();
	player1.kill();
	player2.kill();
	player3.kill();
	player4.kill();
	

<<<<<<< HEAD
	closeButton = game.add.button (-36, 188, 'closeButton', closeWindow, this, 1, 0);
=======
	closeButton = new button(game, -36, 185, 0, closeWindow, 'closeButton');
>>>>>>> master
	popup.addChild(closeButton);

	var highScoreList = readLocal();

	console.log(highScoreList);

	highScoreList = sortHighScore(highScoreList);

	console.log("sorted" + highScoreList);

}

function closeWindow() {
	popup.kill();
	soundButton = new button(game, 280, 188, 0, soundOption, 'soundButton');
	popupOption.addChild(soundButton);

<<<<<<< HEAD
	
	player1 = game.add.button (-314, -120, 'player1', highlightButton(1), this, 0);
	popupOption.addChild(player1);
	
	player2 = game.add.button (-157, -120, 'player2', highlightButton(2), this, 0);
	popupOption.addChild(player2);
	
	player3 = game.add.button (20, -120, 'player3', highlightButton(3), this, 0);
	popupOption.addChild(player3);
	
	player4 = game.add.button (177, -120, 'player4', highlightButton(4), this, 0);
	popupOption.addChild(player4);
	
	/* buttons */

	startButton = game.add.button(-36, 193, 'startButton', startGame, this, 1, 0);
	popupOption.addChild(startButton);

	soundButton = game.add.button (280, 188, 'soundButton', soundOption, this, 1, 0);
	popupOption.addChild(soundButton);

	scoreButton = game.add.button (-316, 188, 'scoreButton', scoreOption, this, 1, 0);
	popupOption.addChild(scoreButton);
	
=======
	scoreButton = new button(game, -316, 188, 0, scoreOption, 'scoreButton');
	popupOption.addChild(scoreButton);

	startButton = new button(game, -36, 185, 0, startGame, 'startButton');
	popupOption.addChild(startButton);

>>>>>>> master
}

function highlightButton(player){
	/*
	switch (player) {
		case 1: player1.kill(); 
				player1 = game.add.sprite (-314, -120, 'player1');
				player1.frame = 0;
				popupOption.addChild(player1);
				break;
				
		case 2: player2.kill(); 
				player2 = game.add.sprite (-314, -120, 'player2');
				player2.frame = 0;
				popupOption.addChild(player2);
				break;
				
		case 3: player3.kill(); 
				player3 = game.add.sprite (-314, -120, 'player1');
				player3.frame = 0;
				popupOption.addChild(player3);
				break;
		case 4: player4.kill(); 
				player4 = game.add.sprite (-314, -120, 'player1');
				player4.frame = 0;
				popupOption.addChild(player4);
				break;
				
		default: break;
	}
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