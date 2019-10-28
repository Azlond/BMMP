export class Astronaut extends Phaser.Sprite {
    collected: number;

    constructor(
        game: Phaser.Game,
        x: number,
        y: number,
        activeAstronaut: string
    ) {
        super(game, x, y, activeAstronaut);

        game.physics.arcade.enableBody(this);

        this.body.gravity.y = 1000;
        this.body.maxVelocity.y = 500;

        this.collected = 0;
    }
}

export const amountElements: { [key: string]: number } = {
    level1: 0,
    level2: 32,
    level3: 35,
    level4: 28
};

export const charNames: { [key: number]: string } = {
    0: 'jennifer',
    1: 'patrick',
    2: 'carla',
    3: 'hector'
};
