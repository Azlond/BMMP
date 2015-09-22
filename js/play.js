function play() {}

play.prototype = {

	create : function() {

		cursors = game.input.keyboard.createCursorKeys();

//		var background = game.add.image(0,0,'background');
		
		var map = game.add.tilemap('level1');
        map.addTilesetImage('tiles', 'tiles');
        
        var layer = map.createLayer('Tile Layer 1');

		
//		map.setCollision(20, true, layer);
		
	}

};