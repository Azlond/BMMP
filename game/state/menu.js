/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

function menu() {
}

menu.prototype = {

	create : function() {

		game.add.sprite(0, 0, 'menubackground'); // adds background

		/*
		 * Game Title TODO: Maybe change this to an image later on, to match
		 * better with the background.
		 */
/*
		var nameLabel = game.add.text(game.world.centerX - 175, 25,
				'Game Title', {
					font : '75px Arial',
					fill : '#ffffff'
				});

*/	var startButton = game.add.button(game.world.centerX - 225.5, 400, 'button', actionOnClick); // button to start the game
		var optionButton = game.add.button (game.world.centerX -72.5, 400, 'button', openOption);
		var characterButton = game.add.button (game.world.centerX + 73, 400, 'button', chooseCharacter);
	}

};

function actionOnClick() {
	game.state.start('intro'); // starts the game
}

function openOption () {
		
}

function chooseCharacter () {

}
