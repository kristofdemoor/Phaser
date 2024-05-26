export default class Generator {
    constructor(scene) {
        this.scene = scene;
        this.scene.time.delayedCall(1000, () => this.init(), null, this);
    }

    init() {
        this.generateStars();
    }

    generateStars() {
        // TO DO: generate stars
        new Star(this.scene);
    }
}

class Star extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        this.fillStyle(0xFFFFFF, 1.0);
        this.fillCircle(Phaser.Math.Between(0, 500), Phaser.Math.Between(0, 800), Phaser.Math.Between(1, 8));
        scene.add.existing(this);
    }
}   