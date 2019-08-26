export default class Intro extends Phaser.State {
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
    init(playerConfig: PlayerConfig, media: Media) {
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
