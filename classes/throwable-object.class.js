/**
 * Represents a throwable salsa bottle that moves through the air
 * and plays a rotation animation.
 *
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  IMAGES_BOTTLEROTATION = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ];

  x;
  y;
  width;
  height;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  otherDirection;

  /**
   * Creates a new throwable bottle at a specific position and direction.
   *
   * @param {number} x - The x-position where the bottle starts.
   * @param {number} y - The y-position where the bottle starts.
   * @param {boolean} otherDirection - Indicates whether the bottle is thrown to the left.
   */
  constructor(x, y, otherDirection) {
    super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
    this.loadImages(this.IMAGES_BOTTLEROTATION);
    this.otherDirection = otherDirection;
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = this.width;
    this.throw();
  }

  /**
   * Throws the bottle, applies gravity, moves it horizontally,
   * and plays the rotation animation.
   *
   * @returns {void}
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();

    setInterval(() => {
      if (this.otherDirection) {
        this.x -= 14;
      } else {
        this.x += 14;
      }

      this.playAnimation(this.IMAGES_BOTTLEROTATION);
    }, 1000 / 20);
  }
}
