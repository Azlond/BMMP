/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
//import * as Phaser from 'phaser-ce';
const gameConfig_1 = __webpack_require__(1);
const Loading_1 = __webpack_require__(2);
const Intro_1 = __webpack_require__(3);
const Play_1 = __webpack_require__(4);
const Menu_1 = __webpack_require__(10);
const GameOver_1 = __webpack_require__(11);
const Bonus_1 = __webpack_require__(12);
const Win_1 = __webpack_require__(13);
/*
 * Start state - first js-file to be loaded
 * creates the game and the various states
 */
class Game extends Phaser.Game {
    constructor() {
        super(gameConfig_1.default.width, gameConfig_1.default.height, Phaser.AUTO, 'game');
        const playerConfig = {
            name: '',
            sound: {
                musicOn: true,
                soundOn: true
            }
        };
        this.state.add('loading', Loading_1.default, false);
        this.state.add('intro', Intro_1.default, false);
        this.state.add('menu', Menu_1.default, false);
        this.state.add('play', Play_1.default, false);
        this.state.add('gameOver', GameOver_1.default, false);
        this.state.add('bonus', Bonus_1.default, false);
        this.state.add('win', Win_1.default, false);
        this.state.start('loading', false, false, playerConfig);
    }
}
window.game = new Game();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    width: 800,
    height: 600
};
exports.default = config;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * loading state - preload all images/other assets, so that they're available in-game
 */
