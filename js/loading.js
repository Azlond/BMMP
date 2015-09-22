var loading = function(game) {
};

loading.prototype = {
preload : function() {
		this.game.load.image('background', './assets/background.png');
	}
}

function create() {
	this.game.state.start("Menu");
}