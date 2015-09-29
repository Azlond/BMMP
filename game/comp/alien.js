var Alien = function(game, x, y, distance) {

	this.game = game;
	this.distance = distance;

	this.pathCounter = 0;

	Phaser.Sprite.call(this, this.game, x, y, 'alien');

	this.game.physics.arcade.enableBody(this);

	this.body.collideWorldBounds = false;
	this.body.velocity.x = 50

};

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

var aliens = {
	"level1" : {
		"amount" : 2,
		"coordinates" : {
			"alien1" : [ 600, 450, 250 ], // x, y, distance
			"alien2" : [ 1800, 450, 250 ]
		}
	},
	"level2" : {
		"amount" : 5,
		"coordinates" : {
			"alien1" : [ 740, 450, 260 ],
			"alien2" : [ 1050, 450, 400 ],
			"alien3" : [ 1230, 220, 280 ],
			"alien4" : [ 2570, 200, 210 ],
			"alien5" : [ 3600, 265, 150 ]
		}
	},
	"level3" : {
		"amount" : 3,
		"coordinates" : {
			"alien1" : [ 700, 350, 250 ],
			"alien2" : [ 1600, 350, 250 ],
			"alien3" : [ 1108, 350, 250 ]
		}
	},
	"level4" : {
		"amount" : 3,
		"coordinates" : {
			"alien1" : [ 700, 350, 250 ],
			"alien2" : [ 1600, 350, 250 ],
			"alien3" : [ 1108, 350, 250 ]
		}
	}

};
