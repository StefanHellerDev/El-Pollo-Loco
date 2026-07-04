/**
 * Represents a background object in the game world.
 *
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new background object with a specific image and x-position.
   *
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
