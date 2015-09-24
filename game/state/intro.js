function intro() {

}

var introFinished = false;
var video;

intro.prototype = {
	create : function() {
		video = this.game.add.video('intro');

		video.play(true);

		video.loop = false;

		video.onComplete.add(handleComplete);

		video.addToWorld(400, 300, 0.5, 0.5);
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
		video.stop(true);
	}

	if (soundOn) {
		sound.play();
	}
}
