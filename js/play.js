/*
 * Play state - where the main action happens.
 * Levels, Player, Collectables and Enemy interactions are happening here
 */

function play() {
}

var map; // tilemap, for the platforms
var player; // the player char itself

play.prototype = {

	create : function() {

		// Physics for the platforms
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Keyboard controls
		cursors = game.input.keyboard.createCursorKeys();

		// the background of the first level
		var background = game.add.image(0, 0, 'background');

		/*
		 * adds the tile map to the game !!tilemap json files need to be created
		 * with the csv preset and not base64 compressed, or this won't work!!
		 */
		var map = game.add.tilemap('level1');

		// the second parameter needs to be the same as the one used in
		// loading.js
		map.addTilesetImage('fmap-tiles', 'fmap-tiles');

		// map.setCollisionBetween(1, 12);

		// the parameter can be found in the json file
		var layer = map.createLayer('world1');

		// This resizes the game world to match the layer dimensions
		layer.resizeWorld();

		/*
		 * adds the character
		 */
		player = game.add.sprite(25, 320, 'char');
		game.physics.enable(player, Phaser.Physics.ARCADE);

	},

	update : function() {

		/*
		 * TODO: Implement movement
		 */

	}

};