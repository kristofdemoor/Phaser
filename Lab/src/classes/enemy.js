export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, enemyTexture) {
        super(scene, x, y, enemyTexture);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}