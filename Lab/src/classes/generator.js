export default class Generator {
    constructor(scene) {
        this.scene = scene;
        //this.scene.time.delayedCall(1000, () => this.init(), null, this);
    }

    init() {
        this.generateStars();
    }

    generateStars() {
        // create 1000 random moving stars
        // for (let i = 0; i < 1500; i++) {
        //     new Star(this.scene);
        // }
        new Star(this.scene);
        this.scene.time.delayedCall(
            100,
            () => {
                this.generateStars();
            },
            null,
            this
        );

    }
}

// class to create a star with a random x, y, radius and alpha;
// and move the star with a random speed 
class Star extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene);
        // draw star
        this.fillStyle(0xFFFFFF, Phaser.Math.FloatBetween(0.2, 1.0));
        this.fillCircle(Phaser.Math.Between(0, 500), 805, Phaser.Math.FloatBetween(0.5, 1.8));
        scene.add.existing(this);

        // move star
        this.moveStar();
    }

    moveStar() {
        this.scene.tweens.add({
            targets: this,
            y: { from: -805, to: 0 },
            duration: 6000,
            onComplete: () => {
                this.destroy;
            }

        }

        );
    }
} 