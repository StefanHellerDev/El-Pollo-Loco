/**
 * Represents a cloud object that moves through the game world.
 *
 * @extends MovableObject
 */
class Cloud extends MovableObject {
  /**
   * Creates a new cloud with a specific image at a random x-position.
   *
   * @param {string} imagePath - The path to the cloud image.
   */
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 500;
    this.y = 20;
    this.width = 500;
    this.height = 250;
    this.animate();
  }

  /**
   * Starts the cloud movement.
   *
   * @returns {void}
   */
  animate() {
    this.moveLeft();
  }
}
