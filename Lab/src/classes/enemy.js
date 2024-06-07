import Laser from "/Lab/src/classes/laser.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemyTexture, laserTexture) {
        super(scene, x, y, enemyTexture);

        this.scene = scene;
        this.enemyTexture = enemyTexture;
        this.laserTexture = laserTexture;

        // Random number which is used to determine when to fire a laser
        this.randomY = Phaser.Math.Between(0, 200);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Bullet group
        this.lasers = scene.physics.add.group({
            classType: Laser,
            //maxSize: 2,
            runChildUpdate: true
        });

        this.move();
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
        const laser = this.lasers.get(this.x, this.y + 30, this.laserTexture, 1);
        this.scene.enemyLasers.add(laser);
    }
}
