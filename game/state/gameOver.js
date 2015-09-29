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
		this.game.state.start ('menu');
}