import Parallax from "/Lab/src/classes/parallax.js";
import Player from "/Lab/src/classes/player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    player;

    preload() {
        // Background image
        this.load.image("galaxy", "./assets/galaxy.jpg");
        
        // player x-wing spritesheet
        this.load.spritesheet("x-wing", "./assets/spritesheet.png", {
            frameWidth: 64,
            frameHeight: 84,
        });
        
        // Player x-wing laser
        this.load.image("playerLaser", "./assets/laser-green.png");

        // Enemy Tie fighter
        this.load.image("enemy", "./assets/tie.png")


    }

    create() {
        // Parallax background
        this.parallax = new Parallax(this, "galaxy");

        // Player x-wing sprite
        this.player = new Player(this, 300, 600, "x-wing", "playerLaser");

        // Enemy Tie
        this.enemy = this.physics.add.image(300, 200, "enemy");


        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Move player x-wing
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
        // Shoot laser shoot
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.fire();
        }
    }

    checkCollision() {
        
        this.physics.add.overlap(this.player, this.enemy, () => {
            console.log("HIT");
        })
    }
}
