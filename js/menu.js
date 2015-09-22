function menu() {}

menu.prototype = {

create:function() {
	
	game.add.sprite(0, 0, 'background');

	var nameLabel = game.add.text(game.world.centerX - 150, 50,'Game Title',
		{font: '75px Arial', fill: '#ffffff'});

	var startLabel = game.add.text(80,game.world.height-100,'press the "W" key to start',
		{font: '25px Arial', fill: '#ffffff'});

	var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

	wkey.onDown.addOnce(this.start,this);

},

start:function() {
	game.state.start('play');
}

};
