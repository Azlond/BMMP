var counter = 0;

function timeDown () {
  var countdown = 1000;
  timer = game.time.create(false);
  timer.loop(countdown, changeDisplay, this);
  timer.start ();
}

function changeDisplay () {
    if (oxygenCounter === 9) {
        oxygenTank.frame = 0;
        console.log(oxygenCounter);
        --oxygenCounter;		
    } else if (oxygenCounter === 8) {
        oxygenTank.frame = 1;
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 7) {
        oxygenTank.frame = 2;
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 6) {
        oxygenTank.frame = 3;
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 5) {
        oxygenTank.frame = 4;
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 4) {
        oxygenTank.frame = 5;
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 3) {
        oxygenTank.animations.add('blink1', [6, 9], 5, true);
        oxygenTank.animations.play('blink1');
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 2) {
        oxygenTank.animations.add('blink2', [7, 9], 5, true);
        oxygenTank.animations.play('blink2');
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 1) {
        oxygenTank.animations.add('blink3', [8, 9], 5, true);
        oxygenTank.animations.play('blink3');
        console.log(oxygenCounter);
        --oxygenCounter;
    } else if (oxygenCounter === 0) {
        oxygenTank.animations.stop();
		oxygenTank.frame = 9;
        console.log(oxygenCounter);
		--lifeCounter;
    } else {
        this.timer.stop();
    }
}