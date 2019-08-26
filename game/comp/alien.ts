export class Alien extends Phaser.Sprite {
    /**
     * @description max distance the alien is allowed to walk
     * @type {number}
     * @memberof Alien
     */
    distance: number;

    turnLTimer: number;

    timerLSet: boolean;

    turnRTimer: number;

    timerRSet: boolean;

    pathCounter: number;

    constructor(game: Phaser.Game, x: number, y: number, distance: number) {
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

export const aliens: {
    [key: string]: {
        amount: number,
        coordinates: {
            [key: string]: [number, number, number]
        }
    }
} = {
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
