function win() {
}

win.prototype = {

	create : function() {

		this.game.add.image(0, 0, 'win');
		
		/*
		 * TODO: make it possible to go back to the menu
		 */
		
	}

};