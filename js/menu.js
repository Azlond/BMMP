var menu = function(game) {}

menu.prototype = {
	create : function() {
		this.game.add.sprite(0, 0, 'background');
		var button = this.game.add.button(this.game.world.centerX - 95, 400,
				'button', this.actionOnClick, this, 2, 1, 0);
	},

	actionOnClick : function() {
		this.game.state.start("Game");
	}

}
