export default class Generator {
    constructor(scene) {
        this.scene = scene;
        //this.scene.time.delayedCall(1000, () => this.init(), null, this);
    }

    init() {
        this.generateStars();
    }

    generateStars() {
        // create 1000 random stars
        for (let i = 0; i < 1500; i++) {
            new Star(this.scene);
        }

    }
}


// Class to create a star with a random x, y, radius and alpha;
class Star extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        this.fillStyle(0xFFFFFF, Phaser.Math.FloatBetween(0.2, 1.0));
        //this.fillCircle(Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 800), Phaser.Math.Between(1, 2));
        this.fillCircle(Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 800), Phaser.Math.FloatBetween(0.5, 1.8));
        scene.add.existing(this);
    }
} 