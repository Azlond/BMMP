export class Oxygen extends Phaser.Sprite {
    constructor(game: Phaser.Game, x: number, y: number) {
        super(game, x, y, 'oxygen');
        game.physics.arcade.enableBody(this);
        this.body.allowGravity = false;
    }
}

export const oxygens: {
    [key: string]: {
        amount: number,
        coordinates: {
            [key: string]: [number, number]
        }
    }
} = {
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
