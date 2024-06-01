import Parallax from "../classes/parallax.js";
import Player from "../classes/player.js";
import Enemy from "../classes/enemy.js";

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
        this.load.image("enemy", "./assets/tie.png");


    }

    create() {
        // Parallax background
        this.parallax = new Parallax(this, "galaxy");

        // Player x-wing sprite
        this.player = new Player(this, 300, 600, "x-wing", "playerLaser");

        // Enemy group
        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true
        });

        // Enemy grid
        this.createEnemyGrid(5, 8, 130, 100, 50, 50);

        //this.enemy = new Enemy(this, 300, 100, "enemy");

        // Collision detection
        this.physics.add.overlap(this.player.bullets, this.enemies, this.handleCollision, null, this);

        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        // Move player x-wing
        if (this.cursors.left.isDown) {
            this.player.moveLeft();
        }
        else if (this.cursors.right.isDown) {
            this.player.moveRight();
        }
        else {
            this.player.stop();
        }
        // Shoot laser shoot
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.fire();
        }
    }

    createEnemyGrid(rows, cols, startX, startY, xSpacing, ySpacing) {
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = startX + col * xSpacing;
                let y = startY + row * ySpacing;
                let enemy = this.enemies.get(x, y, "enemy");
            }
        }
    }

    handleCollision(bullet, enemy) {
        console.log("Enemy Shot!!!");
        enemy.destroy(true);
        bullet.destroy(true);

    }
}
