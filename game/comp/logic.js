function logic(game, astronaut, layer, alien, cursors, jumpTimer) {
	this.game.physics.arcade.collide(astronaut, layer);
	this.game.physics.arcade.collide(astronaut, alien, collideWithAlien, null, this);

	/*
	 * from http://phaser.io/examples/v2/arcade-physics/platformer-tight
	 */
	if (cursors.left.isDown) {
		astronaut.body.velocity.x = -175;
		astronaut.animations.play('walk', 7, true);
		astronaut.scale.x = -1;
	} else if (cursors.right.isDown) {
		astronaut.body.velocity.x = 175;
		astronaut.scale.x = 1;
		astronaut.animations.play('walk', 7, true);
	} else {
		astronaut.body.velocity.x = 0;
		astronaut.animations.play('stop', 7, true);
	}

	if (cursors.up.isDown && astronaut.body.onFloor() && game.time.now > jumpTimer) {
		astronaut.body.velocity.y = -700;
		jumpTimer = game.time.now + 750;
	}
}

function hitCoin(astronaut, tile) {

	map.removeTile(tile.x, tile.y, layer);

	score += 1;
	scoreText.text = 'Score: ' + score;

	return false;

}

function hitFinish(astronaut, finish) {
	console.log("Level finished!");
	levelNumber += 1;
	loadLevel(levelNumber, astronaut);
}

function collideWithAlien(astronaut, alien) {

	lifeCounter--;
	if (lifeCounter <= 3 && lifeCounter > 0) {
		console.log(lifeCounter);
	}
	if (lifeCounter <= 0) {
		console.log("LOSE");
	}

}