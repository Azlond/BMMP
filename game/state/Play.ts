import { Button } from '../comp/Button'; // eslint-disable-line
import { toolLocations, Tools } from '../comp/tools';
import { amountElements, charNames, Astronaut } from '../comp/astronaut';
import { aliens, Alien } from '../comp/alien';
import { oxygens, Oxygen } from '../comp/oxygen';
/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */
export default class Play extends Phaser.State {
    /**
     * @description Player settings object to pass onto the next state
     * @type {PlayerConfig}
     * @memberof Loading
     */
    playerConfig: PlayerConfig;

    /**
     * @description Media object, allows access to media files
     * @type {Media}
     * @memberof Loading
     */
    media: Media;

    levelNumber: number;

    finalLevel: number;

    cursors: object;

    spaceKey: Phaser.Key;

    oxygenCounter: number;

    oxygenTank: Phaser.Sprite;

    lifeCounter: number;

    timer: Phaser.Timer;

    map: Phaser.Tilemap;

    layer: Phaser.TilemapLayer;

    score: number;

    oldScore: number;

    scoreText: Phaser.Text;

    astronaut: Astronaut;

    pliers: Tools;

    screwdriver: Tools;

    wrench: Tools;

    collectpliers: Tools;

    collectwrench: Tools;

    collectscrewdriver: Tools;

    nopliers: Tools;

    nowrench: Tools;

    noscrewdriver: Tools;

    toolsCollected: number;

    lifeTimer: number;

    cutScene: Phaser.Video;

    rocket: Phaser.Sprite;

    timer2: Phaser.Timer;

    alienGroup: Phaser.Group;

    toolGroup: Phaser.Group;

    oxygenGroup: Phaser.Group;

    videoOn: boolean;

    timer4: Phaser.Timer;

    fallen: boolean;

    rocketGone: boolean;

    background1: Phaser.Image;

    background2: Phaser.Image;

    background3: Phaser.Image;

    scoreElement: Phaser.Image;

    activeAstronaut: number;

    wall: Phaser.Sprite;

    alien: Alien;

    oxygenBottle: Oxygen;

    pauseMenuActive: boolean;

    isPaused: boolean;

    pauseMenu: Phaser.Sprite;

    videoBackground: Phaser.Sprite;

    restartButton: Phaser.Button;

    continueButton: Phaser.Button;

    quitButton: Phaser.Button;

    musicControl: Button;

    soundControl: Button;

    life: Phaser.Sprite;

    /* change the sprite for the oxygen counter */
    changeDisplay() {
        if (this.oxygenCounter > 3) {
            this.oxygenTank.frame = this.oxygenCounter;
            this.oxygenCounter -= 1;
        } else if (this.oxygenCounter < 4 && this.oxygenCounter > 0) {
            this.oxygenTank.animations.add('blink1', [this.oxygenCounter, 0], 5, true);
            this.oxygenTank.animations.play('blink1');
            this.oxygenCounter -= 1;
        } else if (this.oxygenCounter === 0) {
            this.oxygenTank.animations.stop();
            this.oxygenTank.frame = 0;
            this.lifeCounter -= 1;
            if (this.playerConfig.sound.soundOn) {
                this.media.loseLifeSound.play();
            }
            this.checkLifeCounter();
            this.timer.stop();
            this.loadLevel('restart');
        } else {
            this.timer.stop();
        }
    }

    /* edit the music settings */
    changeMusicOnPauseMenu() {
        if (this.playerConfig.sound.soundOn) {
            this.media.buttonSound.play('', 0, 0.2);
        }
        this.musicControl.getButton().setFrames(this.playerConfig.sound.musicOn ? 1 : 0);
        this.media.backgroundMusic.resume();
    }

    /* edit the sound settings */
    changeSoundOnPauseMenu() {
        if (this.playerConfig.sound.soundOn) {
            this.media.buttonSound.play('', 0, 0.2);
        }
        this.soundControl.getButton().setFrames(this.playerConfig.sound.soundOn ? 1 : 0);
    }

    /* check if the player is dead */
    checkLifeCounter() {
        if (this.lifeCounter === 0) {
            if (this.playerConfig.sound.soundOn) {
                this.media.gameOverSound.play();
            }
            this.game.state.start('gameOver', true, false, this.playerConfig, this.media);
        }
    }

