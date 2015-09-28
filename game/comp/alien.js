var Alien = function(game, x, y) {

	this.game = game;

  	Phaser.Sprite.call(this, this.game, x, y, 'alien');

 	this.game.physics.arcade.enableBody(this);

  	this.body.collideWorldBounds = false;
	this.body.velocity.x = 50

};

Alien.prototype = Object.create(Phaser.Sprite.prototype);  
Alien.prototype.constructor = Alien;

var level1alien1 = [ 600, 350 ];
var level1alien2 = [ 1800, 350 ];
var level2alien1 = [ 600, 350 ];
var level2alien2 = [ 1600, 350 ];
var level2alien3 = [ 1108, 350 ];
var level3alien1 = [ 700, 350 ];
var level3alien2 = [ 1600, 350 ];
var level3alien3 = [ 1108, 350 ];
var level4alien1 = [ 700, 350 ];
var level4alien2 = [ 1600, 350 ];
var level4alien3 = [ 1108, 350 ];
