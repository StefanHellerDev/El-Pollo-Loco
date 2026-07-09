# El Pollo Loco

**El Pollo Loco** is a 2D jump-and-run browser game built with **HTML5 Canvas**, **CSS**, and **Vanilla JavaScript**.
The player controls Pepe, a brave character who runs through a desert world, collects coins and bottles, jumps on enemies, throws bottles, and finally faces the endboss: the crazy chicken.

## Game Description

The goal of the game is to guide Pepe safely through the level, defeat enemies, collect items, and survive the final boss fight.

Players can move left and right, jump over obstacles, stomp chickens, collect bottles, and throw them at the endboss. The game includes animated characters, collision detection, status bars, sound effects, mobile touch controls, and a responsive layout.

## Features

* 2D side-scrolling gameplay
* Player movement with keyboard controls
* Mobile touch controls
* Jumping and gravity system
* Enemy collision detection
* Stomp mechanic for defeating chickens
* Throwable bottle mechanic
* Collectable coins and bottles
* Endboss fight
* Health, bottle, coin, and endboss status bars
* Character, enemy, and endboss animations
* Sound effects and mute function
* Fullscreen mode
* Responsive design for desktop and mobile devices
* Game over and victory screens

## Controls

### Desktop

| Key              | Action       |
| ---------------- | ------------ |
| Arrow Left       | Move left    |
| Arrow Right      | Move right   |
| Arrow Up / Space | Jump         |
| D                | Throw bottle |

### Mobile / Touch Devices

On supported touch devices, on-screen buttons are displayed for:

* Move left
* Move right
* Jump
* Throw bottle

## Technologies Used

This project was built without a game engine. The focus was on understanding and implementing core game mechanics manually.

* **HTML5**

  * Page structure
  * Canvas element
  * Game UI elements

* **CSS3**

  * Responsive layout
  * Touch control styling
  * Modal styling
  * Game screen overlays
  * Animations and visual effects

* **JavaScript**

  * Object-oriented programming
  * Game loop logic
  * Canvas rendering
  * Collision detection
  * Keyboard and touch input handling
  * Audio handling
  * Fullscreen API
  * LocalStorage for mute settings

* **HTML5 Canvas**

  * Rendering game objects
  * Drawing background layers
  * Drawing characters, enemies, collectibles, and status bars

## Object-Oriented Structure

The game is structured using JavaScript classes. Each major part of the game has its own responsibility.

Examples of important classes:

* `World`
  Coordinates the game world, objects, status bars, collisions, and rendering.

* `Character`
  Handles Pepe's movement, jumping, gravity, animations, sounds, and state.

* `MovableObject`
  Base class for moving objects with collision, gravity, health, and animation behavior.

* `DrawableObject`
  Base class for objects that can be drawn on the canvas.

* `Chicken` and `ChickenSmall`
  Enemy classes with movement and animations.

* `Endboss`
  Handles the final boss behavior, animations, attacks, and game-over logic.

* `ThrowableObject`
  Represents bottles thrown by the character.

* `StatusBar`, `HealthStatusBar`, `BottleBar`, `CoinBar`, `EndbossStatusBar`
  Display the current game status.

* `Sounds`
  Manages sound effects, loops, mute state, and audio playback.

* `Keyboard`
  Stores the current keyboard and touch input state.

* `HitboxUtils`
  Provides helper methods for collision and hitbox calculations.

## Game Mechanics

### Movement and Gravity

The character uses a gravity system based on vertical speed and acceleration. Jumping changes the vertical speed, while gravity pulls the character back down until he lands on the ground.

### Collision Detection

The game uses custom hitbox calculations to detect collisions between the character, enemies, bottles, coins, and the endboss.

Special logic is used to detect whether the player lands on top of an enemy. This allows Pepe to defeat chickens by jumping on them instead of taking damage.

### Collectables

Coins and bottles can be collected during the game. The current amount is displayed in the status bars.

### Bottle Throwing

Collected bottles can be thrown at the endboss. The player can only throw bottles if bottles are available.

### Endboss Fight

When the player reaches the endboss area, the endboss becomes active. The endboss has its own status bar, animations, hurt state, attack behavior, and death logic.

## How to Run the Project

1. Clone or download the repository.
2. Open the project folder.
3. Start the game by opening `index.html` in a browser.

No installation or build process is required.

## Project Goal

This project was created as a learning project to practice:

* Object-oriented JavaScript
* Game development fundamentals
* Canvas rendering
* Collision detection
* Code structure and refactoring
* Responsive browser-based game controls
* Working with animations and sounds

## Screenshots

You can add screenshots here later, for example:

```md
![Start Screen](./img/screenshots/start-screen.png)
![Gameplay](./img/screenshots/gameplay.png)
![Endboss Fight](./img/screenshots/endboss-fight.png)
```

## Future Improvements

Possible future improvements include:

* Better level balancing
* More enemy types
* More levels
* Improved mobile layout
* Pause menu
* More sound settings
* High score system
* Cleaner separation of game managers and rendering logic

## Author

Created by **Stefan Heller**.
