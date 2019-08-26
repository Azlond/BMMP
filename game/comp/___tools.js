var Tools = function(x, y, frame) {

	Phaser.Sprite.call(this, game, x, y, 'tools', frame);

	game.physics.arcade.enableBody(this);

};

Tools.prototype = Object.create(Phaser.Sprite.prototype);
Tools.prototype.constructor = Tools;

var toolLocations = {
	'level1PliersX' : 170,
	'level1PliersY' : 140,

	'level1ScrewX' : 1600,
	'level1ScrewY' : 153,

	'level1WrenchX' : 1108,
	'level1WrenchY' : 440,

	'level2PliersX' : 1400,
	'level2PliersY' : 120,

	'level2ScrewX' : 1940,
	'level2ScrewY' : 120,

	'level2WrenchX' : 3030,
	'level2WrenchY' : 120,

	'level3PliersX' : 1402,
	'level3PliersY' : 92,

	'level3ScrewX' : 3825,
	'level3ScrewY' : 185,

	'level3WrenchX' : 2850,
	'level3WrenchY' : 380,

	'level4PliersX' : 1379,
	'level4PliersY' : 55,

	'level4ScrewX' : 4148,
	'level4ScrewY' : 25,

	'level4WrenchX' : 3149,
	'level4WrenchY' : 125
}