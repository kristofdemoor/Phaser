export default class Timer {
    constructor(scene, secondsInput) {
        this.secondsInput = secondsInput;

        this.milisecondsInput = secondsInput * 100;

        this.scene = scene;

        this.timeEvent = this.scene.time.addEvent({
            delay: 10,
            loop: true,
            callback: this.updateTime,
            callbackScope: this,
        });
    }

    updateTime() {
        this.milisecondsInput--;
        this.minutes = Math.floor(this.milisecondsInput / (60 * 100));
        this.seconds = Math.floor(this.milisecondsInput - this.minutes * 60 * 100) / 100;
        this.miliseconds = (this.milisecondsInput / 100) * 100;

        if (this.seconds <= 0 && this.minutes <= 0) {
            this.seconds = 0;
            this.minutes = 0;
            this.miliseconds = 0;
            this.scene.time.removeEvent(this.timeEvent);
        }
    }
}
