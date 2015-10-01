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
		 "amount" : 3,
		 "coordinates" : {
			 "oxygen1" : [ 90, 140],
			 "oxygen2" : [ 1405, 224 ],
			 "oxygen3" : [ 1760, 305 ]

		}
	},
 "level2" :  {
	 "amount" : 5,
	 "coordinates" : {
		 "oxygen1" : [ 1008, 256],
		 "oxygen2" : [ 1749, 416 ],
		 "oxygen3" : [ 2096, 32 ],
		 "oxygen4" : [ 3330, 416 ],
		 "oxygen5" : [ 4269, 416 ]

	}
},
 "level3" :  {
	 "amount" : 5,
	 "coordinates" : {
		 "oxygen1" : [ 1291, 64],
		 "oxygen2" : [ 3003, 416 ],
		 "oxygen3" : [ 1370, 416 ],
		 "oxygen4" : [ 3960, 416 ],
		 "oxygen5" : [ 2052, 416 ]

	}

},
 "level4" :  {
	 "amount" : 3,
	 "coordinates" : {
		 "oxygen1" : [ 43, 32],
		 "oxygen2" : [ 2175, 416 ],
		 "oxygen3" : [ 3146, 256 ]

	}
}
};
