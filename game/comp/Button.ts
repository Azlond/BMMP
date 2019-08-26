export class Button {
    button: Phaser.Button;

    constructor(
        game: Phaser.Game,
        x: number,
        y: number,
        frame: string | number,
        cb: Function,
        keyName: string
    ) {
        this.button = game.add.button(x, y, keyName, cb, frame);
        this.button.inputEnabled = true;
        this.button.input.priorityID = 1;
        this.button.input.useHandCursor = true;
        // button.events.onInputDown.add(cb, this);
    }
}
