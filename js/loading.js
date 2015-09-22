function loading() {}

loading.prototype = {

	preload:function() {

	var loadingLabel = game.add.text(80,150, 'loading...',
		{font: '30px Courier', fill: '#ffffff'});

	game.load.image('background','assets/background.png');
	game.load.image('button', './assets/woodbutton.png');

	},

	create:function() {
		game.state.start('menu');
	}

};
