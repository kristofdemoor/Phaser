import Parallax from "../classes/parallax.js";
import Player from "../classes/player.js";
import Enemy from "../classes/enemy.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    player;
    gameOver = false;

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

        // Explosion spritesheet
        this.load.spritesheet("explosion-spritesheet", "./assets/explosion-spritesheet.png", {
            frameWidth: 77,
            frameHeight: 77,
        });
    }

    create() {
        // Parallax background
        this.parallax = new Parallax(this, "galaxy");

        // Player x-wing sprite
        this.player = new Player(this, 300, 600, "x-wing", "playerLaser");

        // Enemy group
        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true,
        });

        // Enemy grid
        //this.createEnemyGrid(5, 8, 130, 100, 50, 50);

        // TO DO: Spawn enemy
        this.spawnEnemy();

        // Collision detection between player lazer and enemy
        this.physics.add.overlap(
            this.player.bullets,
            this.enemies,
            this.handleLaserEnemyCollision,
            null,
            this
        );

        // Collision detection between player x-wing and enemy
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.handlePlayerEnemyCollision,
            null,
            this
        );

        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (!this.gameOver) {
            // Move player x-wing
            if (this.cursors.left.isDown) {
                this.player.moveLeft();
            } else if (this.cursors.right.isDown) {
                this.player.moveRight();
            } else {
                this.player.stop();
            }
            // Shoot laser shoot
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.player.fire();
            }
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

    handleLaserEnemyCollision(bullet, enemy) {
        console.log("Enemy Shot!!!");
        enemy.destroy(true);
        bullet.destroy(true);
        this.explosionAnimation(enemy);
    }

    handlePlayerEnemyCollision(player, enemy) {
        console.log("Player and Enemy Killed");
        this.gameOver = true;
        this.explosionAnimation(enemy);
        this.explosionAnimation(player);
        enemy.destroy(true);
        player.destroy(true);
    }

    explosionAnimation(enemy) {
        const config = {
            key: "explosion",
            frames: "explosion-spritesheet",
            frameRate: 70,
            hideOnComplete: true,
        };

        this.anims.create(config);
        this.add.sprite(enemy.x, enemy.y, "explosion-spritesheet").play("explosion");
    }

    spawnEnemy() {
        const delay = Phaser.Math.Between(0, 2000);
        this.time.delayedCall(
            delay,
            () => {
                this.enemies.get(Phaser.Math.Between(20, 580), -20, "enemy");
                this.spawnEnemy();

            },
            null,
            this
        );
    }
}
