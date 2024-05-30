
"use strict"

export default class Parallax {
    constructor(scene) {
        this.scene = scene;
        this.init();
    }

    init() {
        this.generateStars();
    }


    generateStars() {
        // star speed 
        const speedValues = [2000, 5000, 8000];
        const speed = speedValues[Phaser.Math.Between(0, 2)];

        // create new star
        new Star(this.scene, speed);

        // generate new star after 100ms
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
    constructor(scene, speed) {
        super(scene);
        // draw star
        this.draw();
        // move star
        this.move(speed);
    }

    draw() {
        this.fillStyle(0xFFFFFF, Phaser.Math.FloatBetween(0.2, 1.0));
        this.fillCircle(Phaser.Math.Between(0, 600), 805, Phaser.Math.FloatBetween(0.5, 1.8));
        this.scene.add.existing(this);
    }

    move(speed) {
        this.scene.tweens.add({
            targets: this,
            y: { from: -805, to: 0 },
            duration: speed,
            onComplete: () => {
                // remove gameobject from scene and memory
                this.destroy(true);
            }
        });
    }

} 

