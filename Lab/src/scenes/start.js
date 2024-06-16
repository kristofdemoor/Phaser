export default class Start extends Phaser.Scene {
    constructor() {
        super({ key: "startScene" });
    }

    preload() {
        // Image
        this.load.image("wonBackground", "./assets/won.png");

        // Sounds

    }

    create() {
        // Background
        this.add.image(300, 400, "wonBackground");

        // Score
        const scoreText = this.add.text(300, 540, "score: " + this.score, {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            align: "center",
            color: "#a0a0a0",
        });
        scoreText.setOrigin(0.5);

        // Buttons
        this.createStartButton();

        // Sound
    }

    createStartButton() {
        const retryButton = this.add.text(300, 650, "start", {
            fontFamily: "BAD GRUNGE",
            fontSize: 46,
            color: "#ffffff",
        });
        retryButton.setOrigin(0.5);
        retryButton.setInteractive();

        retryButton.on("pointerover", () => {
            retryButton.setFontSize(60);
        });

        retryButton.on("pointerout", () => {
            retryButton.setFontSize(46);
        });

        retryButton.on("pointerdown", () => {
            this.scene.start("gameScene");
        });
    }
}
