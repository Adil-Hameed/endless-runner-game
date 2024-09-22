Endless Runner Game
This is a simple HTML5 canvas-based game where the player controls a spaceship to avoid falling obstacles. The difficulty of the game gradually increases over time, as obstacles fall faster and appear more frequently. The goal is to survive as long as possible and achieve the highest score!

Table of Contents
Game Features
How to Play
Installation
Controls
Customization
Credits
Game Features
Endless gameplay: Survive for as long as possible while avoiding obstacles.
Dynamic difficulty: Obstacles fall faster and spawn more frequently as you progress.
Score and level system: Track your score and current level based on how many obstacles you pass.
Collision detection: Game ends when the player collides with an obstacle.
Smooth animations: The game uses canvas animations and physics for a smooth experience.
How to Play
Control your spaceship using the arrow keys on your keyboard.
Avoid the red obstacles that fall from the top of the screen.
Your score increases by 1 each time an obstacle passes the bottom of the screen.
The game difficulty increases gradually by making obstacles fall faster and reducing the time between each obstacle.
Survive for as long as possible to achieve a high score!
Installation
To run the game on your local machine, follow these steps:

Download/Clone the Repository:

bash
Copy code
git clone https://github.com/your-repo/endless-runner-game.git
Navigate to the folder:

bash
Copy code
cd endless-runner-game
Open index.html in your browser: You can open the game directly by double-clicking on the index.html file or right-clicking and selecting "Open with..." and choosing your preferred browser.

Alternatively, you can use a local development server to run the game.

Play the game!

Controls
Arrow keys:
Arrow Right: Move right
Arrow Left: Move left
Arrow Up: Move up
Arrow Down: Move down
Customization
You can tweak the game behavior and visuals by modifying certain variables in the game.js file:

Player Speed: Modify the player.speed variable to adjust the movement speed of the spaceship.

javascript
Copy code
let player = {
    speed: 5, // Increase or decrease to change movement speed
};
Obstacle Speed: To change the starting speed of the obstacles, modify obstacleSpeed:

javascript
Copy code
let obstacleSpeed = 2; // Change this value to modify the initial speed of falling obstacles
Obstacle Frequency: You can modify how often new obstacles are introduced by changing obstacleSpawnDelay:

javascript
Copy code
let obstacleSpawnDelay = 1500; // Reduce or increase this number to adjust spawn frequency
Difficulty Scaling: If you'd like to modify how the difficulty ramps up, adjust the speed increase and spawn delay in the increaseDifficulty() function:

javascript
Copy code
function increaseDifficulty() {
    if (obstaclesPassed % 10 === 0) {
        obstacleSpeed += 0.2;
        obstacleSpawnDelay = Math.max(obstacleSpawnDelay - 100, 500);
    }
}
Credits
Game designed and developed using HTML5 and JavaScript.
Graphics rendered using the Canvas API.
Special thanks to tutorials and guides on HTML5 game development.
