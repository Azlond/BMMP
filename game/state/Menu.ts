import { Key } from 'ts-key-enum'; //eslint-disable-line
import { PlayerNames } from './enums'; // eslint-disable-line
import { Button } from '../comp/Button'; // eslint-disable-line
/*
 * Menu-state - Allows the player to start the game
 * and possibly change options/the player character
 */

export default class Menu extends Phaser.State {
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

    /**
     * @description Background of the menu screen
     * @type {Phaser.Sprite}
     * @memberof Menu
     */
    background: Phaser.Sprite;

    /**
     * @description Array containing the player selection buttons
     * @type {Array<Phaser.Button>}
     * @memberof Menu
     */
    playerButtons: Array<Phaser.Button>;

    /**
     * @description Array containing menu buttons
     * @type {Array<Phaser.Button>}
     * @memberof Menu
     */
    menuButtons: Array<Phaser.Button>;

    /**
     * @description Input field for the player name
     * @type {Phaser.Text}
     * @memberof Menu
     */
    playerNameInputField: Phaser.Text;

    //FIXME:
    mControlX: number;

    mControlY: number;

    sControlX: number;

    sControlY: number;

    musicControl: Phaser.Button;

    soundControl: Phaser.Button;

    popup: Phaser.Sprite;

    activeAstronaut: number;

    highScoreGroup: Phaser.Group;

    introFinished: boolean;

    missionVideo: any;

    playerButtonsSetup: Array<{ x: number; y: number; name: string }>;

    closeButton: Phaser.Button;

    resetButton: Phaser.Button;

    introVideo: Phaser.Video;

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
            { x: -306, y: -130, name: PlayerNames.JENNIFER },
            { x: -153, y: -130, name: PlayerNames.PATRICK },
            { x: 0, y: -130, name: PlayerNames.CARLA },
            { x: 153, y: -130, name: PlayerNames.HECTOR }
        ];
    }

    addPlayerButtons() {
        console.log('MENU_ADDPLAYERBUTTONS');

        /* characterauswahl */
        this.playerButtons = this.playerButtonsSetup.map(
            (loc, i) => this.game.add.button(
                //TODO: check if add. can be replaced by new Phaser.Button
                loc.x,
                loc.y,
                loc.name,
                () => this.highlightButton(i),
                this,
                1,
                0
            ) //TODO: check if all params are needed
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

        this.menuButtons = menuButtonsSetup.map((loc, i) => this.game.add.button(
            loc.x,
            loc.y,
            loc.name,
            loc.callback,
            this,
            1,
            0
        )); //TODO: check if all params are needed
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
        } else {
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

        this.playerNameInputField = this.game.add.text(
            375,
            78,
            this.playerConfig.name,
            {
                font: '27px Raleway',
                fill: '#ffffff'
            }
        );

        /* The RegEx only allows letters and backspace */
        this.game.input.keyboard.onDownCallback = (event: KeyboardEvent) => {
            const playerName = this.playerNameInputField.text;
            if (event.key === Key.Backspace) {
                event.preventDefault();
                this.playerNameInputField.text = playerName.slice(0, -1);
            } else if (new RegExp('[a-z]', 'i').test(String.fromCharCode(event.keyCode)) && playerName.length < 13) { //only allow letters, up to a length of 13 characters
                this.playerNameInputField.text += event.key.toUpperCase();
            }
        };
    }

    createPopUp(spriteName: string): Phaser.Sprite {
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
            this.playerConfig.name = this.playerNameInputField.text;
            this.game.state.start(
                'play',
                true,
                false,
                this.playerConfig,
                this.media,
                this.activeAstronaut
            );
            this.introFinished = true;
            this.missionVideo.stop(true);
            // this.game.state.start('play'); TODO: required?
        }
    }

    highlightButton(player: number) {
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
    init(playerConfig: PlayerConfig, media: Media) {
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

        this.closeButton = this.game.add.button(
            -316,
            188,
            'closeButton',
            this.closeWindow,
            this,
            1,
            0
        );
        this.popup.addChild(this.closeButton);

        this.resetButton = this.game.add.button(
            260,
            188,
            'resetButton',
            this.resetScore,
            this,
            1,
            0
        );
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

                const n = this.game.add.text(
                    250,
                    firstPlace,
                    highScoreList[i][0],
                    {
                        font: '30px Raleway',
                        fill: '#ffffff'
                    }
                );

                const s = this.game.add.text(
                    550,
                    firstPlace,
                    highScoreList[i][1],
                    {
                        font: '30px Raleway',
                        fill: '#ffffff'
                    }
                );
                this.highScoreGroup.add(n);
                this.highScoreGroup.add(s);
                this.highScoreGroup.add(p);
                firstPlace += 35;
            }
        }
    } //TODO: quicksort?

    /* bubbleSort */
    sortHighScore(highScoreList: any) {
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

        this.musicControl = this.game.add.button(
            this.mControlX,
            this.mControlY,
            'controlSound',
            this.changeMusic,
            this,
            this.playerConfig.sound.musicOn ? 1 : 0,
            this.playerConfig.sound.musicOn ? 1 : 0
        );
        this.popup.addChild(this.musicControl);

        this.soundControl = this.game.add.button(
            this.sControlX,
            this.sControlY,
            'controlSound',
            this.changeSound,
            this,
            this.playerConfig.sound.soundOn ? 1 : 0,
            this.playerConfig.sound.soundOn ? 1 : 0
        );
        this.popup.addChild(this.soundControl);

        this.closeButton = this.game.add.button(
            -36,
            188,
            'closeButton',
            this.closeWindow,
            this,
            1,
            0
        );
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
        this.missionVideo.onComplete.add(() => this.handleComplete());
        this.missionVideo.addToWorld(400, 300, 0.5, 0.5);
        this.game.input.keyboard.onUpCallback = (e: KeyboardEvent) => {
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
            this.introVideo.onComplete.add(() => this.startGame());
            this.introVideo.addToWorld(400, 300, 0.5, 0.5);
            this.game.input.keyboard.onUpCallback = (e: KeyboardEvent) => {
                this.startGame();
            };
            if (this.playerConfig.sound.musicOn) {
                this.media.backgroundMusic.stop();
            }
        }
    }
}
