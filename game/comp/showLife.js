function showLife (lifeCounter) {

  switch (lifeCounter) {

    case 3: life.frame = 2; break;
    case 2: life.frame = 1; break;
    case 1: life.frame = 0; break;
    default: life.kill(); break;

  }

}
