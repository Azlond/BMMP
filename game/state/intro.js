function intro() {

}

var introFinished = false;

intro.prototype = {
	create : function() {
		this.video = this.game.add.video('intro');

		this.video.play(true);

		this.video.loop = false;

		this.video.onComplete.add(handleComplete);

		this.video.addToWorld(400, 300, 0.5, 0.5);
	},

	update : function() {
		if ((this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)).isDown) {
			handleComplete();
		}
	}

}

function handleComplete() {
	if (!introFinished) {
		game.state.start('play');
		introFinished = true;
	}
}
