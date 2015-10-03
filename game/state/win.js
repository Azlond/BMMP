function win() {
}

var videoBackground;
var videoOn = false

win.prototype = {

	create : function() {

		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

		this.cutScene = game.add.video(charNames[activeAstronaut] + 'animation4');

		this.timer5 = game.time.create(false);
		this.timer5.add(15000, this.endIntro, this);
		this.timer5.start();

		videoBackground = game.add.sprite(0, 0, 'startBackground');
		this.cutScene.add(videoBackground);
		this.cutScene.play();

	},

	update : function() {

		if (this.spaceKey.isDown && videoOn) {
			this.endIntro();
		}

	},

	endIntro : function() {

		this.timer5.stop();
		videoOn = false;
		
		this.cutScene.stop();

		this.game.add.image(0, 0, 'win');

		var restartButton = game.add.button(345.5, 570, 'restartButton', restartGame, this, 1, 0);
		background.addChild(startButton);

	}

}
