export default class GameWon extends Phaser.Scene {
    constructor() {
        super({ key: "gameWonScene" });
    }

    preload() {
        // Image
        this.load.image("background", "./assets/won.png");

        // Sounds

        this.score = this.registry.get("score");
    }

    create() {
        // Background
        this.add.image(300, 400, "background");

        // Score
        const scoreText = this.add.text(230, 520, "score: " + this.score, {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            align: "center",
            color: "#a0a0a0",
        });

        console.log(scoreText.width);

        // Buttons
        this.createRetryButton();
        this.createQuitButton();

        // Sound
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
