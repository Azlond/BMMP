function gameOver() {
}

var restartButton;

gameOver.prototype = {

	create : function() {

		var background = this.game.add.image(0, 0, 'gameOver');
		
		restartButton = game.add.button(345.5, 500, 'restartButton', restartGame, this, 1, 0);
		background.addChild(startButton);
		
		/*
		 * TODO: make it possible to go back to the menu
		 */
		
	},
	
	

};

function restartGame () {
		this.game.state.start ('menu');
}