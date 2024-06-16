export default class Start extends Phaser.Scene {
    constructor() {
        super({ key: "startScene" });
    }

    preload() {
        // Image
        this.load.image("startBackground", "./assets/start.png");

        // Sounds

    }

    create() {
        // Background
        this.add.image(300, 400, "startBackground");

        // Buttons
        this.createStartButton();

        // Sound
    }

    createStartButton() {
        const retryButton = this.add.text(300, 660, "start", {
            fontFamily: "BAD GRUNGE",
            fontSize: 70,
            color: "#ffff",
        });
        retryButton.setOrigin(0.5);
        retryButton.setInteractive();

        retryButton.on("pointerover", () => {
            retryButton.setFontSize(80);
        });

        retryButton.on("pointerout", () => {
            retryButton.setFontSize(70);
        });

        retryButton.on("pointerdown", () => {
            this.scene.start("gameScene");
        });
    }
}
