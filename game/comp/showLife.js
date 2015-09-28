function showLife (lifeCounter) {
	
	if (lifeCounter == 3){
	life = game.add.sprite(735, 6, 'lifeCounter');
	life.fixedToCamera = true;
	} else {
		life.kill();
		life = game.add.sprite(735, 6, 'lifeCounter');
		life.fixedToCamera = true;
	}
	
	//life.frame = 3;
	console.log ("here comes the life");
 	
	switch (lifeCounter) {

    case 3: 	life.frame = 0; break;
	case 2: 	life.frame = 1; break;
	case 1: 	life.frame = 2; break;
	case 0: 	life.frame = 3; break;
    default: 	life.kill(); break;

  }

}
