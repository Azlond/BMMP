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
		 * Intro
		 */

		game.load.video('intro', './assets/Intro.mp4');

		/* Menu-state images */

		// background
		game.load.image('startBackground', './assets/menu/startMenu/startBackground.png');
		game.load.image('optionBackground', './assets/menu/startMenu/optionBackground.png');
		game.load.image('soundBackground', './assets/menu/soundMenu/soundBackground.png');
		game.load.image('scoreBackground', './assets/menu/scoreMenu/scoreBackground.png');
		

		// button
		game.load.spritesheet('startButton', './assets/menu/startMenu/startButtonSprite.png', 99, 40, 2);
		game.load.image('soundButton', './assets/menu/startMenu/soundButton.png');
		game.load.spritesheet('scoreButton', './assets/menu/startMenu/highscoreButton.png', 43, 47, 2);
		game.load.image('closeButton', './assets/menu/soundMenu/doneButton.png');
		game.load.spritesheet('controlSound', './assets/menu/soundMenu/soundControlSprite.png', 82, 114, 2);

		// music
		game.load.audio('music', './assets/sound/background_music.wav');

		/*
		 * backgrounds - three layers for each level
		 */
		game.load.image('level1background3', './assets/Level1/Level1_Ebene3.png');
		game.load.image('level1background2', './assets/Level1/Level1_Ebene2.png');
		game.load.image('level1background1', './assets/Level1/Level1_Ebene1.png');

		game.load.image('level2background3', './assets/Level2/Level2_Ebene3.png');
		game.load.image('level2background2', './assets/Level2/Level2_Ebene2.png');
		game.load.image('level2background1', './assets/Level2/Level2_Ebene1.png');

		game.load.image('level3background3', './assets/Level3/Level3_Ebene3.png');
		game.load.image('level3background2', './assets/Level3/Level3_Ebene2.png');
		game.load.image('level3background1', './assets/Level3/Level3_Ebene1.png');

		game.load.image('level4background3', './assets/Level4/Level4_Ebene3.png');
		game.load.image('level4background2', './assets/Level4/Level4_Ebene2.png');
		game.load.image('level4background1', './assets/Level4/Level4_Ebene1.png');

		/*
		 * levels - json file with the collision information, and the accompanying tilemaps
		 */
		game.load.tilemap('level1', './assets/Tilemap/level1_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('level1_tilemap', './assets/Tilemap/level1_tilemap.png');
		game.load.image('level1_tilemap_ground', './assets/Tilemap/level1_tilemap_ground.png');

		game.load.tilemap('level2', './assets/Tilemap/level2_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('level2_tilemap', './assets/Tilemap/level2_tilemap.png');
		game.load.image('level2_tilemap_ground', './assets/Tilemap/level2_tilemap_ground.png')

		game.load.tilemap('level3', './assets/Tilemap/level3_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('level3_tilemap', './assets/Tilemap/level3_tilemap.png');
		game.load.image('level3_tilemap_ground', './assets/Tilemap/level3_tilemap_ground.png');

		game.load.tilemap('level4', './assets/Tilemap/level4_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('level4_tilemap', './assets/Tilemap/level4_tilemap.png');
		game.load.image('level4_tilemap_ground', './assets/Tilemap/level4_tilemap_ground.png');

		/*
		 * other assets
		 */
		game.load.image('toolbar', './assets/toolbar.png');
		game.load.spritesheet('lifeCounter', './assets/Status/livesSprite.png', 55, 40, 4);
		game.load.spritesheet('char', './assets/Astronaut.png', 31, 71, 6);
		game.load.spritesheet('rocket', './assets/rocket_spritesheet.png', 154, 412, 2);
		game.load.spritesheet('tools', './assets/Tools/alles.png', 59, 38, 6);
		game.load.image('gameOver', './assets/gameOver.jpg');
		game.load.spritesheet('alien', './assets/alien.png', 48, 48, 8);
		game.load.spritesheet('tank', './assets/Status/oxygenStatusSprite.png', 43, 82);

	},

	create : function() {
		game.state.start('intro'); // opens the menu
	}

};
