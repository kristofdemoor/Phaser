export default class Timer {
    constructor(scene) {
        this.minutes = 1;
        this.seconds = 60;
        this.miliseconds = 60;

        this.scene = scene;

        this.start();

    }

    start() {
        this.scene.time.delayedCall(1000, () => {
            this.seconds--;
            if (this.seconds <= 0) {
                this.seconds = 60;
            }
        });
    }
}

