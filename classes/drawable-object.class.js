/**
 * Represents a drawable object with position, size, image handling, and interval management.
 */
class DrawableObject {
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 280;
  lastY = 0;
  height = 150;
  width = 100;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  intervalIDs = [];

  /**
   * Loads a single image and stores it as the current object image.
   *
   * @param {string} path - The path to the image file.
   * @returns {void}
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images and stores them in the image cache.
   *
   * @param {string[]} array - The image paths to load.
   * @returns {void}
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Starts an interval and stores its ID so it can be stopped later.
   *
   * @param {Function} fn - The function that should be executed repeatedly.
   * @param {number} time - The interval time in milliseconds.
   * @returns {void}
   */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIDs.push(id);
  }
}
