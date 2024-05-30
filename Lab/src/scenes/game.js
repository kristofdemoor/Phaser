import Parallax from "/Lab/src/classes/parallax.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super({ key: "game" });
    }

    player;
    playerSpeed = 3;
    playerLaser;
    playerLaserGroup;

    preload() {
        // Background image
        this.load.image("galaxy", "./assets/galaxy.jpg");
        // x-wing spritesheet
        this.load.spritesheet("x-wing", "./assets/spritesheet.png", { frameWidth: 64, frameHeight: 84 });
        // x-wing laser
        this.load.image("playerLaser", "./assets/laser-green.png")
    }

    create() {
        // Add galaxy image
        const galaxy = this.add.image(300, 400, "galaxy");
        // Move galaxy image
        this.tweens.add({
            targets: galaxy,
            y: { from: -4000, to: 4000 },
            duration: 50000,
            repeat: -1
        });

        // Star animation
        this.parallax = new Parallax(this);
        this.parallax.generateStars();

        // player x-wing sprite
        this.player = this.physics.add.sprite(300, 500, "x-wing");
        this.player.setCollideWorldBounds(true);

        // player x-wing animation
        const config = {
            key: "x-wing-animation",
            frames: this.anims.generateFrameNumbers("x-wing"),
            frameRate: 10,
            repeat: -1
        };

        this.anims.create(config);
        this.player.play("x-wing-animation");

        // player laser
        //this.playerLaser = this.add.image(200 , 300, "playerLaser");


        // Cursors
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        // Move player x-wing
        if (this.cursors.left.isDown)
            {
                this.player.x -= this.playerSpeed;
            }
        if (this.cursors.right.isDown)
            {                this.player.x += this.playerSpeed;
            }
        // Shoot laser shoot
        if(Phaser.Input.Keyboard.JustDown(this.spacebar))
            {
                // this.playerLaser.x = this.player.x;
                // this.playerLaser.y -= 2; 
                this.fire();
            }
    }

    fire() {
        this.playerLaser = this.add.image(this.player.x , this.player.y - 65, "playerLaser");

        this.tweens.add({
            targets: this.playerLaser,
            y: { from: this.player.y-65 , to: -810 },
            duration: 1000,
            onComplete: () => {
                // remove gameobject from scene and memory
                //this.destroy(true);
            }
        });
    }
}