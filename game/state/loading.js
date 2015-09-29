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

		game.load.video('intro', './assets/videos/Intro.mp4');
		game.load.video('mission', './assets/videos/Mission.mp4');
		

		/* Menu-state images */

		// background
		game.load.image('startBackground', './assets/menu/startMenu/startBackground.png');
		game.load.image('optionBackground', './assets/menu/startMenu/optionBackground.png');
		game.load.image('soundBackground', './assets/menu/soundMenu/soundBackground.png');
		game.load.image('scoreBackground', './assets/menu/scoreMenu/scoreBackground.png');
		game.load.image('pauseBackground', './assets/menu/pauseMenu/background.png');


		// button
		game.load.spritesheet('startButton', './assets/menu/startMenu/startButtonSprite.png', 100, 35, 2);
		game.load.spritesheet('soundButton', './assets/menu/startMenu/soundButtonSprite.png', 43, 43, 2);
		game.load.spritesheet('scoreButton', './assets/menu/startMenu/highscoreButtonSprite.png', 43, 43, 2);
		game.load.spritesheet('closeButton', './assets/menu/scoreMenu/backButtonSprite.png', 58, 28, 2);
		game.load.spritesheet('resetButton', './assets/menu/scoreMenu/resetButtonSprite.png', 64, 28, 2);
		game.load.spritesheet('controlSound', './assets/menu/soundMenu/soundControlSprite.png', 82, 114, 2);
		game.load.spritesheet('restartButton', './assets/menu/pauseMenu/restartButtonSprite.png', 111, 29, 2);

		game.load.image('continueButton','./assets/menu/pauseMenu/continueButton.png');
		game.load.image('continueHighlight','./assets/menu/pauseMenu/continueButtonHighlight.png');
		game.load.image('quitButton','./assets/menu/pauseMenu/quitButton.png');
		game.load.image('quitHighlight','./assets/menu/pauseMenu/quitButtonHighlight.png');
		game.load.image('restartButton','./assets/menu/pauseMenu/restartButton.png');
		game.load.image('restartHighlight','./assets/menu/pauseMenu/restartButtonHighlight.png');
		game.load.image('off','./assets/menu/pauseMenu/off.png');
		game.load.image('on','./assets/menu/pauseMenu/on.png');

		//characters
		game.load.image ('player1', './assets/menu/startMenu/player1.png');
		game.load.image ('player2', './assets/menu/startMenu/player2.png');
		game.load.image ('player3', './assets/menu/startMenu/player3.png');
		game.load.image ('player4', './assets/menu/startMenu/player4.png');


		// audio
		
		game.load.audio('music', './assets/audio/background_music.wav');
		game.load.audio('loseLife', './assets/audio/loseLifeSound.wav');
		game.load.audio('collectTool', './assets/audio/collectToolSound.wav');
		game.load.audio('collectOxygen', './assets/audio/collectOxygenSound.wav');
		game.load.audio('completeLevel', './assets/audio/completeLevelSound.wav');
		game.load.audio('collideWithAlien', './assets/audio/collideWithAlienSound.wav');
		
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
		game.load.spritesheet('char1', './assets/Astronaut2.png', 32, 64, 24);
		game.load.spritesheet('rocket', './assets/rocket_spritesheet.png', 154, 412, 2);
		game.load.spritesheet('tools', './assets/Tools/alles.png', 59, 38, 6);
		game.load.image('gameOver', './assets/gameOver.jpg');
		game.load.image('win', './assets/win.jpg');
		game.load.spritesheet('alien', './assets/alien.png', 48, 48, 8);
		game.load.spritesheet('tank', './assets/Status/oxygenStatusSprite.png', 43, 82);
		game.load.image('oxygen','./assets/oxygen.png');

	},

	create : function() {
		game.state.start('intro'); // opens the menu
	}

};
