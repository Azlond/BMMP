import { PlayerNames } from './enums'; //eslint-disable-line
/*
 * loading state - preload all images/other assets, so that they're available in-game
 */
export default class Loading extends Phaser.State {
    /**
     * @description Player settings object to pass onto the next state
     * @type {PlayerConfig}
     * @memberof Loading
     */
    playerConfig: PlayerConfig;

    /**
     * @description called as soon as preload has finished
     * @memberof Loading
     */
    create() {
        const media: Media = {
            loseLifeSound: this.add.audio('loseLife'),
            collectElementSound: this.add.audio('collectElement'),
            gameOverSound: this.add.audio('gameOver'),
            collectToolSound: this.add.audio('collectTool'),
            collectOxygenSound: this.add.audio('collectOxygen'),
            completeLevelSound: this.add.audio('completeLevel'),
            collideWithAlienSound: this.add.audio('collideWithAlien'),
            backgroundMusic: this.add.audio('background_music'),
            buttonSound: this.add.audio('buttonSound')
        };

        this.game.state.start(
            'intro',
            false,
            false,
            this.playerConfig,
            media
        );
    }

    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @memberof Loading
     */
    init(playerConfig: PlayerConfig) {
        this.playerConfig = playerConfig;
    }

    /**
     * @description preloads all assets - TODO: check if all asset loading is actually required
     * @memberof Loading
     */
    preload() {
        /* Loading-state */
        // const loadingLabel = this.game.add.text(80, 150, 'loading...', {
        //     font: '30px Raleway',
        //     fill: '#ffffff'
        // });

        /* Videos */

        this.game.load.video('intro', './assets/videos/Intro.mp4');
        this.game.load.video('mission', './assets/videos/Mission.mp4');

        this.game.load.video(
            'jenniferanimation1',
            './assets/videos/jennifer_animation1.mp4'
        );
        this.game.load.video(
            'jenniferanimation2',
            './assets/videos/jennifer_animation2.mp4'
        );
        this.game.load.video(
            'jenniferanimation3',
            './assets/videos/jennifer_animation3.mp4'
        );
        this.game.load.video(
            'jenniferanimation4',
            './assets/videos/jennifer_animation4.mp4'
        );

        this.game.load.video(
            'hectoranimation1',
            './assets/videos/hector_animation1.mp4'
        );
        this.game.load.video(
            'hectoranimation2',
            './assets/videos/hector_animation2.mp4'
        );
        this.game.load.video(
            'hectoranimation3',
            './assets/videos/hector_animation3.mp4'
        );
        this.game.load.video(
            'hectoranimation4',
            './assets/videos/hector_animation4.mp4'
        );

        this.game.load.video(
            'carlaanimation1',
            './assets/videos/carla_animation1.mp4'
        );
        this.game.load.video(
            'carlaanimation2',
            './assets/videos/carla_animation2.mp4'
        );
        this.game.load.video(
            'carlaanimation3',
            './assets/videos/carla_animation3.mp4'
        );
        this.game.load.video(
            'carlaanimation4',
            './assets/videos/carla_animation4.mp4'
        );

        this.game.load.video(
            'patrickanimation1',
            './assets/videos/patrick_animation1.mp4'
        );
        this.game.load.video(
            'patrickanimation2',
            './assets/videos/patrick_animation2.mp4'
        );
        this.game.load.video(
            'patrickanimation3',
            './assets/videos/patrick_animation3.mp4'
        );
        this.game.load.video(
            'patrickanimation4',
            './assets/videos/patrick_animation4.mp4'
        );

        /* Menu-state images */

        this.game.load.image(
            'startBackground',
            './assets/menu/startMenu/startBackground.png'
        );
        this.game.load.image(
            'optionBackground',
            './assets/menu/startMenu/optionBackground.png'
        );
        this.game.load.image(
            'soundBackground',
            './assets/menu/soundMenu/soundBackground.png'
        );
        this.game.load.image(
            'scoreBackground',
            './assets/menu/scoreMenu/scoreBackground.png'
        );
        this.game.load.image(
            'pauseBackground',
            './assets/menu/pauseMenu/background.png'
        );

        /* elements */
        this.game.load.image(
            'elementScore',
            './assets/elements/gesteinKlein.png'
        );

        /* button */
        this.game.load.spritesheet(
            'startButton',
            './assets/menu/startMenu/startButtonSprite.png',
            100,
            35,
            2
        );
        this.game.load.spritesheet(
            'soundButton',
            './assets/menu/startMenu/soundButtonSprite.png',
            43,
            43,
            2
        );
        this.game.load.spritesheet(
            'scoreButton',
            './assets/menu/startMenu/highscoreButtonSprite.png',
            43,
            43,
            2
        );
        this.game.load.spritesheet(
            'closeButton',
            './assets/menu/scoreMenu/backButtonSprite.png',
            58,
            28,
            2
        );
        this.game.load.spritesheet(
            'resetButton',
            './assets/menu/scoreMenu/resetButtonSprite.png',
            64,
            28,
            2
        );
        this.game.load.spritesheet(
            'controlSound',
            './assets/menu/soundMenu/soundControlSprite.png',
            82,
            114,
            2
        );
        this.game.load.spritesheet(
            'restartButton',
            './assets/menu/pauseMenu/restartButtonSprite.png',
            111,
            29,
            2
        );
        this.game.load.spritesheet(
            'continueButton',
            './assets/menu/pauseMenu/continueButtonSprite.png',
            105,
            30,
            2
        );
        this.game.load.spritesheet(
            'quitButton',
            './assets/menu/pauseMenu/quitButtonSprite.png',
            99,
            26,
            2
        );

        /* characters */
        this.game.load.spritesheet(
            PlayerNames.JENNIFER,
            './assets/menu/startMenu/player1Sprite.png',
            153,
            278,
            2
        );
        this.game.load.spritesheet(
            PlayerNames.PATRICK,
            './assets/menu/startMenu/player2Sprite.png',
            153,
            278,
            2
        );
        this.game.load.spritesheet(
            PlayerNames.CARLA,
            './assets/menu/startMenu/player3Sprite.png',
            153,
            278,
            2
        );
        this.game.load.spritesheet(
            PlayerNames.HECTOR,
            './assets/menu/startMenu/player4Sprite.png',
            153,
            278,
            2
        );

        /* audio */
        this.game.load.audio('background_music', './assets/audio/background_music.ogg');
        this.game.load.audio('loseLife', './assets/audio/loseLifeSound.wav');
        this.game.load.audio('collectTool', './assets/audio/collectToolSound.wav');
        this.game.load.audio('collectElement', './assets/audio/collectElementSound.wav');
        this.game.load.audio('gameOver', './assets/audio/gameOverSound.wav');
        this.game.load.audio('collectOxygen', './assets/audio/collectOxygenSound.wav');
        this.game.load.audio('completeLevel', './assets/audio/completeLevelSound.wav');
        this.game.load.audio('collideWithAlien', './assets/audio/collideWithAlienSound.wav');
        this.game.load.audio('buttonSound', './assets/audio/menuSelection.wav');

        /* backgrounds - three layers for each level */
        this.game.load.image(
            'level1background3',
            './assets/Level1/Level1_Ebene3.png'
        );
        this.game.load.image(
            'level1background2',
            './assets/Level1/Level1_Ebene2.png'
        );
        this.game.load.image(
            'level1background1',
            './assets/Level1/Level1_Ebene1.png'
        );

        this.game.load.image(
            'level2background3',
            './assets/Level2/Level2_Ebene3.png'
        );
        this.game.load.image(
            'level2background2',
            './assets/Level2/Level2_Ebene2.png'
        );
        this.game.load.image(
            'level2background1',
            './assets/Level2/Level2_Ebene1.png'
        );

        this.game.load.image(
            'level3background3',
            './assets/Level3/Level3_Ebene3.png'
        );
        this.game.load.image(
            'level3background2',
            './assets/Level3/Level3_Ebene2.png'
        );
        this.game.load.image(
            'level3background1',
            './assets/Level3/Level3_Ebene1.png'
        );

        this.game.load.image(
            'level4background3',
            './assets/Level4/Level4_Ebene3.png'
        );
        this.game.load.image(
            'level4background2',
            './assets/Level4/Level4_Ebene2.png'
        );
        this.game.load.image(
            'level4background1',
            './assets/Level4/Level4_Ebene1.png'
        );

        this.game.load.image('bonusLevelBackground', './assets/darkstars.png');

        /* levels - json file with the collision information, and the accompanying tilemap-images */
        this.game.load.tilemap(
            'level1',
            './assets/Tilemap/level1_tilemap.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.game.load.image(
            'level1_tilemap',
            './assets/Tilemap/level1_tilemap.png'
        );
        this.game.load.image(
            'level1_tilemap_ground',
            './assets/Tilemap/level1_tilemap_ground.png'
        );

        this.game.load.tilemap(
            'level2',
            './assets/Tilemap/level2_tilemap.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.game.load.image(
            'level2_tilemap',
            './assets/Tilemap/level2_tilemap.png'
        );
        this.game.load.image(
            'level2_tilemap_ground',
            './assets/Tilemap/level2_tilemap_ground.png'
        );

        this.game.load.tilemap(
            'level3',
            './assets/Tilemap/level3_tilemap.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.game.load.image(
            'level3_tilemap',
            './assets/Tilemap/level3_tilemap.png'
        );
        this.game.load.image(
            'level3_tilemap_ground',
            './assets/Tilemap/level3_tilemap_ground.png'
        );

        this.game.load.tilemap(
            'level4',
            './assets/Tilemap/level4_tilemap.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.game.load.image(
            'level4_tilemap',
            './assets/Tilemap/level4_tilemap.png'
        );
        this.game.load.image(
            'level4_tilemap_ground',
            './assets/Tilemap/level4_tilemap_ground.png'
        );

        this.game.load.tilemap(
            'bonusLevel',
            './assets/Tilemap/bonus_level.json',
            null,
            Phaser.Tilemap.TILED_JSON
        );
        this.game.load.image(
            'bonusLevel_tilemap',
            './assets/Tilemap/level2_tilemap.png'
        );
        this.game.load.image(
            'bonusLevel_tilemap_finish',
            './assets/Tilemap/bonusLevel_tilemap_finish.png'
        );

        /* other assets */
        this.game.load.spritesheet(
            'char0',
            './assets/astronauts/astronaut_jennifer.png',
            32,
            64,
            24
        );
        this.game.load.spritesheet(
            'rocket0',
            './assets/astronauts/rocket_spritesheet_jennifer.png',
            154,
            412,
            2
        );
        this.game.load.spritesheet(
            'char1',
            './assets/astronauts/astronaut_patrick.png',
            32,
            64,
            24
        );
        this.game.load.spritesheet(
            'rocket1',
            './assets/astronauts/rocket_spritesheet_patrick.png',
            154,
            412,
            2
        );
        this.game.load.spritesheet(
            'char2',
            './assets/astronauts/astronaut_carla.png',
            32,
            64,
            24
        );
        this.game.load.spritesheet(
            'rocket2',
            './assets/astronauts/rocket_spritesheet_carla.png',
            154,
            412,
            2
        );
        this.game.load.spritesheet(
            'char3',
            './assets/astronauts/astronaut_hector.png',
            32,
            64,
            24
        );
        this.game.load.spritesheet(
            'rocket3',
            './assets/astronauts/rocket_spritesheet_hector.png',
            154,
            412,
            2
        );

        this.game.load.image('bonusRocket', './assets/bonus_rocket.png');

        this.game.load.image('toolbar', './assets/toolbar.png');
        this.game.load.spritesheet(
            'lifeCounter',
            './assets/Status/livesSprite.png',
            55,
            40,
            4
        );

        this.game.load.spritesheet(
            'tools',
            './assets/Tools/alles.png',
            37,
            39,
            6
        );
        this.game.load.image('gameOver', './assets/gameOver.jpg');
        this.game.load.image('win', './assets/win.jpg');
        this.game.load.spritesheet('alien', './assets/alien.png', 48, 48, 8);
        this.game.load.spritesheet(
            'tank',
            './assets/Status/oxygenStatusSprite.png',
            43,
            82
        );
        this.game.load.image('oxygen', './assets/oxygen.png');
        this.game.load.image('invisWall', './assets/invisibleWall.png');
    }
}
