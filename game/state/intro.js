function intro() {

}

var introFinished = false;
var video;

intro.prototype = {
	create : function() {
		
		game.add.sprite(0, 0, 'startBackground'); // adds background

		// Game Title TODO: Maybe change this to an image later on, to match better with the background.
		// var nameLabel = game.add.text(game.world.centerX - 175, 25,'Game Title', { font : '75px Arial', fill : '#ffffff' });

		startButton = game.add.button(game.world.centerX - 46.5, 485, 'start_button', startIntro, this, 1); //button to start the game	
	}
}

function startIntro () {
	
	video = this.game.add.video('intro');
	video.play(true);
	video.loop = false;
	video.onComplete.add(handleComplete);
	video.addToWorld(400, 300, 0.5, 0.5);
	game.input.keyboard.onUpCallback = function(e) {
		handleComplete();
	}
}

function handleComplete() {
	if (!introFinished) {
		game.state.start('menu');
		introFinished = true;
		video.stop(true);
		video.destroy();
	}
}
