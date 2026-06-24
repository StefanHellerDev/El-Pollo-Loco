class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  dead = 0;

  moveLeft() {
    if (this.dead == 1) {
      this.speed = 0;
    } else {
      this.x -= this.speed;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  playAnimation(images) {
    let modulo = this.currentImage % images.length;
    let path = images[modulo];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

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

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      // return this.y < 480 - this.height - 60;
      return this.y < 170;
    }
  }

  jump() {
    this.speedY = 26;
    this.world?.sounds?.play('jump');
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

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

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit; // Milliseconds after hit
    if (this instanceof Endboss) {
      return timePassed < 1000 / 4;
    } else {
      return timePassed < 1000;
    }
  }
}
