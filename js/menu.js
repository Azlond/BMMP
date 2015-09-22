var menu = function(game) {
};

menu.prototype = {

	preload : function() {
		this.game.load.image('background', './assets/background.png');
	},

	create : function() {
		this.game.add.sprite(0, 0, 'background');
	}
}