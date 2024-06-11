import Game from "./scenes/game.js";
import GameOver from "./scenes/gameOver.js";

const config = {
    width: 600,
    heigth: 800,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
        },
    },
    scene: [Game, GameOver],
};

const game = new Phaser.Game(config);
