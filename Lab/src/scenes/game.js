import Parallax from "../classes/parallax.js";
import Player from "../classes/player.js";
import Enemy from "../classes/enemy.js";
import Laser from "../classes/laser.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "gameScene" });
    }

    // Variables
    player;
    points = 25;
    gameOver = false;
    laserSound;
    explosionSound;
    themeSound;

    preload() {
        // Background image
        this.load.image("galaxy", "./assets/galaxy.jpg");

        // UI
        this.load.image("UI", "./assets/UI.png");

        // Player
        this.load.spritesheet("x-wing", "./assets/spritesheet.png", {
            frameWidth: 64,
            frameHeight: 84,
        });

        // Player laser
        this.load.image("playerLaser", "./assets/laser-green.png");


        // Enemy
        this.load.image("enemy", "./assets/tie.png");

        // Enemy laser
        this.load.image("enemyLaser", "./assets/laser-red.png");

        // Explosion
        this.load.spritesheet("explosion-spritesheet", "./assets/explosion-spritesheet.png", {
            frameWidth: 77,
            frameHeight: 77,
        });

        // Sounds
        this.load.audio("laserSound", "./assets/sounds/laser.mp3");
        this.load.audio("explosionSound", "./assets/sounds/explosion.mp3");
        this.load.audio("theme", "./assets/sounds/theme.mp3");
    }

    create() {
        // Parallax background
        this.parallax = new Parallax(this, "galaxy");

        // Player x-wing sprite
        this.player = new Player(this, 300, 580, "x-wing", "playerLaser");

        // Player laser group
        this.playerLasers = this.physics.add.group({
            classType: Laser,
            maxSize: 2,
            runChildUpdate: true,
        });

        // Enemy group
        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true,
        });

        // Enemy laser group
        this.enemyLasers = this.physics.add.group({
            classType: Laser,
            runChildUpdate: true,
        });

        // UI
        this.ui = this.add.image(300, 710, "UI");
        this.physics.add.existing(this.ui);

        // Spawn enemy
        this.spawnEnemy();

        // Collision check for player laser and enemy
        this.physics.add.overlap(
            this.player.lasers,
            this.enemies,
            this.handleLaserEnemyCollision,
            null,
            this
        );

        // Collision check for player x-wing and enemy
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.handlePlayerEnemyCollision,
            null,
            this
        );

        // Collision check for enemy laser and player
        this.physics.add.overlap(
            this.player,
            this.enemyLasers,
            this.handleEnemyLaserPlayerCollision,
            null,
            this
        );

        // Collision check for enemy laser and UI
        this.physics.add.overlap(
            this.enemyLasers,
            this.ui,
            this.handleEnemyLaserUICollision,
            null,
            this
        );

        // Collision check for enemy and UI
        this.physics.add.overlap(
            this.enemies,
            this.ui,
            this.handleEnemyUICollision,
            null,
            this
        );

        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Sounds
        this.laserSound = this.sound.add("laserSound");
        this.explosionSound = this.sound.add("explosionSound");
        this.themeSound = this.sound.add("theme", { loop: true });
        this.themeSound.play();

        // Explosion Animation
        const config = {
            key: "explosion",
            frames: "explosion-spritesheet",
            frameRate: 70,
            hideOnComplete: true,
        };

        this.anims.create(config);
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

            // Player laser fire
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.player.fire();
            }

            // Update player laser
            this.playerLasers.getChildren().forEach(laser => laser.update());

            // Enemy laser fire
            this.enemies.getChildren().forEach(enemy => {
                if (Math.round(enemy.y) === enemy.randomY) {
                    enemy.fire();
                    this.laserSound.play();
                }
            });

            // Update enemy laser 
            this.enemyLasers.getChildren().forEach(laser => laser.update());

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

    handleLaserEnemyCollision(laser, enemy) {
        console.log("Enemy Shot!");
        enemy.destroy(true);
        laser.destroy(true);
        this.explosionAnimation(enemy);
        this.explosionSound.play();
        this.player.score += this.points;
    }

    handlePlayerEnemyCollision(player, enemy) {
        console.log("Player and Enemy Killed!");
        this.gameOver = true;
        this.explosionAnimation(enemy);
        this.explosionAnimation(player);
        enemy.destroy(true);
        player.destroy(true);
        this.explosionSound.play();

        this.showScore();

        //TO DO
        //this.respawn();
    }

    handleEnemyLaserPlayerCollision(player, laser) {
        console.log("Player Hit!");
        this.gameOver = true;
        this.explosionAnimation(player);
        player.destroy(true);
        laser.destroy(true);
        this.explosionSound.play();

        this.showScore();
    }

    handleEnemyLaserUICollision(ui, laser) {
        laser.setAlpha(0.5);
    }

    handleEnemyUICollision(ui, enemy) {
        enemy.setAlpha(0.5);
    }

    explosionAnimation(enemy) {
        this.add.sprite(enemy.x, enemy.y, "explosion-spritesheet").play("explosion");
    }

    spawnEnemy() {
        const delay = Phaser.Math.Between(0, 2000);
        this.time.delayedCall(
            delay,
            () => {
                const enemy = this.enemies.get(Phaser.Math.Between(20, 580), -20, "enemy", "enemyLaser");
                this.spawnEnemy();
            },
            null,
            this
        );
    }

    // TO DO
    respawn() {

        this.player.x = 300;

        this.player.setAlpha(0);


        this.time.delayedCall(
            5000,
            () => {
                this.player.setAlpha(0.2);
            }
        );
        this.time.delayedCall(
            5000,
            () => {
                this.player.setAlpha(0.8);
            }
        );
        this.time.delayedCall(
            5000,
            () => {
                this.player.setAlpha(0.2);
            }
        );


        this.player.setAlpha(1);

    }

    showScore() {
        console.log(`Score: ${this.player.score}`);
    }
}
