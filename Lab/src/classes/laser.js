export default class Laser extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, destination) {
        super(scene, x, y, texture);

        scene.add.existing(this);

        scene.physics.add.existing(this);

        scene.tweens.add({
            targets: this,
            y: destination,
            //duration: 1500,
            ease: "Linear",
            onComplete: () => {
                // remove gameobject from scene and memory
                this.destroy(true);
            },
        });

    }
}