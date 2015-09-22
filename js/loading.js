function loading() {}

loading.prototype = {

	preload:function() {

	var loadingLabel = game.add.text(80,150, 'loading...',
		{font: '30px Courier', fill: '#ffffff'});

	/*
	 * Menu images
	 */
	game.load.image('background','assets/background.png');
	game.load.image('button', './assets/woodbutton.png');
	
	/*
	 * Game images
	 */
	game.load.tilemap('level1', './assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('level1Tiles', './assets/tiles.png');

	},

	create:function() {
		game.state.start('menu');
	}

};
