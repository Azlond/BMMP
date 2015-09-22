/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}

menu.prototype = {

	create : function() {

		game.add.sprite(0, 0, 'background'); // adds background

		/*
		 * Game Title TODO: Maybe change this to an image later on, to match
		 * better with the background.
		 */

		var nameLabel = game.add.text(game.world.centerX - 175, 25,
				'Game Title', {
					font : '75px Arial',
					fill : '#ffffff'
				});

		var button = game.add.button(game.world.centerX - 95, 400, 'button',
				actionOnClick); // button to start the game

	}

};

function actionOnClick() {
	game.state.start('play'); // starts the game
}