function menu() {}

menu.prototype = {

create:function() {

	var nameLabel = game.add.text(80,80,'Spiel',
		{font: '50px Arial', fill: '#ffffff'});

	var startLabel = game.add.text(80,game.world.height-100,'press the "W" key to start',
		{font: '25px Arial', fill: '#ffffff'});

	var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

	wkey.onDown.addOnce(this.start,this);

},

start:function() {
	game.state.start('game');
}

};
