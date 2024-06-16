import Start from "./scenes/start.js";
import Game from "./scenes/game.js";
import GameWon from "./scenes/gameWon.js";
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
    scene: [Start, Game, GameWon, GameOver],
};

const game = new Phaser.Game(config);
