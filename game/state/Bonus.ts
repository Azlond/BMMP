export default class Bonus extends Phaser.State {
    /**
     * @description adds and invisible wall to the left side of the level, to make sure the player cannot exit to the left
     * @type {Phaser.Sprite}
     * @memberof Bonus
     */
    invisibleWallLeft: Phaser.Sprite;

    /**
     * @description adds and invisible wall to the right side of the level, to make sure the player cannot exit to the right
     * @type {Phaser.Sprite}
     * @memberof Bonus
     */
    invisibleWallRight: Phaser.Sprite;

    /**
     * @description Group containing the invisible walls
     * @type {Phaser.Group}
     * @memberof Bonus
     */
    wallGroup: Phaser.Group;

    /**
     * @description image of the rocket for the bonus level
     * @type {Phaser.Sprite}
     * @memberof Bonus
     */
    rocket: Phaser.Sprite;

    /**
     * @description TileMap of the bonus level
     * @type {Phaser.Tilemap}
     * @memberof Bonus
     */
    map: Phaser.Tilemap;

    cursors: Phaser.CursorKeys;

    layer: Phaser.TilemapLayer;

    scoreText: Phaser.Text;

    scoreElement: Phaser.Image;

    collisionTimer: number;

    started: boolean;

    infoText: Phaser.Text;

    enterKey: Phaser.Key;

    score: number;

    playerConfig: PlayerConfig;

    media: Media;

    activeAstronaut: number;

    collision() {
        if (this.game.time.now > this.collisionTimer) {
            this.score -= 10;
            this.scoreText.text = String(this.score);
            this.collisionTimer = this.game.time.now + 500;
        }
    }

    create() {
        /* Keyboard controls */
        this.cursors = this.game.input.keyboard.createCursorKeys();

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

        this.rocket = this.game.add.sprite((this.game.width / 2) - (123 / 2), 9400, 'bonusRocket');
        this.game.physics.arcade.enableBody(this.rocket);
        this.rocket.body.allowGravity = false;
        this.rocket.animations.add('empty', [0], 1, true);
        this.rocket.animations.play('empty');
        this.game.camera.follow(this.rocket);
        this.rocket.body.bounce.set(1.0);

        this.map = this.game.add.tilemap('bonusLevel');

        this.map.addTilesetImage('bonusLevel_tilemap', 'bonusLevel_tilemap');
        this.map.addTilesetImage('bonusLevel_tilemap_finish', 'bonusLevel_tilemap_finish');

        this.map.setCollisionBetween(1, 40);

        this.map.setTileIndexCallback(41, this.finish, this);

        this.layer = this.map.createLayer('Kachelebene 1');

        this.layer.resizeWorld();

        this.scoreText = this.game.add.text(45, 10, String(this.score), {
            font: '30px Raleway',
            fill: '#ffffff'
        });

        this.scoreElement = this.game.add.image(9, 10, 'elementScore');
        this.scoreElement.fixedToCamera = true;
        this.scoreText.fixedToCamera = true;

        this.collisionTimer = 0;

        this.started = false;

        this.infoText = this.game.add.text(this.game.width / 3, this.game.height / 10, 'Travel back to Earth \nAvoid the meteoroids \nPress ENTER to start', {
            font: '30px Raleway',
            fill: '#ffffff'
        });

        this.infoText.fixedToCamera = true;

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    }

    finish() {
        this.saveLocal();
        this.rocket.body.velocity.y -= 1000;
    }

    init(playerConfig: PlayerConfig, media: Media, activeAstronaut: number, score: number) {
        this.playerConfig = playerConfig;
        this.media = media;
        this.activeAstronaut = activeAstronaut;
        this.score = score;
    }

    parseJson(json: Array<[string, number]>) {
        const pName = this.playerConfig.name;
        let playerExists = false;

        if (json.length === 0) {
            json.push([pName, this.score]);
            localStorage.setItem('highScore', JSON.stringify(json));
        } else {
            for (let i = 0; i < json.length; i++) {
                const tArray = json[i];
                const highScoreName = tArray[0];
                const playerHighScore = tArray[1];

                if (highScoreName === pName) {
                    playerExists = true;
                    if (playerHighScore < this.score) {
                        json.splice(i, 1);
                        json.push([pName, this.score]);
                        localStorage.setItem('highScore', JSON.stringify(json));
                    }
                }
            }
            if (!playerExists) {
                json.push([pName, this.score]);
                localStorage.setItem('highScore', JSON.stringify(json));
            }
        }
    }

    saveLocal() {
        const scores: string = localStorage.getItem('highScore');
        let scoreArray = [];
        if (scores) {
            scoreArray = JSON.parse(scores);
        }
        this.parseJson(scoreArray);
    }

    update() {
        if (this.started) {
            this.game.physics.arcade.collide(this.rocket, this.layer, this.collision, null, this);
            this.game.physics.arcade.collide(this.rocket, this.wallGroup);

            //@ts-ignore
            if (this.cursors.left.isDown) {
                this.rocket.body.velocity.x = -300;
                //@ts-ignore
            } else if (this.cursors.right.isDown) {
                this.rocket.body.velocity.x = 300;
            } else if (this.rocket.body.velocity.x < 50 && this.rocket.body.velocity.x > -50) {
                this.rocket.body.velocity.x = 0;
            } else if (this.rocket.body.velocity.x < 0) {
                this.rocket.body.velocity.x += 5;
            } else if (this.rocket.body.velocity.x > 0) {
                this.rocket.body.velocity.x -= 5;
            }

            if (this.rocket.body.y <= -100) {
                this.game.state.start('win', false, false, this.playerConfig, this.media, this.activeAstronaut);
            }

            if (this.rocket.body.velocity.y !== -300 && this.game.time.now > this.collisionTimer) {
                this.rocket.body.velocity.y = -300;
            }
        } else if (this.enterKey.isDown) {
            this.infoText.kill();
            this.started = true;
            this.rocket.body.velocity.y = -300;
        }
    }
}
