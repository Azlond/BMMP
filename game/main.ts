//import * as Phaser from 'phaser-ce';
import config from './gameConfig';
import Loading from './state/Loading';
import Intro from './state/Intro';
import Play from './state/Play';
import Menu from './state/Menu';
import GameOver from './state/GameOver';
import Bonus from './state/Bonus';
import Win from './state/Win';
/*
 * Start state - first js-file to be loaded
 * creates the game and the various states
 */

class Game extends Phaser.Game {
    constructor() {
        super(config.width, config.height, Phaser.AUTO, 'game');

        const playerConfig: PlayerConfig = {
            name: '',
            sound: {
                musicOn: true,
                soundOn: true
            }
        };
        this.state.add('loading', Loading, false);
        this.state.add('intro', Intro, false);
        this.state.add('menu', Menu, false);
        this.state.add('play', Play, false);
        this.state.add('gameOver', GameOver, false);
        this.state.add('bonus', Bonus, false);
        this.state.add('win', Win, false);
        this.state.start('loading', false, false, playerConfig);
    }
}
declare global {
    interface Window {
        game: Game;
    }
}
window.game = new Game();
