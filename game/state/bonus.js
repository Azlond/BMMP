function bonus() {
}

bonus.prototype = {

	create : function() {
		this.background = this.game.add.sprite(0, -9400, 'bonusLevelBackground');
		// this.background2 = this.game.add.sprite(0, 2 * (-9400), 'bonusLevelBackground');
		this.game.physics.arcade.enableBody(this.background);
		// this.game.physics.arcade.enableBody(this.background2);

		this.rocket = this.game.add.sprite((game.width / 2) - (123 / 2), 9400, 'bonusRocket');
		this.game.physics.arcade.enableBody(this.rocket);
		this.rocket.body.allowGravity = false;
		this.rocket.animations.add('empty', [ 0 ], 1, true);
		this.rocket.animations.play('empty');
		this.game.camera.follow(this.rocket);

		this.map = game.add.tilemap('bonusLevel');

		this.map.addTilesetImage('bonusLevel_tilemap', 'bonusLevel_tilemap');
		this.map.addTilesetImage('bonusLevel_tilemap_finish', 'bonusLevel_tilemap_finish');

		this.map.setCollisionBetween(1, 40);

		this.map.setTileIndexCallback(41, this.finish, this);

		this.layer = this.map.createLayer('Kachelebene 1');

		this.layer.resizeWorld();

	},

	update : function() {

		this.game.physics.arcade.collide(this.rocket, this.layer);
		this.rocket.body.velocity.y = -300;

		if (cursors.left.isDown) {
			this.rocket.body.velocity.x = -300;
		} else if (cursors.right.isDown) {
			this.rocket.body.velocity.x = 300;
		} else {
			if (this.rocket.body.velocity.x < 50 && this.rocket.body.velocity.x > -50) {
				this.rocket.body.velocity.x = 0;
			} else if (this.rocket.body.velocity.x < 0) {
				this.rocket.body.velocity.x += 5;
			} else if (this.rocket.body.velocity.x > 0) {
				this.rocket.body.velocity.x -= 5;
			}
		}

		if (this.rocket.body.y <= -100) {
			this.game.state.start('win');
		}

	},

	finish : function() {
		this.rocket.body.velocity.y -= 1000;
	}
};