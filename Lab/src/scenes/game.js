import Parallax from "../classes/parallax.js";
import Player from "../classes/player.js";
import Enemy from "../classes/enemy.js";
import Laser from "../classes/laser.js";
import Timer from "../classes/timer.js";

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
    scoreText = "00000";
    playerLive1;
    playerLive2;
    playerLive3;
    timer;

    preload() {
        // Background image
        this.load.image("galaxy", "./assets/galaxy.jpg");

        // UI
        this.load.image("UI", "./assets/UI.png");
        this.load.image("x-wing-UI-light", "./assets/x-wing-UI-light.png");
        this.load.image("x-wing-UI-dark", "./assets/x-wing-UI-dark.png");

        // Player
        this.load.spritesheet("x-wing", "./assets/spritesheet.png", {
            frameWidth: 64,
            frameHeight: 84,
        });

        // Player laser
        this.load.image("playerLaser", "./assets/laser-green.png");

        // Player Score

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
        this.physics.add.overlap(this.enemies, this.ui, this.handleEnemyUICollision, null, this);

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

        //------------
        // UI
        //------------

        // Lives
        this.playerLive1 = this.add.image(50, 730, "x-wing-UI-light");
        this.playerLive2 = this.add.image(80, 730, "x-wing-UI-light");
        this.playerLive3 = this.add.image(110, 730, "x-wing-UI-light");

        // Score
        this.scoreText = this.add.text(253, 695, "00000", {
            fontFamily: "DS-Digital",
            fontSize: 40,
            color: "#a0a0a0",
        });

        // Timer
        this.timer = new Timer(this, 20);

        this.timerText = this.add.text(
            475,
            715,
            this.timer.minutes + ":" + this.timer.seconds + ":" + this.timer.miliseconds,
            {
                fontFamily: "DS-Digital",
                fontSize: 28,
                color: "#a0a0a0",
            }
        );
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
            this.playerLasers.getChildren().forEach((laser) => laser.update());

            // Enemy laser fire
            this.enemies.getChildren().forEach((enemy) => {
                if (Math.round(enemy.y) === enemy.randomY) {
                    enemy.fire();
                    this.laserSound.play();
                }
            });

            // Update enemy laser
            this.enemyLasers.getChildren().forEach((laser) => laser.update());

            // Timer
            this.updateTime();
        }
    }

    handleLaserEnemyCollision(laser, enemy) {
        console.log("Enemy Shot!");
        enemy.destroy(true);
        laser.destroy(true);
        this.explosionAnimation(enemy);
        this.explosionSound.play();
        this.updateScore();
    }

    handlePlayerEnemyCollision(player, enemy) {
        if (!this.player.invincible) {
            console.log("Player and Enemy Killed!");
            this.explosionAnimation(enemy);
            this.explosionAnimation(player);
            enemy.destroy(true);
            this.explosionSound.play();
            this.updateLives();
            this.player.respawn();
        }
    }

    handleEnemyLaserPlayerCollision(player, laser) {
        if (!this.player.invincible) {
            console.log("Player Hit!");
            this.explosionAnimation(player);
            laser.destroy(true);
            this.explosionSound.play();
            this.updateLives();
            this.player.respawn();
        }
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
                const enemy = this.enemies.get(
                    Phaser.Math.Between(20, 580),
                    -20,
                    "enemy",
                    "enemyLaser"
                );
                this.spawnEnemy();
            },
            null,
            this
        );
    }

    updateScore() {
        this.player.score += this.points;
        this.displayScore();
    }

    displayScore() {
        // add leading zeros to score
        const score = this.player.score;
        const scoreText = score.toString().padStart(5, "0");
        this.scoreText.setText(scoreText);
    }

    updateLives() {
        this.player.lives--;
        if (this.player.lives === 2) {
            this.playerLive3.setTexture("x-wing-UI-dark");
        }
        if (this.player.lives === 1) {
            this.playerLive2.setTexture("x-wing-UI-dark");
        }
        if (this.player.lives === 0) {
            this.playerLive1.setTexture("x-wing-UI-dark");
            this.playerKilled();
        }
    }

    updateTime() {
        let minutesText = this.timer.minutes;
        let secondsText = this.timer.seconds;
        let milisecondsText = this.timer.miliseconds;

        if (minutesText < 10) {
            minutesText = "0" + minutesText;
        }
        if (secondsText < 10) {
            secondsText = "0" + secondsText;
        }
        if (milisecondsText < 10) {
            milisecondsText = "0" + milisecondsText;
        }

        this.timerText.setText(minutesText + ":" + secondsText + ":" + milisecondsText);

        if (this.timer.timesUp) {
            this.registry.set("score", this.player.score);
            //this.registry.set("score", this.scoreText.text);
            this.scene.start("gameWonScene");
        }
    }

    playerKilled() {
        console.log("GAME OVER!");
        this.themeSound.stop();
        this.scene.start("gameOverScene");
    }
}
