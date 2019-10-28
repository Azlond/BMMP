export default class GameOver extends Phaser.State {
    playerConfig: PlayerConfig;

    media: Media;

    introFinished: boolean;

    create() {
        const background = this.game.add.image(0, 0, 'gameOver');

        const restartButton: Phaser.Button = this.game.add.button(345.5, 500, 'restartButton', this.restartGame, this, 1, 0);
        background.addChild(restartButton);
    }

    /**
     * @description Implementation of init is required to receive state objects
     * @param {PlayerConfig} playerConfig
     * @param {Media} media
     * @memberof Loading
     */
    init(playerConfig: PlayerConfig, media: Media) {
        this.playerConfig = playerConfig;
        this.media = media;
    }

    restartGame() {
        this.game.state.start('menu', true, false, this.playerConfig, this.media);
        this.introFinished = false;
        if (this.playerConfig.sound.musicOn) {
            this.media.backgroundMusic.play();
        }
    }
}
