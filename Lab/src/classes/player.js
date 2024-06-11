import Laser from "/Lab/src/classes/laser.js";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spritesheet, laserTexture) {
        super(scene, x, y, spritesheet);

        // Variables
        this.laserTexture = laserTexture;
        this.speed = 500;
        this.score = 0;
        this.lives = 3;
        this.invincible = false;

        // Add sprite to the scene
        scene.add.existing(this);

        // Add phisics to sprite
        scene.physics.add.existing(this);

        // Sprite collides with world bounds
        this.body.setCollideWorldBounds(true);

        // Laser group
        this.lasers = scene.physics.add.group({
            classType: Laser,
            maxSize: 2,
            runChildUpdate: true,
        });

        // player x-wing animation
        const config = {
            key: "x-wing-animation",
            frames: scene.anims.generateFrameNumbers(spritesheet),
            frameRate: 10,
            repeat: -1,
        };

        this.scene.anims.create(config);
        this.play("x-wing-animation");
    }

    moveLeft() {
        this.body.setVelocityX(-this.speed);
    }

    moveRight() {
        this.body.setVelocityX(this.speed);
    }

    stop() {
        this.body.setVelocityX(0);
    }

    fire() {
        const laser = this.lasers.get(this.x, this.y - 65, this.laserTexture, -1);
        // Only add laser to group and play sound if there is a laser available
        if (laser) {
            this.scene.playerLasers.add(laser);
            this.scene.laserSound.play();
        }
    }

    respawn() {
        this.setVisible(false);
        this.invincible = true;
        // Flicker
        this.scene.time.delayedCall(1000, () => {
            this.x = 300;
            this.y = 580;
            this.setVisible(true);
            this.scene.add.tween({
                targets: this,
                duration: 80,
                alpha: 0,
                yoyo: true,
                repeat: 20,
                onComplete: () => {
                    this.invincible = false;
                },
            });
        });
    }
}
