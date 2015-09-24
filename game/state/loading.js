/*
 * loading state - preload all images/other assets, so that they're available in-game
 */

function loading() {
}

var cursors

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
		 * Intro
		 */

		game.load.video('intro', './assets/Intro.mp4');

		/*
		 * Menu-state images
		 */

		game.load.image('menubackground', './assets/menubackground.png')
		game.load.image('button', './assets/woodbutton.png');
		game.load.image('buttonStart', './assets/woodbutton_start.png');
		game.load.image ('controlpanel', './assets/controlpanel.png');
		game.load.image ('close', './assets/closebutton.png');
		game.load.spritesheet ('control', './assets/controlSprite.png',64, 94, 2);
		game.load.audio ('music', './assets/sound/background_music.wav');

		/*
		 * backgrounds
		 */
		game.load.image('level1background3', './assets/Level1/Level1_Ebene3.png');
		game.load.image('level1background2', './assets/Level1/Level1_Ebene2.png');
		game.load.image('level1background1', './assets/Level1/Level1_Ebene1.png');

		game.load.image('level2background3', './assets/Level2/Level2_Ebene3.png');
		game.load.image('level2background2', './assets/Level2/Level2_Ebene2.png');
		game.load.image('level2background1', './assets/Level2/Level2_Ebene1.png');

		// game.load.image('level1background3',
		// './assets/Level1/Level1_Ebene3.png');
		// game.load.image('level1background2',
		// './assets/Level1/Level1_Ebene2.png');
		// game.load.image('level1background1',
		// './assets/Level1/Level1_Ebene1.png');

		/*
		 * Game-state
		 */
		game.load.tilemap('level1', './assets/Tilemap/level1_ground_test.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level2', './assets/Tilemap/level2_ground_test.json', null, Phaser.Tilemap.TILED_JSON);

		game.load.spritesheet('char', './assets/Astronaut.png', 31, 71, 6);
		game.load.image('level1_tilemap', './assets/Tilemap/level1_tilemap.png');
		game.load.image('level2_tilemap', './assets/Tilemap/level2_tilemap.png');
		game.load.image('level2_tilemap_ground', './assets/Tilemap/level2_tilemap_ground.png');

		game.load.spritesheet('tools', './assets/Tools/alles.png', 59, 38, 6);

		game.load.image('gameOver', './assets/gameOver.jpg');

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

	},

	create : function() {
		game.state.start('menu'); // opens the menu
	}

};
