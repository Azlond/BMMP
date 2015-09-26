function gameOver() {
}

gameOver.prototype = {

	create : function() {

		this.game.add.image(0, 0, 'gameOver');
		
		/*
		 * TODO: make it possible to go back to the menu
		 */
		
	}

};