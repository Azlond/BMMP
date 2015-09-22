function play() {}

var map;

play.prototype = {

	create : function() {

		cursors = game.input.keyboard.createCursorKeys();

//		var background = game.add.image(0,0,'background');
		
		this.map = this.add.tilemap('level1');
        this.map.addTilesetImage('tiles', 'tiles');

        this.layer = this.map.createLayer('Tile Layer 1');
        
//        var layer = map.createLayer('Tile Layer 1');

		
//		map.setCollision(20, true, layer);
		
	}

};