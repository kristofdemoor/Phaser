export default class Start extends Phaser.Scene {
    constructor() {
        super({ key: "startScene" });
    }

    preload() {
        // Image
        this.load.image("startBackground", "./assets/start.png");

        // Sounds
        this.load.audio("startTheme", "./assets/sounds/startTheme.mp3");
    }

    create() {
        // Background
        this.add.image(300, 400, "startBackground");

        // Buttons
        this.createStartButton();

        // Sound
        this.themeSound = this.sound.add("startTheme", { loop: true });
        this.themeSound.play();
    }

    createStartButton() {
        const startButton = this.add.text(300, 660, "start", {
            fontFamily: "BAD GRUNGE",
            fontSize: 70,
            color: "#ffff",
        });
        startButton.setOrigin(0.5);
        startButton.setInteractive();

        startButton.on("pointerover", () => {
            startButton.setFontSize(80);
        });

        startButton.on("pointerout", () => {
            startButton.setFontSize(70);
        });

        startButton.on("pointerdown", () => {
            this.themeSound.stop();
            this.scene.start("gameScene");
        });
    }
}
