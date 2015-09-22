var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('loading', loading);
game.state.add('menu', menu);
game.state.add('game', game);
game.state.add('gameOver', gameOver);

game.state.start('loading');
