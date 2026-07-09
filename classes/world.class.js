/**
 * Represents the main game world and manages rendering, collisions,
 * object interactions, player actions, and game state updates.
 */
class World {
  character = new Character();
  endboss = new Endboss();
  enemies = level1.enemies;
  clouds = level1.clouds;
  bottles = level1.bottles;
  coins = level1.coins;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  keyboard;
  level = level1;
  camera_x = 0;
  throwableObjects = [];
  bottleCount = 5;
  coinCount = 0;
  timeKeyDpressed = 1781619044044;
  statusBar = new HealthStatusBar(this.character.energy);
  bottleBar = new BottleBar(this.bottleCount);
  coinBar = new CoinBar(this.coinCount);
  statusBarEndboss = new EndbossStatusBar(this.endboss.energy);

  /**
   * Creates a new game world, initializes canvas rendering,
   * connects input and sound handling, and starts the game loop.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element used to render the game.
   * @param {Keyboard} keyboard - The keyboard input state used to control the character.
   * @param {Sounds} sounds - The sound manager used to play game sounds.
   */
  constructor(canvas, keyboard, sounds) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.sounds = sounds;

    this.draw();
    this.setWorld();
    this.bottleBar.setBottleBar(this.bottleCount);
    this.coinBar.setCoinBar(this.coinCount);
    this.run();
  }

  /**
   * Assigns the current world instance to objects that need world access.
   *
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  /**
   * Starts the main game logic interval for collisions and thrown objects.
   *
   * @returns {void}
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrownObjects();
    }, 1000 / 60);
  }

  /**
   * Checks whether a bottle should be thrown and removes bottles
   * that have left the visible game world.
   *
   * @returns {void}
   */
  checkThrownObjects() {
    if (this.keyboard.KEY_D && this.bottleCount > 0 && this.timeSinceObjectThrown(1200, this.timeKeyDpressed)) {
      this.stopSleepSound();
      this.sounds.play('bottleThrow');
      this.chooseThrowDirection();
      this.timeKeyDpressed = new Date().getTime();
      this.bottleCount -= 1;
      this.bottleBar.setBottleBar(this.bottleCount);
    }
    this.deleteBottleOutOfWorld();
  }

  /**
   * Creates a throwable bottle in the direction the character is facing.
   *
   * @returns {void}
   */
  chooseThrowDirection() {
    if (!this.character.otherDirection) {
      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection);
      this.throwableObjects.push(bottle);
    } else {
      let bottle = new ThrowableObject(this.character.x - 40, this.character.y + 100, this.character.otherDirection);
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Resets the character idle timer and stops the sleep sound.
   *
   * @returns {void}
   */
  stopSleepSound() {
    this.character.idleWait = 0;
    this.sounds.stop('sleep');
  }

  /**
   * Removes throwable bottles that have fallen below the game world.
   *
   * @returns {void}
   */
  deleteBottleOutOfWorld() {
    if (this.throwableObjects.length > 0) {
      for (let index = 0; index < this.throwableObjects.length; index++) {
        if (this.throwableObjects[index].y > 480) {
          this.throwableObjects.splice(index, 1);
        }
      }
    }
  }

  /**
   * Checks whether enough time has passed since a specific event.
   *
   * @param {number} time - The required delay in milliseconds.
   * @param {number} event - The timestamp of the previous event.
   * @returns {boolean} True if the required time has passed, otherwise false.
   */
  timeSinceObjectThrown(time, event) {
    let timePassed = new Date().getTime() - event;
    return timePassed > time;
  }

  /**
   * Checks all relevant collisions between the character, enemies,
   * collectibles, the endboss, and throwable objects.
   *
   * @returns {void}
   */
  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithEndboss();
    this.checkCollisionsWithBottlesOnGround();
    this.checkCollisionsWithCoins();
    this.checkCollisionEndbossWithFlyingBottle();
  }

  /**
   * Checks collisions between the character and all enemies.
   * Handles enemy stomping and character damage.
   *
   * @returns {void}
   */
  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) return;

      if (this.jumpedOnChicken(enemy)) {
        this.stompEnemy(enemy);
        return;
      }

      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Handles the behavior when the character stomps an enemy.
   * Repositions the character, applies jump force, damages the enemy,
   * and plays the enemy death sound.
   *
   * @param {MovableObject} enemy - The enemy that was stomped.
   * @returns {void}
   */
  stompEnemy(enemy) {
    const enemyBox = HitboxUtils.getHitbox(enemy);
    this.character.y = enemyBox.top - this.character.height + this.character.offset.bottom;
    this.character.speedY = 26;
    enemy.hit();
    enemy.dead = 1;
    this.sounds.play('chickenDead');
  }

  /**
   * Checks whether the character lands on top of a chicken enemy while falling.
   *
   * @param {MovableObject} enemy - The enemy to check against.
   * @returns {boolean} True if the character jumped on the enemy, otherwise false.
   */
  jumpedOnChicken(enemy) {
    if (enemy.isDead()) return false;
    if (this.character.speedY >= 0) return false;
    const characterBox = HitboxUtils.getHitbox(this.character);
    const enemyBox = HitboxUtils.getHitbox(enemy);
    const previousBottom = HitboxUtils.getPreviousBottom(this.character);
    const currentBottom = characterBox.bottom;
    const crossedEnemyTop = previousBottom <= enemyBox.top && currentBottom >= enemyBox.top;
    const horizontalOverlap = HitboxUtils.getHorizontalOverlap(characterBox, enemyBox);
    const minOverlap = Math.min(12, (enemyBox.right - enemyBox.left) * 0.35);
    return crossedEnemyTop && horizontalOverlap >= minOverlap;
  }

  /**
   * Checks collisions between the character and the endboss.
   *
   * @returns {void}
   */
  checkCollisionsWithEndboss() {
    if (this.character.isColliding(this.endboss) && this.endboss.dead != 1) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks whether the character collects bottles from the ground.
   *
   * @returns {void}
   */
  checkCollisionsWithBottlesOnGround() {
    if (this.bottleCount < 10) {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.sounds.play('getBottle');
          this.bottleCount += 1;
          this.bottleBar.setBottleBar(this.bottleCount);
          this.level.bottles.splice(index, 1);
        }
      });
    }
  }

  /**
   * Checks whether the character collects coins.
   *
   * @returns {void}
   */
  checkCollisionsWithCoins() {
    if (this.coinCount < 10) {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.sounds.play('getCoin');
          this.coinCount += 1;
          this.coinBar.setCoinBar(this.coinCount);
          this.level.coins.splice(index, 1);
        }
      });
    }
  }

  /**
   * Checks collisions between flying bottles and the endboss.
   *
   * @returns {void}
   */
  checkCollisionEndbossWithFlyingBottle() {
    if (this.throwableObjects.length > 0) {
      for (let index = 0; index < this.throwableObjects.length; index++) {
        if (this.throwableObjects[index].isColliding(this.endboss)) {
          this.throwableObjects.splice(index, 1);
          this.endboss.hit();
          this.statusBarEndboss.setPercentage(this.endboss.energy);
        }
      }
    }
  }

  /**
   * Clears and redraws the complete game world on the canvas.
   *
   * @returns {void}
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToCanvas1();
    this.addCharacterAndEndbossToCanvas();
    this.addMultipleObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
    this.addStatusbarsToCanvas();
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  /**
   * Adds all visible status bars to the canvas.
   *
   * @returns {void}
   */
  addStatusbarsToCanvas() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.endboss.displayStatusbarEndboss) {
      this.addToMap(this.statusBarEndboss);
    }
  }

  /**
   * Adds the endboss and the character to the canvas.
   *
   * @returns {void}
   */
  addCharacterAndEndbossToCanvas() {
    this.addToMap(this.endboss);
    this.addToMap(this.character);
  }

  /**
   * Adds all level objects such as backgrounds, clouds,
   * bottles, enemies, and coins to the canvas.
   *
   * @returns {void}
   */
  addObjectsToCanvas1() {
    this.addMultipleObjectsToMap(this.level.backgroundObjects);
    this.addMultipleObjectsToMap(this.level.clouds);
    this.addMultipleObjectsToMap(this.level.bottles);
    this.addMultipleObjectsToMap(this.level.enemies);
    this.addMultipleObjectsToMap(this.level.coins);
  }

  /**
   * Adds multiple objects to the canvas.
   *
   * @param {DrawableObject[]} objects - The objects to draw on the canvas.
   * @returns {void}
   */
  addMultipleObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the canvas, flips it horizontally if needed,
   * and draws its image and frame.
   *
   * @param {DrawableObject} mo - The object to draw on the canvas.
   * @returns {void}
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    // mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an object horizontally before drawing it.
   *
   * @param {DrawableObject} mo - The object to flip.
   * @returns {void}
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores an object's original horizontal direction after drawing.
   *
   * @param {DrawableObject} mo - The object to flip back.
   * @returns {void}
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
