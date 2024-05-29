import Parallax from "/Lab/src/classes/parallax.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    preload() {
        // Load x-wing spritesheet
        this.load.spritesheet("x-wing", "./assets/spritesheet.png", { frameWidth: 80, frameHeight: 105 });
    }

    create() {
        // Background parallex animation
        this.parallax = new Parallax(this);
        this.parallax.generateStars();

        // x-wing animation
        const config = {
            key: "x-wing-animation",
            frames: this.anims.generateFrameNumbers("x-wing"),
            frameRate: 10,
            repeat: -1
        };

        this.anims.create(config);
        const xWingSprite = this.add.sprite(300, 500, "x-wing");
        xWingSprite.play("x-wing-animation");

    }

    update() {
    }
}