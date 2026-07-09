/**
 * Handles rendering of the game world, including level objects,
 * characters, throwable objects, status bars, and flipped sprites.
 */
class WorldRenderer {
  /**
   * Creates a new renderer for a specific game world.
   *
   * @param {World} world - The game world that should be rendered.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Clears and redraws the complete game world on the canvas.
   *
   * @returns {void}
   */
  draw() {
    const { ctx, canvas } = this.world;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(this.world.camera_x, 0);

    this.addLevelObjects();
    this.addCharacterAndEndboss();
    this.addMultipleObjects(this.world.throwableObjects);

    ctx.translate(-this.world.camera_x, 0);

    this.addStatusbars();

    requestAnimationFrame(() => this.draw());
  }

  /**
   * Adds all level objects to the canvas.
   *
   * @returns {void}
   */
  addLevelObjects() {
    this.addMultipleObjects(this.world.level.backgroundObjects);
    this.addMultipleObjects(this.world.level.clouds);
    this.addMultipleObjects(this.world.level.bottles);
    this.addMultipleObjects(this.world.level.enemies);
    this.addMultipleObjects(this.world.level.coins);
  }

  /**
   * Adds the endboss and the character to the canvas.
   *
   * @returns {void}
   */
  addCharacterAndEndboss() {
    this.addToMap(this.world.endboss);
    this.addToMap(this.world.character);
  }

  /**
   * Adds all visible status bars to the canvas.
   *
   * @returns {void}
   */
  addStatusbars() {
    this.addToMap(this.world.statusBar);
    this.addToMap(this.world.bottleBar);
    this.addToMap(this.world.coinBar);

    if (this.world.endboss.displayStatusbarEndboss) {
      this.addToMap(this.world.statusBarEndboss);
    }
  }

  /**
   * Adds multiple drawable objects to the canvas.
   *
   * @param {DrawableObject[]} objects - The objects to draw.
   * @returns {void}
   */
  addMultipleObjects(objects) {
    objects.forEach((object) => this.addToMap(object));
  }

  /**
   * Adds a single object to the canvas and flips it if needed.
   *
   * @param {DrawableObject} object - The object to draw.
   * @returns {void}
   */
  addToMap(object) {
    if (object.otherDirection) this.flipImage(object);

    object.draw(this.world.ctx);

    if (object.otherDirection) this.flipImageBack(object);
  }

  /**
   * Flips an object horizontally before drawing it.
   *
   * @param {DrawableObject} object - The object to flip.
   * @returns {void}
   */
  flipImage(object) {
    const ctx = this.world.ctx;

    ctx.save();
    ctx.translate(object.width, 0);
    ctx.scale(-1, 1);
    object.x *= -1;
  }

  /**
   * Restores an object's original horizontal direction after drawing.
   *
   * @param {DrawableObject} object - The object to flip back.
   * @returns {void}
   */
  flipImageBack(object) {
    object.x *= -1;
    this.world.ctx.restore();
  }
}
