function bonus() {
}

bonus.prototype = {

	create : function() {
		this.game.add.image(0, 0, 'bonusLevelBackground');
		this.invisibleWallLeft = this.game.add.sprite(-25, 0, 'invisWall');
		this.game.physics.arcade.enableBody(this.invisibleWallLeft);
		this.invisibleWallLeft.body.allowGravity = false;
		this.invisibleWallLeft.body.immovable = true;
		this.invisibleWallLeft.fixedToCamera = true;

		this.invisibleWallRight = this.game.add.sprite(810, 0, 'invisWall');
		this.game.physics.arcade.enableBody(this.invisibleWallRight);
		this.invisibleWallRight.body.allowGravity = false;
		this.invisibleWallRight.body.immovable = true;
		this.invisibleWallRight.fixedToCamera = true;

		this.wallGroup = this.game.add.group();
		this.wallGroup.add(this.invisibleWallLeft);
		this.wallGroup.add(this.invisibleWallRight);

		this.rocket = this.game.add.sprite((game.width / 2) - (123 / 2), 9400, 'bonusRocket');
		this.game.physics.arcade.enableBody(this.rocket);
		this.rocket.body.allowGravity = false;
		this.rocket.animations.add('empty', [ 0 ], 1, true);
		this.rocket.animations.play('empty');
		this.game.camera.follow(this.rocket);
		this.rocket.body.bounce.set(1.0);

		this.map = game.add.tilemap('bonusLevel');

		this.map.addTilesetImage('bonusLevel_tilemap', 'bonusLevel_tilemap');
		this.map.addTilesetImage('bonusLevel_tilemap_finish', 'bonusLevel_tilemap_finish');

		this.map.setCollisionBetween(1, 40);

		this.map.setTileIndexCallback(41, this.finish, this);

		this.layer = this.map.createLayer('Kachelebene 1');

		this.layer.resizeWorld();

		this.scoreText = game.add.text(0, 0, 'Score: ' + score, {
			font : '30px Courier',
			fill : '#ffffff'
		});

		this.scoreText.fixedToCamera = true;

		this.collisionTimer = 0;

		this.started = false;

		this.infoText = game.add.text(game.width / 4, game.height / 10, "Travel back to Earth \nAvoid the meteoroids \nPress ENTER to start", {
			font : '30px Courier',
			fill : '#ffffff'
		});

		this.infoText.fixedToCamera = true;

		this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},

	update : function() {

		if (this.started) {

			this.game.physics.arcade.collide(this.rocket, this.layer, this.collision, null, this);
			this.game.physics.arcade.collide(this.rocket, this.wallGroup);

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

			if (this.rocket.body.velocity.y != -300 && this.game.time.now > this.collisionTimer) {
				this.rocket.body.velocity.y = -300
			}
		} else {
			if (this.enterKey.isDown) {
				this.infoText.kill();
				this.started = true;
				this.rocket.body.velocity.y = -300;
			}
		}

	},

	collision : function() {
		if (this.game.time.now > this.collisionTimer) {
			score -= 1;
			this.scoreText.text = 'Score: ' + score;
			this.collisionTimer = game.time.now + 500;
		}
	},

	finish : function() {
		this.rocket.body.velocity.y -= 1000;
	}
};