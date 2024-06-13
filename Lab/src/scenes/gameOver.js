export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "gameOverScene" });
    }

    preload() {
        // Image
        this.load.image("background", "./assets/gameover.png");

        // Sounds
        this.load.audio("gameOverVoice", "./assets/sounds/gameover.mp3");
    }

    create() {
        // Background
        this.add.image(300, 400, "background");

        // Buttons
        this.createRetryButton();
        this.createQuitButton();

        // Sound
        this.time.delayedCall(
            1000,
            () => {
                this.sound.add("gameOverVoice").play();
            },
            null,
            this
        );
    }

    createRetryButton() {
        const retryButton = this.add.text(270, 600, "retry", {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            color: "#ffffff",
        });
        retryButton.setInteractive();

        retryButton.on("pointerover", () => {
            retryButton.setX(261);
            retryButton.setY(590);
            retryButton.setFontSize(70);
        });

        retryButton.on("pointerout", () => {
            retryButton.setX(270);
            retryButton.setY(600);
            retryButton.setFontSize(56);
        });

        retryButton.on("pointerdown", () => {
            this.scene?.start("gameScene");
        });
    }

    createQuitButton() {
        const quitButton = this.add.text(285, 660, "quit", {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            color: "#ffffff",
        });
        quitButton.setInteractive();

        quitButton.on("pointerover", () => {
            quitButton.setX(278);
            quitButton.setY(650);
            quitButton.setFontSize(70);
        });

        quitButton.on("pointerout", () => {
            quitButton.setX(285);
            quitButton.setY(660);
            quitButton.setFontSize(56);
        });
    }
}
