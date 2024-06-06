import Laser from "/Lab/src/classes/laser.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemyTexture, laserTexture) {
        super(scene, x, y, enemyTexture);

        this.scene = scene;
        this.enemyTexture = enemyTexture;
        this.laserTexture = laserTexture;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.move();

        this.fire();
    }

    move() {
        const speed = Phaser.Math.Between(1000, 5000);

        this.scene.tweens.add({
            targets: this,
            y: 800,
            duration: speed,
            onComplete: () => {
                this.destroy(true);
            },
        });
    }

    fire() {
        //const delay = Phaser.Math.Between(500, 10000);
        this.scene.time.delayedCall(
            1000,
            () => {
                new Laser(this.scene, this.x, this.y + 30, this.laserTexture, 1000);
                console.log("Enemy Fired!!!");
            },
            null,
            this
        );
    }
}
