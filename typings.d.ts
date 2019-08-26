interface PlayerConfig {
    name: string;
    sound: {
        musicOn: boolean;
        soundOn: boolean;
    }
}

interface Media {
    backgroundMusic: Phaser.Sound,
    buttonSound: Phaser.Sound
    collectElementSound: Phaser.Sound,
    collectOxygenSound: Phaser.Sound,
    collectToolSound: Phaser.Sound,
    collideWithAlienSound: Phaser.Sound,
    completeLevelSound: Phaser.Sound,
    gameOverSound: Phaser.Sound,
    loseLifeSound: Phaser.Sound,
}
