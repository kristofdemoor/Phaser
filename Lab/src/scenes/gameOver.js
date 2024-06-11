export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "gameOverScene" });
    }

    preload() {
        this.load.audio("gameover", "./assets/sounds/gameover.mp3");
    }

    create() {
        this.add.text(100, 200, "GAME OVER", {
            fontFamily: "DS-Digital",
            fontSize: 100,
            color: "#a0a0a0",
        });

        this.time.delayedCall(
            1000,
            () => {
                this.sound.add("gameover").play();
            },
            null,
            this
        );
    }
}
