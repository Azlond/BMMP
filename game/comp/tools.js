var Tools = function(game,x,y,frame) {

	this.game = game;

	Phaser.Sprite.call(this, this.game, x, y, 'tools',frame);

	this.game.physics.arcade.enableBody(this);

};

Tools.prototype = Object.create(Phaser.Sprite.prototype);
Tools.prototype.constructor = Tools;

//var level1pliers = [115,124];
var level1pliers = [115,409];
var level1screw = [1600, 153];
var level1wrench = [1108,440];
var level2pliers = [115,409];
var level2screw = [0,409];
var level2wrench = [0,409];
var level3pliers = [0,409];
var level3screw = [0,409];
var level3wrench = [0,409];
var level4pliers = [0,409];
var level4screw = [0,409];
var level4wrench = [0,409];