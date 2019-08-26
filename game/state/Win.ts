import { charNames } from '../comp/astronaut';

export default class Win extends Phaser.State {
    spaceKey: Phaser.Key;

    cutScene: Phaser.Video;

    videoOn: boolean;

    videoBackground: Phaser.Sprite;

    activeAstronaut: number

    constructor() {
        super();
        this.videoOn = false;
    }

    create() {
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

        this.cutScene = this.game.add.video(`${charNames[this.activeAstronaut]}animation4`);

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