    /* collecting an element and removing it from thethis.game */
    collectElement(astronaut: Astronaut, tile: Phaser.Tile) {
        const str = astronaut.key.toString();
        /* check to see if it is actually the astronaut collecting the element and not an alien */
        if (str.indexOf('char') !== -1) {
            this.map.removeTile(tile.x, tile.y, this.layer);
            if (this.playerConfig.sound.soundOn) {
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
    collectOxygen(astronaut: Astronaut, oxygenBottle: Phaser.Sprite) {
        oxygenBottle.kill();
        this.timer.stop();
        if (this.playerConfig.sound.soundOn) {
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
    collectTools(astronaut: Astronaut, tools: Phaser.Sprite) {
        if (tools === this.collectpliers) {
            this.nopliers.kill();
            if (this.playerConfig.sound.soundOn) {
                this.media.collectToolSound.play();
            }
            this.pliers = new Tools(this.game, 690, 10, 1);
            this.game.add.existing(this.pliers);
            this.pliers.fixedToCamera = true;
        }
        if (tools === this.collectscrewdriver) {
            this.noscrewdriver.kill();
            if (this.playerConfig.sound.soundOn) {
                this.media.collectToolSound.play();
            }
            this.screwdriver = new Tools(this.game, 755, 10, 3);
            this.game.add.existing(this.screwdriver);
            this.screwdriver.fixedToCamera = true;
        }
        if (tools === this.collectwrench) {
            this.nowrench.kill();
            if (this.playerConfig.sound.soundOn) {
                this.media.collectToolSound.play();
            }
            this.wrench = new Tools(this.game, 720, 10, 5);
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
    collideWithAlien(astronaut: Astronaut, alien: Alien) {
        if (this.game.time.now > this.lifeTimer) {
            this.lifeCounter -= 1;
            if (this.playerConfig.sound.soundOn) {
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
            } else {
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

        this.musicControl = new Button(this.game, 75, -165, this.playerConfig.sound.musicOn ? 1 : 0, () => this.changeMusicOnPauseMenu(), 'controlSound');
        this.pauseMenu.addChild(this.musicControl.getButton());

        this.soundControl = new Button(this.game, -20, -70, this.playerConfig.sound.soundOn ? 1 : 0, () => this.changeSoundOnPauseMenu(), 'controlSound');
        this.pauseMenu.addChild(this.soundControl.getButton());

        this.restartButton = this.game.add.button(
            -300,
            180,
            'restartButton',
            () => {
                this.restart();
            },
            this,
            1,
            0
        );
        this.pauseMenu.addChild(this.restartButton);

        this.continueButton = this.game.add.button(
            -50,
            180,
            'continueButton',
            () => {
                this.continueGame();
            },
            this,
            1,
            0
        );
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
    hitFinish(astronaut: Astronaut, finish: boolean) {
        if (this.toolsCollected === 3) {
            this.astronaut.kill();
            this.timer.stop();
            if (this.playerConfig.sound.soundOn) {
                this.media.completeLevelSound.play();
            }
            this.rocket.body.immovable = false;
            this.rocket.body.velocity.y = -150;
            this.rocket.animations.play('full');
            this.score += 25;
            this.scoreText.text = String(this.score);

            if (this.astronaut.collected === amountElements[`level${this.levelNumber}`] && this.lifeCounter < 3) {
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
    init(playerConfig: PlayerConfig, media: Media, activeAstronaut: number) {
        this.playerConfig = playerConfig;
        this.media = media;
        this.activeAstronaut = activeAstronaut;
    }

    /* function to load each level */
    loadLevel(string: string) {
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

        if (this.playerConfig.sound.musicOn) {
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
        this.map.forEach((t: Phaser.Tile) => {
            if (t) {
                t.collideDown = false; //eslint-disable-line
                t.collideLeft = false;//eslint-disable-line
                t.collideRight = false;//eslint-disable-line
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
        this.nopliers = new Tools(this.game, 690, 10, 0);
        this.game.add.existing(this.nopliers);
        this.nopliers.fixedToCamera = true;

        this.nowrench = new Tools(this.game, 720, 10, 4);
        this.game.add.existing(this.nowrench);
        this.nowrench.fixedToCamera = true;

        this.noscrewdriver = new Tools(this.game, 755, 10, 2);
        this.game.add.existing(this.noscrewdriver);
        this.noscrewdriver.fixedToCamera = true;

        /* add tools to the levels */
        this.toolGroup = this.game.add.group();

        this.collectpliers = new Tools(
            this.game,
            toolLocations[`level${this.levelNumber}PliersX`],
            toolLocations[`level${this.levelNumber}PliersY`],
            1
        );
        this.game.add.existing(this.collectpliers);
        this.collectpliers.body.allowGravity = false;
        this.toolGroup.add(this.collectpliers);

        this.collectwrench = new Tools(
            this.game,
            toolLocations[`level${this.levelNumber}WrenchX`],
            toolLocations[`level${this.levelNumber}WrenchY`],
            5
        );
        this.game.add.existing(this.collectwrench);
        this.collectwrench.body.allowGravity = false;
        this.toolGroup.add(this.collectwrench);

        this.collectscrewdriver = new Tools(
            this.game,
            toolLocations[`level${this.levelNumber}ScrewX`],
            toolLocations[`level${this.levelNumber}ScrewY`],
            3
        );
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
        this.astronaut = new Astronaut(this.game, 100, 440, `char${this.activeAstronaut}`);
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

        const alienInfo = aliens[`level${this.levelNumber}`];
        const amountAliens = alienInfo.amount;
        const alienCoordinates = alienInfo.coordinates;

        for (let i = 1; i <= amountAliens; i++) {
            this.alien = new Alien(this.game, alienCoordinates[`alien${i}`][0], alienCoordinates[`alien${i}`][1], alienCoordinates[`alien${i}`][2]);
            this.game.add.existing(this.alien);
            this.alien.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
            this.alien.animations.add('stop', [0], 7, true);
            this.alien.anchor.setTo(0.5, 0.5);
            this.alien.animations.play('walk');
            this.alienGroup.add(this.alien);
        }

        /* add oxygen bottles */
        this.oxygenGroup = this.game.add.group();

        const oxygenInfo = oxygens[`level${this.levelNumber}`];
        const amountOxygen = oxygenInfo.amount;
        const oxygenCoordinates = oxygenInfo.coordinates;

        for (let i = 1; i <= amountOxygen; i++) {
            this.oxygenBottle = new Oxygen(this.game, oxygenCoordinates[`oxygen${i}`][0], oxygenCoordinates[`oxygen${i}`][1]);
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
            this.cutScene = this.game.add.video(`${charNames[this.activeAstronaut]}animation${this.levelNumber}`, `./assets/videos/${charNames[this.activeAstronaut]}_animation${this.levelNumber}.mkv`);
            if (!this.playerConfig.sound.soundOn) {
                this.cutScene.mute = true;
            } else {
                this.cutScene.mute = false;
            }
            this.cutScene.add(this.videoBackground);
            this.cutScene.play();
            this.cutScene.onComplete.add(() => {
                this.endLevel();
            }, this);

            this.videoBackground.bringToTop();
        } else {
            /* award points for remaining lives */
            this.score += 50 * this.lifeCounter;
            this.game.state.start('bonus', false, false, this.playerConfig, this.media, this.activeAstronaut, this.score);
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
        this.game.state.start('intro', true, false, this.playerConfig, this.media);
        this.pauseMenuActive = true;
    }

    /* restart the level - used in the pause menu */
    restart() {
        this.isPaused = false;
        this.lifeCounter = 3;
        this.loadLevel('restart');
        this.pauseMenuActive = true;
    }

    showLife(lifeCounter: number) {
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
            } else if (this.cursors.right.isDown && this.rocket.body.y === 69) {
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
            } else {
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
                } else if (enemy.scale.x !== 1 && (this.astronaut.body.x > enemy.body.x - (enemy.distance - enemy.pathCounter) && this.astronaut.body.x < enemy.body.x + enemy.pathCounter) && this.astronaut.body.x > enemy.body.x) {
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
            if (this.playerConfig.sound.soundOn) {
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
            } else if (this.videoOn) {
                this.endLevel();
            }
        }
    }
}
