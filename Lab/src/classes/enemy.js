export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemyTexture) {
        super(scene, x, y, enemyTexture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.move();
    }

    move() {
        const speed = Phaser.Math.Between(1000, 5000);

        this.scene.tweens.add({
            targets: this,
            y: 850,
            duration: speed,
            onComplete: () => {
                this.destroy(true);
            },
        });
    }
}
