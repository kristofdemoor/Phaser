import Generator from "/src/classes/generator.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    create() {
        this.generator = new Generator(this);
        this.generator.generateStars();
    }

    update() {
    }
}