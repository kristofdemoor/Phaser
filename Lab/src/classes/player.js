export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spritesheet, lazerImage) {
        super(scene, x, y, spritesheet);

        this.scene = scene;
        this.lazerImage = lazerImage;
        this.speed = 5;

        // player x-wing animation
        const config = {
            key: "x-wing-animation",
            frames: this.scene.anims.generateFrameNumbers(spritesheet),
            frameRate: 10,
            repeat: -1,
        };

        this.scene.anims.create(config);
        this.body = this.scene.physics.add.sprite(x, y, spritesheet);
        this.body.play("x-wing-animation");
        this.body.setCollideWorldBounds(true);
    }

    moveLeft() {
        this.body.x -= this.speed;
    }

    moveRight() {
        this.body.x += this.speed;
    }

    fire() {
        new Laser(this.scene, this.body.x, this.body.y, this.lazerImage);
    }
}

class Laser extends Phaser.GameObjects.Image {
    constructor(scene, x, y, lazerImage) {
        super(scene, x, y, lazerImage);

        const offset = 65;
        const laser = this.scene.physics.add.image(x, y - offset, lazerImage);

        scene.tweens.add({
            targets: laser,
            y: { from: y - offset, to: -810 },
            duration: 1000,
            onComplete: () => {
                // remove gameobject from scene and memory
                this.destroy(true);
            },
        });
    }
}
