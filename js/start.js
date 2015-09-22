var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
	preload : preload,
	create : create,
});

function preload() {
	game.state.add("Loading", loading);
	game.state.add("Menu", menu);
	game.state.add("Game", game);
	game.state.add("GameOver", gameOver);
}

function create() {
	game.state.start("Loading");
}
