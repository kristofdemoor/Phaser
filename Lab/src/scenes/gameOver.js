export default class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: "gameOverScene" });
    }

    preload() {
        // Image
        this.load.image("gameOverBackground", "./assets/gameover.png");

        // Sounds
        this.load.audio("gameOverVoice", "./assets/sounds/gameOverVoice.mp3");
        this.load.audio("gameOverTheme", "./assets/sounds/gameOverTheme.mp3");
    }

    create() {
        // Background
        this.add.image(300, 400, "gameOverBackground");

        // Buttons
        this.createRetryButton();
        this.createQuitButton();

        // Sound
        this.time.delayedCall(
            1000,
            () => {
                this.sound.add("gameOverVoice").setVolume(150).play();
                this.themeSound = this.sound.add("gameOverTheme");
                this.themeSound.play();
            },
            null,
            this
        );
    }

    createRetryButton() {
        const retryButton = this.add.text(300, 625, "retry", {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            color: "#ffffff",
        });
        retryButton.setOrigin(0.5);
        retryButton.setInteractive();

        retryButton.on("pointerover", () => {
            retryButton.setFontSize(70);
        });

        retryButton.on("pointerout", () => {
            retryButton.setFontSize(56);
        });

        retryButton.on("pointerdown", () => {
            this.themeSound.stop();
            this.scene.start("gameScene");
        });
    }

    createQuitButton() {
        const quitButton = this.add.text(300, 680, "quit", {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            color: "#ffffff",
        });
        quitButton.setOrigin(0.5);
        quitButton.setInteractive();

        quitButton.on("pointerover", () => {
            quitButton.setFontSize(70);
        });

        quitButton.on("pointerout", () => {
            quitButton.setFontSize(56);
        });
    }
}
