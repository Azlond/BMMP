function win() {
}

var jenniferanimation4;
var carlaanimation4;
var hectoranimation4;
var patrickanimation4;

var videoBackground;
var videoOn = false

win.prototype = {

	create : function() {

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

		jenniferanimation4 = game.add.video('jenniferanimation4');
		carlaanimation4 = game.add.video('carlaanimation4');
		hectoranimation4 = game.add.video('hectoranimation4');
		patrickanimation4 = game.add.video('patrickanimation4');

		this.timer5 = game.time.create(false);
		this.timer5.add(15000, this.endIntro, this);
		this.timer5.start();

		videoBackground = game.add.sprite(0, 0, 'startBackground');
		switch (activeAstronaut) {
			case 1 :
				jenniferanimation4.add(videoBackground);
				jenniferanimation4.play();
				videoOn = true;
			break;
			case 2 :
				patrickanimation4.add(videoBackground);
				patrickanimation4.play();
				videoOn = true;
			break;
			case 3 :
				carlaanimation4.add(videoBackground);
				carlaanimation4.play();
				videoOn = true;
			break;
			case 4 :
				hectoranimation4.add(videoBackground);
				hectoranimation4.play();
				videoOn = true;
			break;
		}

	},

	update : function() {

		if (this.spaceKey.isDown && videoOn) {
			this.endIntro();
		}

	},

	endIntro : function() {

		this.timer5.stop();
		videoOn = false;

		console.log("End intro");
	
		this.game.add.image(0, 0, 'win');

		var restartButton = game.add.button(345.5, 570, 'restartButton', restartGame, this, 1, 0);
		background.addChild(startButton);

	}		

}
