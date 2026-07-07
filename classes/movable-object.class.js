/**
 * Represents a movable object with movement, gravity, collision,
 * damage, and animation behavior.
 *
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  dead = 0;

  /**
   * Moves the object to the left if it is not marked as dead.
   *
   * @returns {void}
   */
  moveLeft() {
    if (this.dead == 1) {
      this.speed = 0;
    } else {
      this.x -= this.speed;
    }
  }

  /**
   * Moves the object to the right.
   *
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Plays an animation by cycling through the given image paths.
   *
   * @param {string[]} images - The image paths used for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    let modulo = this.currentImage % images.length;
    let path = images[modulo];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the object and updates its vertical position.
   *
   * @returns {void}
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.lastY = this.y;
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
        this.lastY = this.y;
      }
    }, 1000 / 25);
  }

  /**
   * Checks whether the object is above the ground.
   *
   * @returns {boolean} True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      // return this.y < 480 - this.height - 60;
      return this.y < 170;
    }
  }

  /**
   * Makes the object jump and plays the jump sound if available.
   *
   * @returns {void}
   */
  jump() {
    this.speedY = 26;
    this.world?.sounds?.play('jump');
  }

  /**
   * Checks whether this object is colliding with another movable object.
   *
   * @param {MovableObject} mo - The object to check collision with.
   * @returns {boolean} True if both objects are colliding, otherwise false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Reduces the object's energy and stores the time of the hit.
   *
   * @returns {void}
   */
  hit() {
    if (this instanceof Character) {
      this.world?.sounds?.startLoop('hurt');
    }
    if (this instanceof Endboss) {
      this.world?.sounds?.startLoop('endbossHurt');
    }
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks whether the object has no energy left.
   *
   * @returns {boolean} True if the object is dead, otherwise false.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Checks whether the object was recently hit.
   *
   * @returns {boolean} True if the object is currently hurt, otherwise false.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;

    if (this instanceof Endboss) {
      return timePassed < 800;
    }

    return timePassed < 1000;
  }
}
