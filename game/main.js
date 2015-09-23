/*
 * Start state - first js-file to be loaded
 * creates the game and the various states
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('loading', loading);
game.state.add('menu', menu);
game.state.add('play', play);
game.state.add('gameOver', gameOver);

game.state.start('loading');
