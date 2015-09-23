var Astronaut = function(game, x, y) {

	this.game = game;

	Phaser.Sprite.call(this, this.game, x, y, 'char');

  	this.game.physics.arcade.enableBody(this);

//  	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
	this.body.maxVelocity.y = 500;

};

Astronaut.prototype = Object.create(Phaser.Sprite.prototype);
Astronaut.prototype.constructor = Astronaut;


