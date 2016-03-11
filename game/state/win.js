function win() {
}

var videoBackground;
var videoOn = false

win.prototype = {

	create : function() {

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

		this.cutScene = game.add.video(charNames[activeAstronaut] + 'animation4');

		videoBackground = game.add.sprite(0, 0, 'startBackground');
		this.cutScene.add(videoBackground);
		this.cutScene.play();
		this.cutScene.onComplete.add(this.endIntro, this);


	},

	update : function() {

		if (this.spaceKey.isDown && videoOn) {
			this.endIntro();
		}

	},

	endIntro : function() {

		videoOn = false;

		this.cutScene.stop();

		this.game.add.image(0, 0, 'win');

		var restartButton = game.add.button(345.5, 570, 'restartButton', restartGame, this, 1, 0);
		background.addChild(startButton);

	}

}
