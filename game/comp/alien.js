var Alien = function(x, y, distance) {

	this.distance = distance;
	this.turnLTimer = 0;
	this.timerLSet = false;
	this.turnRTimer = 0;
	this.timerRSet = false;

	this.pathCounter = 0;

	Phaser.Sprite.call(this, game, x, y, 'alien');

	game.physics.arcade.enableBody(this);

	this.body.collideWorldBounds = false;
	this.body.velocity.x = 50;

};

Alien.prototype = Object.create(Phaser.Sprite.prototype);
Alien.prototype.constructor = Alien;

var aliens = {
	"level1" : {
		"amount" : 0,
		"coordinates" : {}
	},
	"level2" : {
		"amount" : 5,
		"coordinates" : {
			"alien1" : [ 740, 450, 265 ],
			"alien2" : [ 1050, 450, 400 ],
			"alien3" : [ 1230, 220, 290 ],
			"alien4" : [ 2570, 200, 210 ],
			"alien5" : [ 3600, 265, 150 ]
		}
	},
	"level3" : {
		"amount" : 5,
		"coordinates" : {
			"alien1" : [ 740, 450, 185 ],
			"alien2" : [ 1060, 450, 135 ],
			"alien3" : [ 1610, 450, 165 ],
			"alien4" : [ 2500, 150, 300 ],
			"alien5" : [ 3570, 300, 230 ]
		}
	},
	"level4" : {
		"amount" : 3,
		"coordinates" : {
			"alien1" : [ 700, 350, 250 ],
			"alien2" : [ 2850, 150, 220 ],
			"alien3" : [ 3800, 450, 250 ]
		}
	}

};
