function win() {
}

win.prototype = {

	create : function() {

		this.game.add.image(0, 0, 'win');

		var restartButton = game.add.button(345.5, 570, 'restartButton', restartGame, this, 1, 0);
		background.addChild(startButton);

	}

};