/*
 * loading state - preload all images/other assets, so that they're available in-game
 */

function loading() {
}

loading.prototype = {

	preload : function() {

		/*
		 * Loading-state
		 */

		var loadingLabel = game.add.text(80, 150, 'loading...', {
			font : '30px Courier',
			fill : '#ffffff'
		});

		/*
		 * Menu-state images
		 */
		game.load.image('level1background', 'assets/Level1/Level1_Ebene3.png');
		game.load.image('level2background', 'assets/Level2/Level2_Ebene3.png');
		game.load.image('menubackground', 'assets/menubackground.png')
		game.load.image('button', './assets/woodbutton.png');

		/*
		 * Game-state images
		 */
		game.load.tilemap('level1', './assets/fmap.json', null,
				Phaser.Tilemap.TILED_JSON);
		game.load.image('fmap-tiles', './assets/fmap-tiles.png');
		game.load.spritesheet('char', './assets/Astronaut.png',51, 117, 6);
		game.load.spritesheet('coin', './assets/coin.png', 32, 32, 6);


	},

	create : function() {
		game.state.start('menu'); // opens the menu
	}

};
