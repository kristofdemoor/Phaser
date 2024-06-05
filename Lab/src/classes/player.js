import Laser from "/Lab/src/classes/laser.js";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spritesheet, lazerTexture) {
        super(scene, x, y, spritesheet);

        // Variables
        this.lazerTexture = lazerTexture;
        this.speed = 500;

        // Add sprite to the scene
        scene.add.existing(this);

        // Add phisics to sprite
        scene.physics.add.existing(this);

        // Sprite collides with world bounds
        this.body.setCollideWorldBounds(true);


        // Bullet group
        this.bullets = scene.physics.add.group({
            classType: Laser,
            maxSize: 3,
            runChildUpdate: true
        });

        // this.scene = scene;

        // player x-wing animation
        const config = {
            key: "x-wing-animation",
            frames: scene.anims.generateFrameNumbers(spritesheet),
            frameRate: 10,
            repeat: -1,
        };

        this.scene.anims.create(config);
        //this.body = this.scene.physics.add.sprite(x, y, spritesheet);
        //this.body.play("x-wing-animation");
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
        this.bullets.get(this.x, this.y - 65, this.lazerTexture);
    }
}
