var controlButton = function (game, x, y, frame, option) {
	this.game = game;
	Phaser.Sprite.call(this, this.game, x, y, 'controlSound', frame);
	this.inputEnabled = true;
	this.input.priorityID = 1;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(option, this);
};
controlButton.prototype = Object.create(Phaser.Sprite.prototype);
controlButton.prototype.constructor = controlButton;

var closeButton = function (game, frame) { 
	this.game = game;
	Phaser.Sprite.call(this, this.game, -300, 485, 'doneButton', frame);
	this.inputEnabled = true;
	this.input.priorityID = 1;
	this.input.useHandCursor = true;
	this.events.onInputDown.add(closeWindow, this);
	
};
closeButton.prototype = Object.create(Phaser.Sprite.prototype);
closeButton.prototype.constructor = closeButton;