class Loading extends Phaser.State {
    /**
     * @description called as soon as preload has finished
     * @memberof Loading
     */
    create() {
        const media = {
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
        this.game.state.start('intro', false, false, this.playerConfig, media);
    }
    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @memberof Loading
     */
    init(playerConfig) {
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
        this.game.load.video('intro', './assets/videos/Intro.mkv');
        this.game.load.video('mission', './assets/videos/Mission.mkv');
        this.game.load.video('jenniferanimation1', './assets/videos/jennifer_animation1.mkv');
        this.game.load.video('jenniferanimation2', './assets/videos/jennifer_animation2.mkv');
        this.game.load.video('jenniferanimation3', './assets/videos/jennifer_animation3.mkv');
        this.game.load.video('jenniferanimation4', './assets/videos/jennifer_animation4.mkv');
        this.game.load.video('hectoranimation1', './assets/videos/hector_animation1.mkv');
        this.game.load.video('hectoranimation2', './assets/videos/hector_animation2.mkv');
        this.game.load.video('hectoranimation3', './assets/videos/hector_animation3.mkv');
        this.game.load.video('hectoranimation4', './assets/videos/hector_animation4.mkv');
        this.game.load.video('carlaanimation1', './assets/videos/carla_animation1.mkv');
        this.game.load.video('carlaanimation2', './assets/videos/carla_animation2.mkv');
        this.game.load.video('carlaanimation3', './assets/videos/carla_animation3.mkv');
        this.game.load.video('carlaanimation4', './assets/videos/carla_animation4.mkv');
        this.game.load.video('patrickanimation1', './assets/videos/patrick_animation1.mkv');
        this.game.load.video('patrickanimation2', './assets/videos/patrick_animation2.mkv');
        this.game.load.video('patrickanimation3', './assets/videos/patrick_animation3.mkv');
        this.game.load.video('patrickanimation4', './assets/videos/patrick_animation4.mkv');
        /* Menu-state images */
        this.game.load.image('startBackground', './assets/menu/startMenu/startBackground.png');
        this.game.load.image('optionBackground', './assets/menu/startMenu/optionBackground.png');
        this.game.load.image('soundBackground', './assets/menu/soundMenu/soundBackground.png');
        this.game.load.image('scoreBackground', './assets/menu/scoreMenu/scoreBackground.png');
        this.game.load.image('pauseBackground', './assets/menu/pauseMenu/background.png');
        /* elements */
        this.game.load.image('elementScore', './assets/elements/gesteinKlein.png');
        /* button */
        this.game.load.spritesheet('startButton', './assets/menu/startMenu/startButtonSprite.png', 100, 35, 2);
        this.game.load.spritesheet('soundButton', './assets/menu/startMenu/soundButtonSprite.png', 43, 43, 2);
        this.game.load.spritesheet('scoreButton', './assets/menu/startMenu/highscoreButtonSprite.png', 43, 43, 2);
        this.game.load.spritesheet('closeButton', './assets/menu/scoreMenu/backButtonSprite.png', 58, 28, 2);
        this.game.load.spritesheet('resetButton', './assets/menu/scoreMenu/resetButtonSprite.png', 64, 28, 2);
        this.game.load.spritesheet('controlSound', './assets/menu/soundMenu/soundControlSprite.png', 82, 114, 2);
        this.game.load.spritesheet('restartButton', './assets/menu/pauseMenu/restartButtonSprite.png', 111, 29, 2);
        this.game.load.spritesheet('continueButton', './assets/menu/pauseMenu/continueButtonSprite.png', 105, 30, 2);
        this.game.load.spritesheet('quitButton', './assets/menu/pauseMenu/quitButtonSprite.png', 99, 26, 2);
        /* characters */
        this.game.load.spritesheet("player1" /* JENNIFER */, './assets/menu/startMenu/player1Sprite.png', 153, 278, 2);
        this.game.load.spritesheet("player2" /* PATRICK */, './assets/menu/startMenu/player2Sprite.png', 153, 278, 2);
        this.game.load.spritesheet("player3" /* CARLA */, './assets/menu/startMenu/player3Sprite.png', 153, 278, 2);
        this.game.load.spritesheet("player4" /* HECTOR */, './assets/menu/startMenu/player4Sprite.png', 153, 278, 2);
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
        this.game.load.image('level1background3', './assets/Level1/Level1_Ebene3.png');
        this.game.load.image('level1background2', './assets/Level1/Level1_Ebene2.png');
        this.game.load.image('level1background1', './assets/Level1/Level1_Ebene1.png');
        this.game.load.image('level2background3', './assets/Level2/Level2_Ebene3.png');
        this.game.load.image('level2background2', './assets/Level2/Level2_Ebene2.png');
        this.game.load.image('level2background1', './assets/Level2/Level2_Ebene1.png');
        this.game.load.image('level3background3', './assets/Level3/Level3_Ebene3.png');
        this.game.load.image('level3background2', './assets/Level3/Level3_Ebene2.png');
        this.game.load.image('level3background1', './assets/Level3/Level3_Ebene1.png');
        this.game.load.image('level4background3', './assets/Level4/Level4_Ebene3.png');
        this.game.load.image('level4background2', './assets/Level4/Level4_Ebene2.png');
        this.game.load.image('level4background1', './assets/Level4/Level4_Ebene1.png');
        this.game.load.image('bonusLevelBackground', './assets/darkstars.png');
        /* levels - json file with the collision information, and the accompanying tilemap-images */
        this.game.load.tilemap('level1', './assets/Tilemap/level1_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('level1_tilemap', './assets/Tilemap/level1_tilemap.png');
        this.game.load.image('level1_tilemap_ground', './assets/Tilemap/level1_tilemap_ground.png');
        this.game.load.tilemap('level2', './assets/Tilemap/level2_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('level2_tilemap', './assets/Tilemap/level2_tilemap.png');
        this.game.load.image('level2_tilemap_ground', './assets/Tilemap/level2_tilemap_ground.png');
        this.game.load.tilemap('level3', './assets/Tilemap/level3_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('level3_tilemap', './assets/Tilemap/level3_tilemap.png');
        this.game.load.image('level3_tilemap_ground', './assets/Tilemap/level3_tilemap_ground.png');
        this.game.load.tilemap('level4', './assets/Tilemap/level4_tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('level4_tilemap', './assets/Tilemap/level4_tilemap.png');
        this.game.load.image('level4_tilemap_ground', './assets/Tilemap/level4_tilemap_ground.png');
        this.game.load.tilemap('bonusLevel', './assets/Tilemap/bonus_level.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('bonusLevel_tilemap', './assets/Tilemap/level2_tilemap.png');
        this.game.load.image('bonusLevel_tilemap_finish', './assets/Tilemap/bonusLevel_tilemap_finish.png');
        /* other assets */
        this.game.load.spritesheet('char0', './assets/astronauts/astronaut_jennifer.png', 32, 64, 24);
        this.game.load.spritesheet('rocket0', './assets/astronauts/rocket_spritesheet_jennifer.png', 154, 412, 2);
        this.game.load.spritesheet('char1', './assets/astronauts/astronaut_patrick.png', 32, 64, 24);
        this.game.load.spritesheet('rocket1', './assets/astronauts/rocket_spritesheet_patrick.png', 154, 412, 2);
        this.game.load.spritesheet('char2', './assets/astronauts/astronaut_carla.png', 32, 64, 24);
        this.game.load.spritesheet('rocket2', './assets/astronauts/rocket_spritesheet_carla.png', 154, 412, 2);
        this.game.load.spritesheet('char3', './assets/astronauts/astronaut_hector.png', 32, 64, 24);
        this.game.load.spritesheet('rocket3', './assets/astronauts/rocket_spritesheet_hector.png', 154, 412, 2);
        this.game.load.image('bonusRocket', './assets/bonus_rocket.png');
        this.game.load.image('toolbar', './assets/toolbar.png');
        this.game.load.spritesheet('lifeCounter', './assets/Status/livesSprite.png', 55, 40, 4);
        this.game.load.spritesheet('tools', './assets/Tools/alles.png', 37, 39, 6);
        this.game.load.image('gameOver', './assets/gameOver.jpg');
        this.game.load.image('win', './assets/win.jpg');
        this.game.load.spritesheet('alien', './assets/alien.png', 48, 48, 8);
        this.game.load.spritesheet('tank', './assets/Status/oxygenStatusSprite.png', 43, 82);
        this.game.load.image('oxygen', './assets/oxygen.png');
        this.game.load.image('invisWall', './assets/invisibleWall.png');
    }
}
exports.default = Loading;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Intro extends Phaser.State {
    create() {
        const startBackground = this.game.add.sprite(0, 0, 'startBackground'); // adds background
        startBackground.inputEnabled = true;
        startBackground.input.priorityID = 1;
        startBackground.input.useHandCursor = true;
        startBackground.events.onInputDown.addOnce(() => {
            startBackground.destroy();
            this.startMenu();
        }); //display background until click
    }
    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @param {Media} media
     * @memberof Loading
     */
    init(playerConfig, media) {
        this.playerConfig = playerConfig;
        this.media = media;
    }
    /**
     * @description Start the menu screen as soon as the click event has been fired
     * @memberof Intro
     */
    startMenu() {
        this.game.state.start('menu', false, false, this.playerConfig, this.media);
    }
}
exports.default = Intro;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __webpack_require__(5); // eslint-disable-line
const tools_1 = __webpack_require__(6);
const astronaut_1 = __webpack_require__(7);
const alien_1 = __webpack_require__(8);
const oxygen_1 = __webpack_require__(9);
/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */
class Play extends Phaser.State {
    /* change the sprite for the oxygen counter */
    changeDisplay() {
        if (this.oxygenCounter > 3) {
            this.oxygenTank.frame = this.oxygenCounter;
            this.oxygenCounter -= 1;
        }
        else if (this.oxygenCounter < 4 && this.oxygenCounter > 0) {
            this.oxygenTank.animations.add('blink1', [this.oxygenCounter, 0], 5, true);
            this.oxygenTank.animations.play('blink1');
            this.oxygenCounter -= 1;
        }
        else if (this.oxygenCounter === 0) {
            this.oxygenTank.animations.stop();
            this.oxygenTank.frame = 0;
            this.lifeCounter -= 1;
            if (this.soundIsOn) {
                this.media.loseLifeSound.play();
            }
            this.checkLifeCounter();
            this.timer.stop();
            this.loadLevel('restart');
        }
        else {
            this.timer.stop();
        }
    }
    /* edit the music settings */
    changeMusicOnPauseMenu() {
        if (this.soundIsOn) {
            this.media.buttonSound.play('', 0, 0.2);
        }
        this.musicOn = !this.musicOn;
        // this.musicControl.getButton().kill();
        this.musicControl.getButton().setFrames(this.musicOn ? 1 : 0);
        // this.musicControl = new Button(this.game, 75, -165, this.musicOn ? 1 : 0, () => this.changeMusicOnPauseMenu(), 'controlSound');
        // this.pauseMenu.addChild(this.musicControl.getButton());
        this.media.backgroundMusic.resume();
    }
    /* edit the sound settings */
    changeSoundOnPauseMenu() {
        if (this.soundIsOn) {
            this.media.buttonSound.play('', 0, 0.2);
        }
        this.soundIsOn = !this.soundIsOn;
        // this.soundControl.getButton().kill();
        this.soundControl.getButton().setFrames(this.soundIsOn ? 1 : 0);
        // this.soundControl = new Button(this.game, -20, -70, this.soundIsOn ? 1 : 0, () => this.changeSoundOnPauseMenu(), 'controlSound');
        // this.pauseMenu.addChild(this.soundControl.getButton());
    }
    /* check if the player is dead */
    checkLifeCounter() {
        if (this.lifeCounter === 0) {
            if (this.soundIsOn) {
                this.media.gameOverSound.play();
            }
            this.game.state.start('gameOver', true, false, this.playerConfig, this.media);
        }
    }
    /* collecting an element and removing it from thethis.game */
    collectElement(astronaut, tile) {
        const str = astronaut.key.toString();
        /* check to see if it is actually the astronaut collecting the element and not an alien */
        if (str.indexOf('char') !== -1) {
            this.map.removeTile(tile.x, tile.y, this.layer);
            if (this.soundIsOn) {
                this.media.collectElementSound.play();
            }
            this.score += 5;
            this.scoreText.text = String(this.score);
            /* count up total collecting element for each level - if all elements are collected, the astronaut may get a bonus life */
            this.astronaut.collected++;
            return false;
        }
        return true; //TODO: why return?
    }
    /*
     * collect Oxygen bottles, refill the oxygen tank
     */
    collectOxygen(astronaut, oxygenBottle) {
        oxygenBottle.kill();
        this.timer.stop();
        if (this.soundIsOn) {
            this.media.collectOxygenSound.play();
        }
        this.oxygenCounter = 9;
        this.oxygenTank.kill();
        this.oxygenTank = this.game.add.sprite(750, 510, 'tank');
        this.oxygenTank.frame = this.oxygenCounter;
        this.oxygenTank.fixedToCamera = true;
        this.oxygenCounter -= 1;
        this.timeDown();
    }
    /*
     * called when the player overlaps with the tools
     */
    collectTools(astronaut, tools) {
        if (tools === this.collectpliers) {
            this.nopliers.kill();
            if (this.soundIsOn) {
                this.media.collectToolSound.play();
            }
            this.pliers = new tools_1.Tools(this.game, 690, 10, 1);
            this.game.add.existing(this.pliers);
            this.pliers.fixedToCamera = true;
        }
        if (tools === this.collectscrewdriver) {
            this.noscrewdriver.kill();
            if (this.soundIsOn) {
                this.media.collectToolSound.play();
            }
            this.screwdriver = new tools_1.Tools(this.game, 755, 10, 3);
            this.game.add.existing(this.screwdriver);
            this.screwdriver.fixedToCamera = true;
        }
        if (tools === this.collectwrench) {
            this.nowrench.kill();
            if (this.soundIsOn) {
                this.media.collectToolSound.play();
            }
            this.wrench = new tools_1.Tools(this.game, 720, 10, 5);
            this.game.add.existing(this.wrench);
            this.wrench.fixedToCamera = true;
        }
        tools.kill();
        this.toolsCollected += 1;
    }
    /*
     * called when player collides with an alien
     *
     * lifeTimer is needed to make the player survive the contact after a life has already been lost
     */
    collideWithAlien(astronaut, alien) {
        if (this.game.time.now > this.lifeTimer) {
            this.lifeCounter -= 1;
            if (this.soundIsOn) {
                this.media.collideWithAlienSound.play();
            }
            this.showLife(this.lifeCounter);
            this.lifeTimer = this.game.time.now + 1000;
            this.checkLifeCounter();
        }
    }
    /* continue thethis.game - used in the pause menu */
    continueGame() {
        this.isPaused = false;
        this.astronaut.body.allowGravity = true;
        this.timer.resume();
        for (let i = 0; i < this.alienGroup.children.length; i++) {
            const enemy = this.alienGroup.children[i];
            if (enemy.scale.x === 1) {
                //@ts-ignore
                enemy.body.velocity.x = 50;
            }
            else {
                //@ts-ignore
                enemy.body.velocity.x = -50;
            }
        }
        if (this.rocket.body.y !== 69) {
            this.rocket.body.velocity.y = -150;
            this.timer2.resume();
        }
        this.pauseMenu.kill();
        this.pauseMenuActive = true;
    }
    create() {
        /* Physics for the platforms */
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        /* reduces jump height */
        this.game.physics.arcade.gravity.y = 300;
        /* score at the beginning of thethis.game */
        this.score = 0;
        this.lifeCounter = 3;
        /* first level */
        this.levelNumber = 1;
        /* last level */
        this.finalLevel = 4;
        /* Keyboard controls */
        this.cursors = this.game.input.keyboard.createCursorKeys();
        /* loads the first level level number, has to be increased once the player has reached the finish line */
        this.loadLevel('');
        /* Space key for pause menu and skipping videos */
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    }
    /* show the pause menu */
    createPauseMenu() {
        this.isPaused = true;
        this.pauseMenuActive = false;
        this.pauseMenu = this.game.add.sprite(400, 300, 'pauseBackground');
        this.pauseMenu.alpha = 1.0;
        this.pauseMenu.anchor.set(0.5);
        this.pauseMenu.fixedToCamera = true;
        this.musicControl = new Button_1.Button(this.game, 75, -165, this.musicOn ? 1 : 0, () => this.changeMusicOnPauseMenu(), 'controlSound');
        this.pauseMenu.addChild(this.musicControl.getButton());
        this.soundControl = new Button_1.Button(this.game, -20, -70, this.soundIsOn ? 1 : 0, () => this.changeSoundOnPauseMenu(), 'controlSound');
        this.pauseMenu.addChild(this.soundControl.getButton());
        this.restartButton = this.game.add.button(-300, 180, 'restartButton', () => {
            this.restart();
        }, this, 1, 0);
        this.pauseMenu.addChild(this.restartButton);
        this.continueButton = this.game.add.button(-50, 180, 'continueButton', () => {
            this.continueGame();
        }, this, 1, 0);
        this.pauseMenu.addChild(this.continueButton);
        this.quitButton = this.game.add.button(210, 185, 'quitButton', this.quitGame, this, 1, 0);
        this.pauseMenu.addChild(this.quitButton);
    }
    /* go to next level */
    endLevel() {
        this.cutScene.stop();
        this.levelNumber += 1;
        this.loadLevel('');
    }
    /*
     * called when the player collides with the rocket
     *
     * checks if all tools have been collected
     *
     * awards 25 points for finishing the level
     *
     * awards an extra life if the player has less then 3 and has collected all elements
     *
     */
    hitFinish(astronaut, finish) {
        if (this.toolsCollected === 3) {
            this.astronaut.kill();
            this.timer.stop();
            if (this.soundIsOn) {
                this.media.completeLevelSound.play();
            }
            this.rocket.body.immovable = false;
            this.rocket.body.velocity.y = -150;
            this.rocket.animations.play('full');
            this.score += 25;
            this.scoreText.text = String(this.score);
            if (this.astronaut.collected === astronaut_1.amountElements[`level${this.levelNumber}`] && this.lifeCounter < 3) {
                this.lifeCounter += 1;
                this.showLife(this.lifeCounter);
            }
            this.timer2 = this.game.time.create(false);
            this.timer2.add(3500, this.playVideo, this);
            this.timer2.start();
        }
    }
    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @param {Media} media
     * @memberof Loading
     */
    init(playerConfig, media, activeAstronaut) {
        this.playerConfig = playerConfig;
        this.media = media;
        this.activeAstronaut = activeAstronaut;
    }
    /* function to load each level */
    loadLevel(string) {
        /* reset values */
        /* if a map exists, so do all other objects - we need to destroy them. */
        if (this.map != null) {
            this.map.destroy();
            this.astronaut.destroy();
            this.layer.destroy();
            this.rocket.destroy();
            this.nopliers.destroy();
            this.nowrench.destroy();
            this.noscrewdriver.destroy();
            this.alienGroup.destroy();
            this.toolGroup.destroy();
            this.oxygenGroup.destroy();
            this.timer.stop();
        }
        if (this.videoOn) {
            this.videoOn = false;
        }
        this.timer4 = this.game.time.create(false);
        this.timer4.add(300, this.startPauseMenu, this);
        this.timer4.start();
        if (this.musicOn) {
            this.media.backgroundMusic.play();
            this.media.backgroundMusic.loopFull();
        }
        this.toolsCollected = 0;
        this.lifeTimer = 0;
        this.fallen = false;
        this.rocketGone = false;
        /* if a new level is loaded (string !=restart), the current score is the new oldScore, else we keep the oldScore */
        if (string !== 'restart') {
            this.oldScore = this.score;
        }
        /* loading the backgrounds */
        this.background3 = this.game.add.image(0, 0, `level${this.levelNumber}background3`);
        this.background2 = this.game.add.image(0, 0, `level${this.levelNumber}background2`);
        this.background1 = this.game.add.image(-15, 0, `level${this.levelNumber}background1`);
        /*
         * adds the tile map to thethis.game
         *
         * !Tilemap JSON files need to be created with the CSV preset and not base64 compressed, or this won't work!
         */
        this.map = this.game.add.tilemap(`level${this.levelNumber}`);
        /* the second parameter needs to be the same as the one used in loading.js */
        this.map.addTilesetImage(`level${this.levelNumber}_tilemap`, `level${this.levelNumber}_tilemap`);
        this.map.addTilesetImage(`level${this.levelNumber}_tilemap_ground`, `level${this.levelNumber}_tilemap_ground`);
        /* collision for the platforms */
        this.map.setCollisionBetween(1, 39);
        /* player may only collide with platform top, so that it is possible to jump on one from beneath it. */
        this.map.forEach((t) => {
            if (t) {
                t.collideDown = false; //eslint-disable-line
                t.collideLeft = false; //eslint-disable-line
                t.collideRight = false; //eslint-disable-line
            }
        }, this.game, 0, 0, this.map.width, this.map.height, this.layer);
        /* collision with the ground */
        this.map.setCollision(41);
        /* element collision, with callBackFunction for the score */
        this.map.setTileIndexCallback(40, this.collectElement, this);
        /* the parameter can be found in the JSON Tiled-file */
        this.layer = this.map.createLayer('Kachelebene 1');
        /* This resizes thethis.game world to match the layer dimensions */
        this.layer.resizeWorld();
        /* add tool-placeholder icons for toolbar */
        this.nopliers = new tools_1.Tools(this.game, 690, 10, 0);
        this.game.add.existing(this.nopliers);
        this.nopliers.fixedToCamera = true;
        this.nowrench = new tools_1.Tools(this.game, 720, 10, 4);
        this.game.add.existing(this.nowrench);
        this.nowrench.fixedToCamera = true;
        this.noscrewdriver = new tools_1.Tools(this.game, 755, 10, 2);
        this.game.add.existing(this.noscrewdriver);
        this.noscrewdriver.fixedToCamera = true;
        /* add tools to the levels */
        this.toolGroup = this.game.add.group();
        this.collectpliers = new tools_1.Tools(this.game, tools_1.toolLocations[`level${this.levelNumber}PliersX`], tools_1.toolLocations[`level${this.levelNumber}PliersY`], 1);
        this.game.add.existing(this.collectpliers);
        this.collectpliers.body.allowGravity = false;
        this.toolGroup.add(this.collectpliers);
        this.collectwrench = new tools_1.Tools(this.game, tools_1.toolLocations[`level${this.levelNumber}WrenchX`], tools_1.toolLocations[`level${this.levelNumber}WrenchY`], 5);
        this.game.add.existing(this.collectwrench);
        this.collectwrench.body.allowGravity = false;
        this.toolGroup.add(this.collectwrench);
        this.collectscrewdriver = new tools_1.Tools(this.game, tools_1.toolLocations[`level${this.levelNumber}ScrewX`], tools_1.toolLocations[`level${this.levelNumber}ScrewY`], 3);
        this.game.add.existing(this.collectscrewdriver);
        this.collectscrewdriver.body.allowGravity = false;
        this.toolGroup.add(this.collectscrewdriver);
        /*
         * adds the rocket
         *
         * if-clause needed because level 1 is only half as long as the other levels
         *
         * rocket needs to be immovable until player is inside so that it can't be kicked around
         *
         * no gravity to make departure cleaner
         */
        this.rocket = this.game.add.sprite(this.levelNumber === 1 ? 2246 : 4646, 69, `rocket${this.activeAstronaut}`);
        this.game.physics.arcade.enableBody(this.rocket);
        this.rocket.body.allowGravity = false;
        this.rocket.body.immovable = true;
        this.rocket.animations.add('empty', [0], 1, true);
        this.rocket.animations.add('full', [1], 1, true);
        this.rocket.animations.play('empty');
        /* adds the character */
        this.astronaut = new astronaut_1.Astronaut(this.game, 100, 440, `char${this.activeAstronaut}`);
        this.game.add.existing(this.astronaut);
        this.astronaut.animations.add('walk', [1, 2, 3, 4, 5], 26, true);
        this.astronaut.animations.add('jump', [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 26, true);
        this.astronaut.animations.add('stop', [0], 26, true);
        this.astronaut.anchor.setTo(0.5, 0.5);
        this.game.camera.follow(this.astronaut);
        /* update the score */
        this.score = this.oldScore;
        /* add Score to toolbar */
        this.scoreElement = this.game.add.image(9, 10, 'elementScore');
        this.scoreElement.fixedToCamera = true;
        this.scoreText = this.game.add.text(45, -45, String(this.score), {
            font: '30px Raleway',
            fill: '#ffffff'
        });
        //@ts-ignore
        window.scoreText = this.scoreText;
        this.scoreText.fixedToCamera = true;
        /* adding the invisible Wall to make sure the character can't walk out of the screen on the left side */
        this.wall = this.game.add.sprite(-10, 0, 'invisWall');
        this.game.physics.arcade.enableBody(this.wall);
        this.wall.body.allowGravity = false;
        this.wall.body.immovable = true;
        /* add aliens */
        this.alienGroup = this.game.add.group();
        const alienInfo = alien_1.aliens[`level${this.levelNumber}`];
        const amountAliens = alienInfo.amount;
        const alienCoordinates = alienInfo.coordinates;
        for (let i = 1; i <= amountAliens; i++) {
            this.alien = new alien_1.Alien(this.game, alienCoordinates[`alien${i}`][0], alienCoordinates[`alien${i}`][1], alienCoordinates[`alien${i}`][2]);
            this.game.add.existing(this.alien);
            this.alien.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
            this.alien.animations.add('stop', [0], 7, true);
            this.alien.anchor.setTo(0.5, 0.5);
            this.alien.animations.play('walk');
            this.alienGroup.add(this.alien);
        }
        /* add oxygen bottles */
        this.oxygenGroup = this.game.add.group();
        const oxygenInfo = oxygen_1.oxygens[`level${this.levelNumber}`];
        const amountOxygen = oxygenInfo.amount;
        const oxygenCoordinates = oxygenInfo.coordinates;
        for (let i = 1; i <= amountOxygen; i++) {
            this.oxygenBottle = new oxygen_1.Oxygen(this.game, oxygenCoordinates[`oxygen${i}`][0], oxygenCoordinates[`oxygen${i}`][1]);
            this.game.add.existing(this.oxygenBottle);
            this.oxygenGroup.add(this.oxygenBottle);
        }
        /* shows oxygen-counter in each level */
        this.oxygenCounter = 9;
        this.oxygenTank = this.game.add.sprite(750, 510, 'tank');
        this.oxygenTank.frame = this.oxygenCounter;
        this.oxygenTank.fixedToCamera = true;
        this.oxygenCounter -= 1;
        this.timeDown();
        /* shows life counter in each level */
        const bar = this.game.add.sprite(0, 0, 'toolbar');
        bar.fixedToCamera = true;
        this.showLife(this.lifeCounter);
    }
    /* play the cutScene between levels */
    playVideo() {
        this.timer2.stop();
        this.media.backgroundMusic.stop();
        this.videoOn = true;
        /* kill pause if active */
        this.pauseMenuActive = false;
        this.isPaused = false;
        if (this.pauseMenu != null) {
            this.pauseMenu.kill();
        }
        if (this.levelNumber < this.finalLevel) {
            this.videoBackground = this.game.add.sprite(this.levelNumber === 1 ? 1600 : 4000, 8, 'startBackground');
            this.cutScene = this.game.add.video(`${astronaut_1.charNames[this.activeAstronaut]}animation${this.levelNumber}`, `./assets/videos/${astronaut_1.charNames[this.activeAstronaut]}animation${this.levelNumber}.mkv`);
            if (!this.soundIsOn) {
                this.cutScene.mute = true;
            }
            else {
                this.cutScene.mute = false;
            }
            this.cutScene.add(this.videoBackground);
            this.cutScene.play();
            this.cutScene.onComplete.add(() => {
                this.endLevel();
            }, this);
            this.videoBackground.bringToTop();
        }
        else {
            /* award points for remaining lives */
            this.score += 50 * this.lifeCounter;
            this.game.state.start('bonus', false, false, this.playerConfig, this.media, this.score);
        }
    }
    /* stop Astronaut and alien movement */
    pauseGame() {
        this.astronaut.body.velocity.x = 0;
        this.astronaut.body.velocity.y = 0;
        if (this.rocket.body.velocity.y !== 0) {
            this.rocket.body.velocity.y = 0;
            this.timer2.pause();
        }
        this.astronaut.body.allowGravity = false;
        this.astronaut.animations.play('stop', 6, true);
        for (let i = 0; i < this.alienGroup.children.length; i++) {
            const enemy = this.alienGroup.children[i];
            //@ts-ignore
            enemy.body.velocity.x = 0;
            if (this.isPaused === true) {
                //@ts-ignore
                enemy.animations.play('stop');
            }
        }
    }
    /* quits thethis.game - used in the pause menu */
    quitGame() {
        this.isPaused = false;
        this.game.state.start('intro');
        this.pauseMenuActive = true;
    }
    /* restart the level - used in the pause menu */
    restart() {
        this.isPaused = false;
        this.lifeCounter = 3;
        this.loadLevel('restart');
        this.pauseMenuActive = true;
    }
    showLife(lifeCounter) {
        if (lifeCounter !== 3) {
            this.life.kill();
        }
        this.life = this.game.add.sprite(375.5, 6, 'lifeCounter');
        this.life.fixedToCamera = true;
        switch (lifeCounter) {
            case 3:
                this.life.frame = 0;
                break;
            case 2:
                this.life.frame = 1;
                break;
            case 1:
                this.life.frame = 2;
                break;
            case 0:
                this.life.frame = 3;
                break;
            default:
                this.life.kill();
                break;
        }
    }
    /* pause thethis.game */
    startPauseMenu() {
        this.pauseMenuActive = true;
        this.timer4.stop();
    }
    /*
     * Countdown for the oxygen-timer
     *
     * Different value for the tutorial, to make reading the instructions easier
     */
    timeDown() {
        const countdown = this.levelNumber === 1 ? 5000 : 3000;
        this.timer = this.game.time.create(false);
        this.timer.loop(countdown, this.changeDisplay, this);
        this.timer.start();
    }
    update() {
        /* collision between astronaut/alien/rocket and the platform/ground layer */
        this.game.physics.arcade.collide(this.astronaut, this.layer);
        this.game.physics.arcade.collide(this.astronaut, this.wall);
        this.game.physics.arcade.collide(this.alienGroup, this.layer);
        this.game.physics.arcade.collide(this.rocket, this.layer);
        /* collision between astronaut and rocket/alien */
        this.game.physics.arcade.collide(this.astronaut, this.rocket, this.hitFinish, null, this);
        this.game.physics.arcade.overlap(this.astronaut, this.alienGroup, this.collideWithAlien, null, this);
        /* collision between astronaut and tools */
        // this.game.physics.arcade.overlap(this.astronaut, this.collectscrewdriver, this.collectTools, null, this);
        // this.game.physics.arcade.overlap(this.astronaut, this.collectwrench, this.collectTools, null, this);
        // this.game.physics.arcade.overlap(this.astronaut, this.collectpliers, this.collectTools, null, this);
        this.game.physics.arcade.overlap(this.astronaut, this.toolGroup, this.collectTools, null, this);
        /* collision between astronaut and oxygen */
        this.game.physics.arcade.overlap(this.astronaut, this.oxygenGroup, this.collectOxygen, null, this);
        /* interaction that must not happen if thethis.game is paused */
        if (!this.isPaused) {
            /*
             * Moving the player
             *
             * based on http://phaser.io/examples/v2/arcade-physics/platformer-tight
             *
             * the second condition is needed to make the backgrounds stop moving once the player is inside the rocket
             */
            /* Astronaut going left, backgrounds moving right */
            //@ts-ignore
            if (this.cursors.left.isDown && this.rocket.body.y === 69) {
                this.astronaut.body.velocity.x = -175;
                if (this.astronaut.body.onFloor()) {
                    this.astronaut.animations.play('walk', 6, true);
                }
                this.astronaut.scale.x = -1;
                if (this.astronaut.body.x > 50) {
                    this.background2.x += 0.25;
                    this.background1.x += 0.3;
                }
                /* Astronaut going right, backgrounds moving left */
                //@ts-ignore
            }
            else if (this.cursors.right.isDown && this.rocket.body.y === 69) {
                this.astronaut.body.velocity.x = 175;
                this.astronaut.scale.x = 1;
                if (this.astronaut.body.onFloor()) {
                    this.astronaut.animations.play('walk', 6, true);
                }
                /* second parameter needed because level 1 is shorter than the other levels */
                if ((this.astronaut.body.x < 2200 && this.levelNumber === 1) || (this.astronaut.body.x < 4600 && this.levelNumber !== 1)) {
                    this.background2.x -= 0.25;
                    this.background1.x -= 0.3;
                }
                /* Astronaut is not moving on x-Axis - play stop sprite only when Astronaut is on the ground, so that is no interference with the jump animation */
            }
            else {
                this.astronaut.body.velocity.x = 0;
                if (this.astronaut.body.onFloor()) {
                    this.astronaut.animations.play('stop', 6, true);
                }
            }
            /* Jumping */
            //@ts-ignore
            if (this.cursors.up.isDown) {
                this.astronaut.animations.play('jump', 12, true);
                if (this.astronaut.body.onFloor()) {
                    this.astronaut.body.velocity.y = -700;
                }
            }
            /*
             * alien movement and interaction
             */
            for (let i = 0; i < this.alienGroup.children.length; i++) {
                const enemy = this.alienGroup.children[i];
                //@ts-ignore
                enemy.animations.play('walk');
                /* increase path counter */
                //@ts-ignore
                if (enemy.pathCounter >= 0) {
                    //@ts-ignore
                    enemy.pathCounter++;
                }
                /* enemy is at its turning point, pathCounter has reached the distance */
                //@ts-ignore
                if (enemy.pathCounter >= enemy.distance) {
                    //@ts-ignore
                    enemy.pathCounter = 0;
                    enemy.scale.x = -enemy.scale.x;
                    //@ts-ignore
                    enemy.body.velocity.x = -enemy.body.velocity.x;
                }
                /*
                 * simple AI, always moving towards the Astronaut if s/he is within walking distance
                 *
                 * timers needed to give the Astronaut the chance to jump over alien. Without the timers, the alien would change direction instantly
                 */
                /* enemy facing right,the Astronaut is within walking distance of the alien and the alien is facing the wrong direction */
                //@ts-ignore
                if (enemy.scale.x === 1 && (this.astronaut.body.x > enemy.body.x - enemy.pathCounter && this.astronaut.body.x < enemy.body.x + (enemy.distance - enemy.pathCounter)) && this.astronaut.body.x < enemy.body.x) {
                    //@ts-ignore
                    if (!enemy.timerLSet) {
                        //@ts-ignore
                        enemy.turnLTimer = this.game.time.now + 100;
                        //@ts-ignore
                        enemy.timerLSet = true;
                    }
                    //@ts-ignore
                    if (this.game.time.now > enemy.turnLTimer) {
                        enemy.scale.x = -enemy.scale.x;
                        //@ts-ignore
                        enemy.pathCounter = enemy.distance - enemy.pathCounter;
                        //@ts-ignore
                        enemy.body.velocity.x = -enemy.body.velocity.x;
                        //@ts-ignore
                        enemy.timerLSet = false;
                    }
                    /* enemy facing left,the Astronaut is within walking distance of the alien and the alien is facing the wrong direction */
                    //@ts-ignore
                }
                else if (enemy.scale.x !== 1 && (this.astronaut.body.x > enemy.body.x - (enemy.distance - enemy.pathCounter) && this.astronaut.body.x < enemy.body.x + enemy.pathCounter) && this.astronaut.body.x > enemy.body.x) {
                    //@ts-ignore
                    if (!enemy.timerRSet) {
                        //@ts-ignore
                        enemy.turnRTimer = this.game.time.now + 100;
                        //@ts-ignore
                        enemy.timerRSet = true;
                    }
                    //@ts-ignore
                    if (this.game.time.now > enemy.turnRTimer) {
                        enemy.scale.x = -enemy.scale.x;
                        //@ts-ignore
                        enemy.pathCounter = enemy.distance - enemy.pathCounter;
                        //@ts-ignore
                        enemy.body.velocity.x = -enemy.body.velocity.x;
                        //@ts-ignore
                        enemy.timerRSet = false;
                    }
                }
            }
        }
        /*
         * check if the player has fallen into a rift
         *
         * if the player has more than 0 lives left, restart the level
         */
        if (this.astronaut.body.y > 600 && !this.fallen) {
            this.lifeCounter -= 1;
            if (this.soundIsOn) {
                this.media.loseLifeSound.play();
            }
            this.showLife(this.lifeCounter);
            this.fallen = true;
            this.checkLifeCounter();
            if (this.lifeCounter !== 0) {
                this.loadLevel('restart');
            }
        }
        /* Space pressed - either open the pause menu, or skip the cutScene */
        if (this.spaceKey.isDown) {
            if (this.pauseMenuActive) {
                this.isPaused = true;
                this.timer.pause();
                this.pauseGame();
                this.createPauseMenu();
            }
            else if (this.videoOn) {
                this.endLevel();
            }
        }
    }
}
exports.default = Play;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Button {
    constructor(game, x, y, frame, cb, keyName) {
        this.button = game.add.button(x, y, keyName, cb, frame);
        this.button.inputEnabled = true;
        this.button.input.priorityID = 1;
        this.button.input.useHandCursor = true;
        // button.events.onInputDown.add(cb, this);
    }
    getButton() {
        return this.button;
    }
}
exports.Button = Button;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Tools extends Phaser.Sprite {
    constructor(game, x, y, frame) {
        super(game, x, y, 'tools', frame);
        game.physics.arcade.enableBody(this);
    }
}
exports.Tools = Tools;
exports.toolLocations = {
    level1PliersX: 170,
    level1PliersY: 140,
    level1ScrewX: 1600,
    level1ScrewY: 153,
    level1WrenchX: 1108,
    level1WrenchY: 440,
    level2PliersX: 1400,
    level2PliersY: 120,
    level2ScrewX: 1940,
    level2ScrewY: 120,
    level2WrenchX: 3030,
    level2WrenchY: 120,
    level3PliersX: 1402,
    level3PliersY: 92,
    level3ScrewX: 3825,
    level3ScrewY: 185,
    level3WrenchX: 2850,
    level3WrenchY: 380,
    level4PliersX: 1379,
    level4PliersY: 55,
    level4ScrewX: 4148,
    level4ScrewY: 25,
    level4WrenchX: 3149,
    level4WrenchY: 125
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Astronaut extends Phaser.Sprite {
    constructor(game, x, y, activeAstronaut) {
        super(game, x, y, activeAstronaut);
        game.physics.arcade.enableBody(this);
        this.body.gravity.y = 1000;
        this.body.maxVelocity.y = 500;
        this.collected = 0;
    }
}
exports.Astronaut = Astronaut;
exports.amountElements = {
    level1: 0,
    level2: 32,
    level3: 35,
    level4: 28
};
exports.charNames = {
    1: 'jennifer',
    2: 'patrick',
    3: 'carla',
    4: 'hector'
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Alien extends Phaser.Sprite {
    constructor(game, x, y, distance) {
        super(game, x, y, 'alien');
        this.distance = distance;
        this.turnLTimer = 0;
        this.timerLSet = false;
        this.turnRTimer = 0;
        this.timerRSet = false;
        this.pathCounter = 0;
        game.physics.arcade.enableBody(this);
        this.body.collideWorldBounds = false;
        this.body.velocity.x = 50;
    }
}
exports.Alien = Alien;
exports.aliens = {
    level1: {
        amount: 0,
        coordinates: {}
    },
    level2: {
        amount: 5,
        coordinates: {
            alien1: [740, 450, 265],
            alien2: [1050, 450, 400],
            alien3: [1230, 220, 290],
            alien4: [2570, 200, 210],
            alien5: [3600, 265, 150]
        }
    },
    level3: {
        amount: 5,
        coordinates: {
            alien1: [740, 450, 185],
            alien2: [1060, 450, 135],
            alien3: [1610, 450, 165],
            alien4: [2500, 150, 300],
            alien5: [3570, 300, 230]
        }
    },
    level4: {
        amount: 3,
        coordinates: {
            alien1: [700, 350, 250],
            alien2: [2850, 150, 220],
            alien3: [3800, 450, 250]
        }
    }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Oxygen extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'oxygen');
        game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
    }
}
exports.Oxygen = Oxygen;
exports.oxygens = {
    level1: {
        amount: 3,
        coordinates: {
            oxygen1: [90, 140],
            oxygen2: [1405, 224],
            oxygen3: [1760, 305]
        }
    },
    level2: {
        amount: 5,
        coordinates: {
            oxygen1: [1008, 256],
            oxygen2: [1749, 416],
            oxygen3: [2096, 32],
            oxygen4: [3330, 416],
            oxygen5: [4269, 416]
        }
    },
    level3: {
        amount: 5,
        coordinates: {
            oxygen1: [1291, 64],
            oxygen2: [3003, 416],
            oxygen3: [1370, 416],
            oxygen4: [3960, 416],
            oxygen5: [2052, 416]
        }
    },
    level4: {
        amount: 3,
        coordinates: {
            oxygen1: [43, 32],
            oxygen2: [2175, 416],
            oxygen3: [3146, 256]
        }
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */
class Menu extends Phaser.State {
    //TODO: replace kill with destroy?
    constructor() {
        console.log('MENU_CONSTRUCTOR');
        super();
        this.mControlX = -66;
        this.mControlY = -130;
        this.sControlX = -156;
        this.sControlY = -45;
        this.playerButtonsSetup = [
            //TODO: check if x, y locations are okay
            { x: -306, y: -130, name: "player1" /* JENNIFER */ },
            { x: -153, y: -130, name: "player2" /* PATRICK */ },
            { x: 0, y: -130, name: "player3" /* CARLA */ },
            { x: 153, y: -130, name: "player4" /* HECTOR */ }
        ];
    }
    addPlayerButtons() {
        console.log('MENU_ADDPLAYERBUTTONS');
        /* characterauswahl */
        this.playerButtons = this.playerButtonsSetup.map((loc, i) => this.game.add.button(
        //TODO: check if add. can be replaced by new Phaser.Button
        loc.x, loc.y, loc.name, () => this.highlightButton(i), this, 1, 0) //TODO: check if all params are needed
        );
        this.playerButtons.forEach((pb) => {
            this.background.addChild(pb);
        });
    }
    addMenuButtons() {
        console.log('MENU_ADDMENUBUTTONS');
        /* buttons */
        const menuButtonsSetup = [
            //TODO: check if x, y locations are okay
            {
                x: -36,
                y: 193,
                name: 'startButton',
                callback: () => this.startIntro()
            },
            {
                x: 280,
                y: 188,
                name: 'soundButton',
                callback: () => this.soundOption()
            },
            {
                x: -316,
                y: 188,
                name: 'scoreButton',
                callback: () => this.scoreOption()
            }
        ];
        this.menuButtons = menuButtonsSetup.map((loc, i) => this.game.add.button(loc.x, loc.y, loc.name, loc.callback, this, 1, 0)); //TODO: check if all params are needed
        this.menuButtons.forEach((mb) => {
            this.background.addChild(mb);
        });
    }
    changeMusic() {
        console.log('MENU_CHANGEMUSIC');
        if (this.playerConfig.sound.soundOn) {
            this.media.buttonSound.play('', 0, 0.2);
        }
        this.musicControl.setFrames(+(!this.musicControl.frame), +(!this.musicControl.frame));
        if (this.playerConfig.sound.musicOn) {
            this.media.backgroundMusic.pause();
        }
        else {
            this.media.backgroundMusic.resume();
        }
        this.playerConfig.sound.musicOn = !this.playerConfig.sound.musicOn;
    }
    changeSound() {
        console.log('MENU_CHANGESOUND');
        this.soundControl.setFrames(+(!this.soundControl.frame), +(!this.soundControl.frame));
        this.playerConfig.sound.soundOn = !this.playerConfig.sound.soundOn;
        if (this.playerConfig.sound.soundOn) {
            this.media.buttonSound.play('', 0, 0.2);
        }
    }
    closeWindow() {
        console.log('MENU_CLOSEWINDOW');
        this.popup.destroy();
        // if (this.activeAstronaut) {
        //     this.replaceButtonWithSprite();
        // }
        /* buttons */
        // this.addMenuButtons();
        this.menuButtons.forEach((b) => {
            this.background.addChild(b);
        });
        this.playerButtons.forEach((b) => {
            this.background.addChild(b);
        });
        if (this.highScoreGroup) {
            this.highScoreGroup.destroy();
        }
    }
    create() {
        if (this.playerConfig.sound.musicOn) {
            // this.media.backgroundMusic.play(); TODO:needed if loopfull is used?
            this.media.backgroundMusic.loopFull();
        }
        console.log('MENU_CREATE');
        this.background = this.game.add.sprite(400, 300, 'optionBackground'); //TODO: x, y?
        this.background.alpha = 1.0; //TODO: needed?
        this.background.anchor.set(0.5); //TODO: needed?
        this.addPlayerButtons();
        this.addMenuButtons();
        this.playerNameInputField = this.game.add.text(375, 78, this.playerConfig.name, {
            font: '27px Raleway',
            fill: '#ffffff'
        });
        /* The RegEx only allows letters and backspace */
        this.game.input.keyboard.onUpCallback = (e) => {
            if (/8|6[5-9]|7[0-9]|8[0-9]|90/.test(String(e.keyCode))) {
                //TODO: check regex
                this.updateName(e);
            }
        };
    }
    createPopUp(spriteName) {
        const popup = this.game.add.sprite(400, 300, spriteName);
        popup.alpha = 1.0;
        popup.anchor.set(0.5);
        this.playerButtons.forEach((b) => {
            this.background.removeChild(b);
        });
        this.menuButtons.forEach((b) => {
            this.background.removeChild(b);
        });
        return popup;
    }
    handleComplete() {
        console.log('MENU_HANDLECOMPELTE');
        if (!this.introFinished) {
            this.game.state.start('play', true, false, this.playerConfig, this.media, this.activeAstronaut);
            this.introFinished = true;
            this.missionVideo.stop(true);
            // this.game.state.start('play'); TODO: required?
        }
    }
    highlightButton(player) {
        console.log('MENU_HIGHLIGHTBUTTON');
        // this.background.removeChild(this.playerButtons[player]);
        if (this.activeAstronaut !== undefined) {
            this.playerButtons[this.activeAstronaut].setFrames(1, 0);
        }
        this.playerButtons[player].setFrames(1, 1);
        // if (this.activeAstronaut !== null) {
        // this.playerButtons[player].destroy();
        // const p = this.playerButtonsSetup[player];
        // this.playerButtons[player].frame = +(!this.playerButtons[player].frame);
        // this.playerButtons[player] = this.game.add.button(
        //     p.x,
        //     p.y,
        //     p.name,
        //     () => this.highlightButton(player),
        //     this,
        //     1,
        //     1
        // );
        // this.background.addChild(this.playerButtons[player]);
        // }
        this.activeAstronaut = player;
        // this.replaceButtonWithSprite();
    }
    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @param {Media} media
     * @memberof Loading
     */
    init(playerConfig, media) {
        console.log('MENU_INIT');
        this.playerConfig = playerConfig;
        this.media = media;
    }
    readLocal() {
        console.log('MENU_READLOCAL');
        /* get the highscore object */
        const scores = localStorage.getItem('highScore');
        return JSON.parse(scores);
    }
    /*replaceButtonWithSprite() {
        console.log('MENU_REPLACEBUTTONWITHSPRTE');

        const playerButton = this.playerButtonsSetup[this.activeAstronaut];
        const player = this.game.add.sprite(
            playerButton.x,
            playerButton.y,
            playerButton.name
        );
        player.frame = 1; //TODO: why?
        this.background.addChild(player);
    }*/
    resetScore() {
        console.log('MENU_RESETSCORE');
        localStorage.clear();
        this.closeWindow();
        this.scoreOption();
    }
    scoreOption() {
        console.log('MENU_SCOREOPTION');
        this.popup = this.createPopUp('scoreBackground');
        this.closeButton = this.game.add.button(-316, 188, 'closeButton', this.closeWindow, this, 1, 0);
        this.popup.addChild(this.closeButton);
        this.resetButton = this.game.add.button(260, 188, 'resetButton', this.resetScore, this, 1, 0);
        this.popup.addChild(this.resetButton);
        let highScoreList = this.readLocal();
        if (highScoreList !== null) {
            highScoreList = this.sortHighScore(highScoreList);
            let firstPlace = 125;
            this.highScoreGroup = this.game.add.group();
            for (let i = 0; i < highScoreList.length && i < 10; i++) {
                const p = this.game.add.text(190, firstPlace, `${i + 1}. `, {
                    font: '30px Raleway',
                    fill: '#ffffff'
                });
                const n = this.game.add.text(250, firstPlace, highScoreList[i][0], {
                    font: '30px Raleway',
                    fill: '#ffffff'
                });
                const s = this.game.add.text(550, firstPlace, highScoreList[i][1], {
                    font: '30px Raleway',
                    fill: '#ffffff'
                });
                this.highScoreGroup.add(n);
                this.highScoreGroup.add(s);
                this.highScoreGroup.add(p);
                firstPlace += 35;
            }
        }
    } //TODO: quicksort?
    /* bubbleSort */
    sortHighScore(highScoreList) {
        console.log('MENU_SORTHIGHSCORE');
        let swapped;
        const hsl = highScoreList;
        do {
            swapped = false;
            for (let i = 0; i < hsl.length - 1; i++) {
                let v1 = hsl[i];
                let v2 = hsl[i + 1];
                if (v1[1] < v2[1]) {
                    const temp = [v1[0], v1[1]];
                    v1 = [v2[0], v2[1]];
                    v2 = temp;
                    hsl[i] = v1;
                    hsl[i + 1] = v2;
                    swapped = true;
                }
            }
        } while (swapped);
        return highScoreList;
    }
    soundOption() {
        console.log('MENU_SOUNDOPTINO');
        this.popup = this.createPopUp('soundBackground');
        this.musicControl = this.game.add.button(this.mControlX, this.mControlY, 'controlSound', this.changeMusic, this, this.playerConfig.sound.musicOn ? 1 : 0, this.playerConfig.sound.musicOn ? 1 : 0);
        this.popup.addChild(this.musicControl);
        this.soundControl = this.game.add.button(this.sControlX, this.sControlY, 'controlSound', this.changeSound, this, this.playerConfig.sound.soundOn ? 1 : 0, this.playerConfig.sound.soundOn ? 1 : 0);
        this.popup.addChild(this.soundControl);
        this.closeButton = this.game.add.button(-36, 188, 'closeButton', this.closeWindow, this, 1, 0);
        this.popup.addChild(this.closeButton);
    }
    startGame() {
        console.log('MENU_STARTGAME');
        this.introVideo.stop();
        this.missionVideo = this.game.add.video('mission', './assets/videos/Mission.mkv');
        if (!this.playerConfig.sound.soundOn) {
            this.missionVideo.mute = true;
        }
        this.missionVideo.play(true);
        this.introFinished = false;
        this.missionVideo.loop = false;
        this.missionVideo.onComplete.add(this.handleComplete);
        this.missionVideo.addToWorld(400, 300, 0.5, 0.5);
        this.game.input.keyboard.onUpCallback = (e) => {
            this.handleComplete();
        };
    }
    startIntro() {
        console.log('MENU_STARTINTRO');
        const str = this.playerNameInputField.text;
        if (!(str.length < 1) && this.activeAstronaut != null) {
            this.background.destroy();
            this.introVideo = this.game.add.video('intro', './assets/videos/Intro.mkv');
            if (!this.playerConfig.sound.soundOn) {
                this.introVideo.mute = true;
            }
            this.introVideo.play(true);
            this.introVideo.loop = false;
            this.introVideo.onComplete.add(this.startGame);
            this.introVideo.addToWorld(400, 300, 0.5, 0.5);
            this.game.input.keyboard.onUpCallback = (e) => {
                this.startGame();
            };
            if (this.playerConfig.sound.musicOn) {
                this.media.backgroundMusic.stop();
            }
        }
    }
    updateName(e) {
        console.log('MENU_UPDATENAME');
        let string = this.playerNameInputField.text;
        /* Backspace */
        if (e.keyCode === 8) {
            string = string.substring(0, string.length - 1);
            this.playerNameInputField.text = string;
        }
        else if (e.keyCode >= 65 && e.keyCode <= 90 && string.length < 13) {
            string = String.fromCharCode(e.keyCode);
            this.playerNameInputField.text = this.playerNameInputField.text + string;
        }
    }
}
exports.default = Menu;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class GameOver extends Phaser.State {
    create() {
        const background = this.game.add.image(0, 0, 'gameOver');
        const restartButton = this.game.add.button(345.5, 500, 'restartButton', this.restartGame, this, 1, 0);
        background.addChild(restartButton);
    }
    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @param {Media} media
     * @memberof Loading
     */
    init(playerConfig, media) {
        this.playerConfig = playerConfig;
        this.media = media;
    }
    restartGame() {
        this.game.state.start('menu', true, false);
        this.introFinished = false;
        if (this.playerConfig.sound.musicOn) {
            this.media.backgroundMusic.play();
        }
    }
}
exports.default = GameOver;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Bonus extends Phaser.State {
    collision() {
        if (this.game.time.now > this.collisionTimer) {
            this.score -= 10;
            this.scoreText.text = String(this.score);
            this.collisionTimer = this.game.time.now + 500;
        }
    }
    create() {
        /* Keyboard controls */
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.add.image(0, 0, 'bonusLevelBackground');
        this.invisibleWallLeft = this.game.add.sprite(-25, 0, 'invisWall');
        this.game.physics.arcade.enableBody(this.invisibleWallLeft);
        this.invisibleWallLeft.body.allowGravity = false;
        this.invisibleWallLeft.body.immovable = true;
        this.invisibleWallLeft.fixedToCamera = true;
        this.invisibleWallRight = this.game.add.sprite(810, 0, 'invisWall');
        this.game.physics.arcade.enableBody(this.invisibleWallRight);
        this.invisibleWallRight.body.allowGravity = false;
        this.invisibleWallRight.body.immovable = true;
        this.invisibleWallRight.fixedToCamera = true;
        this.wallGroup = this.game.add.group();
        this.wallGroup.add(this.invisibleWallLeft);
        this.wallGroup.add(this.invisibleWallRight);
        this.rocket = this.game.add.sprite((this.game.width / 2) - (123 / 2), 9400, 'bonusRocket');
        this.game.physics.arcade.enableBody(this.rocket);
        this.rocket.body.allowGravity = false;
        this.rocket.animations.add('empty', [0], 1, true);
        this.rocket.animations.play('empty');
        this.game.camera.follow(this.rocket);
        this.rocket.body.bounce.set(1.0);
        this.map = this.game.add.tilemap('bonusLevel');
        this.map.addTilesetImage('bonusLevel_tilemap', 'bonusLevel_tilemap');
        this.map.addTilesetImage('bonusLevel_tilemap_finish', 'bonusLevel_tilemap_finish');
        this.map.setCollisionBetween(1, 40);
        this.map.setTileIndexCallback(41, this.finish, this);
        this.layer = this.map.createLayer('Kachelebene 1');
        this.layer.resizeWorld();
        this.scoreText = this.game.add.text(45, 10, String(this.score), {
            font: '30px Raleway',
            fill: '#ffffff'
        });
        this.scoreElement = this.game.add.image(9, 10, 'elementScore');
        this.scoreElement.fixedToCamera = true;
        this.scoreText.fixedToCamera = true;
        this.collisionTimer = 0;
        this.started = false;
        this.infoText = this.game.add.text(this.game.width / 3, this.game.height / 10, 'Travel back to Earth \nAvoid the meteoroids \nPress ENTER to start', {
            font: '30px Raleway',
            fill: '#ffffff'
        });
        this.infoText.fixedToCamera = true;
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }
    finish() {
        this.saveLocal();
        this.rocket.body.velocity.y -= 1000;
    }
    init(playerConfig, media, score) {
        this.playerConfig = playerConfig;
        this.media = media;
        this.score = score;
    }
    parseJson(json) {
        const pName = this.playerConfig.name;
        let playerExists = false;
        if (json.length === 0) {
            json.push([pName, this.score]);
            localStorage.setItem('highScore', JSON.stringify(json));
        }
        else {
            for (let i = 0; i < json.length; i++) {
                const tArray = json[i];
                const highScoreName = tArray[0];
                const playerHighScore = tArray[1];
                if (highScoreName === pName) {
                    playerExists = true;
                    if (playerHighScore < this.score) {
                        json.splice(i, 1);
                        json.push([pName, this.score]);
                        localStorage.setItem('highScore', JSON.stringify(json));
                    }
                }
            }
            if (!playerExists) {
                json.push([pName, this.score]);
                localStorage.setItem('highScore', JSON.stringify(json));
            }
        }
    }
    saveLocal() {
        const scores = localStorage.getItem('highScore');
        let scoreArray = [];
        if (scores) {
            scoreArray = JSON.parse(scores);
        }
        this.parseJson(scoreArray);
    }
    update() {
        if (this.started) {
            this.game.physics.arcade.collide(this.rocket, this.layer, this.collision, null, this);
            this.game.physics.arcade.collide(this.rocket, this.wallGroup);
            //@ts-ignore
            if (this.cursors.left.isDown) {
                this.rocket.body.velocity.x = -300;
                //@ts-ignore
            }
            else if (this.cursors.right.isDown) {
                this.rocket.body.velocity.x = 300;
            }
            else if (this.rocket.body.velocity.x < 50 && this.rocket.body.velocity.x > -50) {
                this.rocket.body.velocity.x = 0;
            }
            else if (this.rocket.body.velocity.x < 0) {
                this.rocket.body.velocity.x += 5;
            }
            else if (this.rocket.body.velocity.x > 0) {
                this.rocket.body.velocity.x -= 5;
            }
            if (this.rocket.body.y <= -100) {
                this.game.state.start('win');
            }
            if (this.rocket.body.velocity.y !== -300 && this.game.time.now > this.collisionTimer) {
                this.rocket.body.velocity.y = -300;
            }
        }
        else if (this.enterKey.isDown) {
            this.infoText.kill();
            this.started = true;
            this.rocket.body.velocity.y = -300;
        }
    }
}
exports.default = Bonus;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const astronaut_1 = __webpack_require__(7);
class Win extends Phaser.State {
    constructor() {
        super();
        this.videoOn = false;
    }
    create() {
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
        this.cutScene = this.game.add.video(`${astronaut_1.charNames[this.activeAstronaut]}animation4`, `./assets/videos/${astronaut_1.charNames[this.activeAstronaut]}animation4.mkv`);
        this.videoBackground = this.game.add.sprite(0, 0, 'startBackground');
        this.cutScene.add(this.videoBackground);
        this.cutScene.play();
        this.cutScene.onComplete.add(this.endIntro, this);
    }
    endIntro() {
        this.videoOn = false;
        this.cutScene.stop();
        this.game.add.image(0, 0, 'win');
        // var restartButton = this.game.add.button(345.5, 570, 'restartButton', restartGame, this, 1, 0);
        // background.addChild(startButton);
    }
    update() {
        if (this.spaceKey.isDown && this.videoOn) {
            this.endIntro();
        }
    }
}
exports.default = Win;


/***/ })
/******/ ]);