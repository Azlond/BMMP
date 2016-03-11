function intro() {

}

intro.prototype = {
	create : function() {
		var startBackground = game.add.sprite(0, 0, 'startBackground'); // adds background
		startBackground.inputEnabled = true;
		startBackground.input.priorityID = 1;
		startBackground.input.useHandCursor = true;
		startBackground.events.onInputDown.add(startMenu, this);
	}
}

function startMenu() {

	game.state.start('menu');
}