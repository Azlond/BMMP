function intro() {

}

intro.prototype = {
	create : function () {
		var startBackground = game.add.sprite(0, 0, 'startBackground'); // adds background
		startBackground.inputEnabled = true;
		startBackground.input.priorityID = 1;
		startBackground.input.useHandCursor = true;
		startBackground.events.onInputDown.add(startMenu, this);
	}
}


function startMenu () {
	
	game.state.start ('menu');
}

/*
var introFinished = false;
var video;

intro.prototype = {
	create : function() {
		video = this.game.add.video('intro');
		video.play(true);
		video.loop = false;
		video.onComplete.add(handleComplete);
		video.addToWorld(400, 300, 0.5, 0.5);
		game.input.keyboard.onUpCallback = function(e) {
			handleComplete();
		}
	}
}



function handleComplete() {
	if (!introFinished) {
		game.state.start('play');
		introFinished = true;
		video.stop(true);
		video.destroy();
	}
}
*/