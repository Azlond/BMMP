var oxygen = function (game, x, y) {
	this.game = game;
	Phaser.Sprite.call(this, this.game, x, y, 'oxygen');
	this.game.physics.arcade.enableBody(this);
	this.body.allowGravity = false;
	
	
}

oxygen.prototype = Object.create(Phaser.Sprite.prototype);
oxygen.prototype.constructor = oxygen;

var oxygens = {
	 "level1" :  {
		 "amount" : 2,
		 "coordinates" : {
			 "oxygen1" : [ 300, 400],
			 "oxygen2" : [ 1800, 350 ]
		}
	}, 
 "level2" :  {
	 "amount" : 2,
	 "coordinates" : {
		 "oxygen1" : [ 300, 400],
		 "oxygen2" : [ 1800, 350 ]
	}
},
 "level3" :  {
	 "amount" : 2,
	 "coordinates" : {
		 "oxygen1" : [ 300, 400],
		 "oxygen2" : [ 1800, 350 ]
	}
}, 
 "level4" :  {
	 "amount" : 2,
	 "coordinates" : {
		 "oxygen1" : [ 300, 400],
		 "oxygen2" : [ 1800, 350 ]
	}
}
};
