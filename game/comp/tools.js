var Tools = function(game,x,y,frame) {

	this.game = game;

	Phaser.Sprite.call(this, this.game, x, y, 'tools',frame);

};

Tools.prototype = Object.create(Phaser.Sprite.prototype);
Tools.prototype.constructor = Tools;
