var Alien = function(game, x, y) {

	this.game = game;

  	Phaser.Sprite.call(this, this.game, x, y, 'char');

 	this.game.physics.arcade.enableBody(this);

  	this.body.collideWorldBounds = true;
	this.body.velocity.x = 50

};

Alien.prototype = Object.create(Phaser.Sprite.prototype);  
Alien.prototype.constructor = Alien;

