var Tools = function(game, x, y, frame) {

	this.game = game;

	Phaser.Sprite.call(this, this.game, x, y, 'tools', frame);

	this.game.physics.arcade.enableBody(this);

};

Tools.prototype = Object.create(Phaser.Sprite.prototype);
Tools.prototype.constructor = Tools;

var level1pliers = [ 115, 124 ];
var level1screw = [ 1600, 153 ];
var level1wrench = [ 1108, 440 ];
var level2pliers = [ 1400, 120 ];
var level2screw = [ 1940, 120 ];
var level2wrench = [ 3030, 120 ];
var level3pliers = [ 1402, 92 ];
var level3screw = [ 3825, 185 ];
var level3wrench = [ 2850, 380 ];
var level4pliers = [ 1379, 55 ];
var level4screw = [ 4148, 25 ];
var level4wrench = [ 3149, 125 ];