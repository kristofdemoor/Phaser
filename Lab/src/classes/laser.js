export default class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, direction) {
        super(scene, x, y, texture);

        this.direction = direction;
        this.speed = 1000;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Beter to use setVelocity
        // scene.tweens.add({
        //     targets: this,
        //     y: destination,
        //     //duration: 1500,
        //     ease: "Linear",
        //     onComplete: () => {
        //         // remove gameobject from scene and memory
        //         this.destroy(true);
        //     },
        // });
    }

    update() {
        // Move laser
        this.setVelocityY(this.speed * this.direction);
        // Destroy laser when it goes out of bounds
        if (this.y < 0 || this.y > this.scene.game.config.height) {
            this.destroy();
        }
    }
}