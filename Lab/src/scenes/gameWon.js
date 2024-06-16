export default class GameWon extends Phaser.Scene {
    constructor() {
        super({ key: "gameWonScene" });
    }

    preload() {
        // Image
        this.load.image("wonBackground", "./assets/won.png");

        // Sounds

        // Score
        this.score = this.registry.get("score");
        // High Score
        localStorage.setItem("highScore", this.score);
        this.highScore = localStorage.getItem("highScore");

    }

    create() {
        // Background
        this.add.image(300, 400, "wonBackground");

        // Score
        const scoreText = this.add.text(300, 540, "score: " + this.score, {
            fontFamily: "BAD GRUNGE",
            fontSize: 56,
            align: "center",
            color: "#ffdc97",
        });
        scoreText.setOrigin(0.5);

        // High Score
        const highScoreText = this.add.text(300, 590, "high score: " + this.highScore, {
            fontFamily: "BAD GRUNGE",
            fontSize: 50,
            align: "center",
            color: "#ffdc97",
        });
        highScoreText.setOrigin(0.5);


        // Buttons
        this.createRetryButton();
        this.createQuitButton();

        // Sound
    }

    createRetryButton() {
        const retryButton = this.add.text(300, 650, "retry", {
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

    createQuitButton() {
        const quitButton = this.add.text(300, 700, "quit", {
            fontFamily: "BAD GRUNGE",
            fontSize: 46,
            color: "#ffffff",
        });
        quitButton.setOrigin(0.5);
        quitButton.setInteractive();

        quitButton.on("pointerover", () => {
            quitButton.setFontSize(60);
        });

        quitButton.on("pointerout", () => {
            quitButton.setFontSize(46);
        });
    }
}
