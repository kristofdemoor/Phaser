export default class Timer {
    constructor(scene, secondsInput) {
        this.secondsInput = secondsInput;
        this.milisecondsInput = secondsInput * 100;
        this.timesUp = false;

        this.scene = scene;

        this.timeEvent = this.scene.time.addEvent({
            delay: 10,
            loop: true,
            callback: this.updateTime,
            callbackScope: this,
        });
    }

    updateTime() {
        if (this.milisecondsInput > 0) {
            this.milisecondsInput--;
            this.minutes = Math.floor(this.milisecondsInput / (60 * 100));
            this.seconds = Math.floor((this.milisecondsInput - this.minutes * 60 * 100) / 100);
            this.miliseconds = Math.floor((this.milisecondsInput / 100) * 100) % 60;
        }
        else {
            this.scene.time.removeEvent(this.timeEvent);
            this.seconds = 0;
            this.minutes = 0;
            this.miliseconds = 0;
            this.timesUp = true;
        }

    }
}
