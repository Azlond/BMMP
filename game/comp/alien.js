var Alien = function(game, x, y, pathCounter, name) {

	this.game = game;
	this.name = name;
	
	this.pathCounter = pathCounter;

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
			"alien1" : [ 600, 350 ],
			"alien2" : [ 1800, 350 ]
		}
	},
	"level2" : {
		"amount" : 3,
		"coordinates" : {
			"alien1" : [ 600, 350 ],
			"alien2" : [ 1600, 350 ],
			"alien3" : [ 1108, 350 ]
		}
	},
	"level3" : {
		"amount" : 3,
		"coordinates" : {
			"alien1" : [ 700, 350 ],
			"alien2" : [ 1600, 350 ],
			"alien3" : [ 1108, 350 ]
		}
	},
	"level4" : {
		"amount" : 3,
		"coordinates" : {
			"alien1" : [ 700, 350 ],
			"alien2" : [ 1600, 350 ],
			"alien3" : [ 1108, 350 ]
		}
	}

};
