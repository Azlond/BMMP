function gameOver() {
}


gameOver.prototype = {

	create : function() {

		var background = this.game.add.image(0, 0, 'gameOver');
		
		var restartButton = game.add.button(345.5, 500, 'restartButton', restartGame, this, 1, 0);
		background.addChild(startButton);

	},	
};

function restartGame () {
		game.state.start ('menu', true, false);
		introFinished = false;
		if (musicOn == 1) {
			sound.stop();
		} else {
			musicOn = 1;
		}
		
		if (soundIsOn == 0) {
			soundIsOn == 1;
		}
}