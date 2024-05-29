import Game from "./scenes/game.js";

const config = {
    width: 600,
    heigth: 800,
    parent: "game-container",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    backgroundColor: "#000000",
    scene: [Game]
};

const game = new Phaser.Game(config);