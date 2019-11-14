import { charNames } from '../comp/astronaut';

export default class Win extends Phaser.State {
    spaceKey: Phaser.Key;

    cutScene: Phaser.Video;

    videoOn: boolean;

    videoBackground: Phaser.Sprite;

    activeAstronaut: number

    playerConfig: PlayerConfig;

    media: Media;

    constructor() {
        super();
        this.videoOn = false;
    }

    create() {
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

        this.cutScene = this.game.add.video(`${charNames[this.activeAstronaut]}animation4`, `./assets/videos/${charNames[this.activeAstronaut]}_animation4.mkv`);

        this.videoBackground = this.game.add.sprite(0, 0, 'startBackground');
        this.cutScene.add(this.videoBackground);
        this.cutScene.play();
        this.cutScene.onComplete.add(() => this.endIntro(), this);
    }

    endIntro() {
        this.videoOn = false;

        this.cutScene.stop();

        const background = this.game.add.image(0, 0, 'win');
        const restartButton = this.game.add.button(
            345.5,
            570,
            'restartButton',
            () => this.game.state.start('intro', true, false, this.playerConfig, this.media),
            this,
            1,
            0
        );
        background.addChild(restartButton);
    }

    init(playerConfig: PlayerConfig, media: Media, activeAstronaut: number) {
        this.playerConfig = playerConfig;
        this.media = media;
        this.activeAstronaut = activeAstronaut;
    }

    update() {
        if (this.spaceKey.isDown && this.videoOn) {
            this.endIntro();
        }
    }
}
