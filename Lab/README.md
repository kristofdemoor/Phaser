# **Star Wars CS50**
## Harvard CS50 Final Project


This is Harvard CS50 final project developed by Kristof De Moor. 
The project is a browser based top down space shooter developed with Phaser.
Phaser is an open source HTML5 game framework that is fun to use and easy to get started with. 

- Visit the Phaser website for more information: https://phaser.io/
- Youtube demo: https://www.youtube.com/watch?v=KWUrtu0H4zM


## The Game

Become a Star Wars Legend and defeat the imperial TIE's in a X-Wing fighter. 
Move left and right with the arrow keys. Press space to shoot. 
The goal is to shoot as much enemies as possible within 2 minutes. 
You have 3 lives. If you are killed 3 times within 2 minutes, it's game over.
If you manage to survive you win the game. If your score is higher then the high score, your score will become the new high score. 
If you get killed, you will respawn and have a few seconds to refocus. during this period you cannot be killed. 
The background of the game is a parrallax moving background to create the impression that the X-Wing is actually flying. Stars are generated at random speed, size and alpha to create depth.
The engine of the X-Wing is animated to even further improve the feeling that the fighter is moving.



## The Code

I used an object oriented design to keep the code organised and easily managed.
The folder structure exists of a few subfolders including: 

- assets
- src

Under the assets folder you will find all sprites, sounds and fonts. 
In the src folder are all classes and scenes stored. 

### Classes

##### Parallax
This class is responsible to create the parralax background effect. 

##### Enemy
Responsible to create enemies, let enemies move and shoot.

##### Player
This class is responsible to create the player object, and let the player move and shoot.

##### Timer
This class is responsible to create the count down timer. 

### Scenes

The game exists of scenses below: 

- Start 
- Game
- Game Won
- Game Over