/**
 * Manages throwable objects, including bottle throwing,
 * throw cooldowns, and removing bottles outside the game world.
 */
class ThrowableManager {
  timeKeyDpressed = 1781619044044;

  /**
   * Creates a new throwable manager for a specific game world.
   *
   * @param {World} world - The game world whose throwable objects should be managed.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks whether a bottle should be thrown and removes bottles
   * that have left the game world.
   *
   * @returns {void}
   */
  checkThrownObjects() {
    if (this.canThrowBottle()) {
      this.throwBottle();
    }

    this.deleteBottlesOutOfWorld();
  }

  /**
   * Checks whether the character can throw a bottle.
   *
   * @returns {boolean} True if the throw key is pressed, bottles are available, and the cooldown has passed.
   */
  canThrowBottle() {
    return this.world.keyboard.KEY_D && this.world.bottleCount > 0 && this.hasTimePassed(1200, this.timeKeyDpressed);
  }

  /**
   * Throws a bottle, updates the throw cooldown,
   * reduces the bottle count, and updates the bottle status bar.
   *
   * @returns {void}
   */
  throwBottle() {
    this.world.stopSleepSound();
    this.world.sounds.play('bottleThrow');
    this.createBottle();
    this.timeKeyDpressed = Date.now();
    this.world.bottleCount--;
    this.world.bottleBar.setBottleBar(this.world.bottleCount);
  }

  /**
   * Creates a throwable bottle at the character's current position and direction.
   *
   * @returns {void}
   */
  createBottle() {
    const x = this.getBottleStartX();
    const y = this.world.character.y + 100;
    const direction = this.world.character.otherDirection;

    this.world.throwableObjects.push(new ThrowableObject(x, y, direction));
  }

  /**
   * Calculates the bottle start position based on the character direction.
   *
   * @returns {number} The x-position where the bottle should start.
   */
  getBottleStartX() {
    const character = this.world.character;
    return character.otherDirection ? character.x - 40 : character.x + 40;
  }

  /**
   * Removes throwable bottles that have fallen below the game world.
   *
   * @returns {void}
   */
  deleteBottlesOutOfWorld() {
    const bottles = this.world.throwableObjects;

    for (let i = bottles.length - 1; i >= 0; i--) {
      if (bottles[i].y > 480) bottles.splice(i, 1);
    }
  }

  /**
   * Checks whether a specific amount of time has passed since an event.
   *
   * @param {number} time - The required delay in milliseconds.
   * @param {number} eventTime - The timestamp of the previous event.
   * @returns {boolean} True if the required time has passed, otherwise false.
   */
  hasTimePassed(time, eventTime) {
    return Date.now() - eventTime > time;
  }
}
