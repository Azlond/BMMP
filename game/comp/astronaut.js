var Astronaut = function(game, x, y) {

	this.game = game;

	switch (activeAstronaut) {
	case 1: // Jennifer
		Phaser.Sprite.call(this, this.game, x, y, 'char1');
		break;
	case 2: // Patrick
		Phaser.Sprite.call(this, this.game, x, y, 'char2');
		break;
	case 3: // Carla
		Phaser.Sprite.call(this, this.game, x, y, 'char3');
		break;
	case 4: // Hector
		Phaser.Sprite.call(this, this.game, x, y, 'char4');
		break;
	default:
		break;
	}

	this.game.physics.arcade.enableBody(this);

	this.body.gravity.y = 1000;
	this.body.maxVelocity.y = 500;

	this.collected = 0;

};

Astronaut.prototype = Object.create(Phaser.Sprite.prototype);
Astronaut.prototype.constructor = Astronaut;

var amountElements = {
		"level1" : 0,
		"level2" : 32,
		"level3" : 35,
		"level4" : 28
}
