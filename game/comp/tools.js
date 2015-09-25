var Tools = function(game,x,y,frame) {

	this.game = game;

	Phaser.Sprite.call(this, this.game, x, y, 'tools',frame);

	this.game.physics.arcade.enableBody(this);

};

Tools.prototype = Object.create(Phaser.Sprite.prototype);
Tools.prototype.constructor = Tools;

var level1pliers = [100,100];
var level1screw = [100,100];
var level1wrench = [100,100];
var level2pliers = [0,0];
var level2screw = [0,0];
var level2wrench = [0,0];
var level3pliers = [0,0];
var level3screw = [0,0];
var level3wrench = [0,0];
var level4pliers = [0,0];
var level4screw = [0,0];
var level4wrench = [0,0];