class MovableObject {
  x = 100;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  energy = 100;
  lastHit = 0;
  timePassed = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      ctx.beginPath();
      ctx.lineWidth = '2';
      if (this instanceof Character) {
        ctx.strokeStyle = 'blue';
      } else {
        ctx.strokeStyle = 'red';
      }
      // ctx.rect(this.x, this.y, this.width, this.height);
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
      ctx.stroke();
    }
  }

  moveLeft() {
    this.x -= this.speed;
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
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 480 - this.height - 60;
  }

  jump() {
    this.speedY = 25;
  }

  isColliding(mo) {
    if (this instanceof Character) {
      // console.log(this.x + this.width - this.offset.right, ">", mo.x + mo.offset.left);
      // console.log(this.y);
      // console.log(this.y + this.height - this.offset.bottom, ">", mo.y + mo.offset.top);
      // console.log(this.x + this.offset.left, "<", mo.x + mo.width - mo.offset.right);
      // console.log(this.y + this.offset.top, "<", mo.y + mo.height - mo.offset.bottom);
    }
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    console.log('Collision with character, energy: ', this.energy);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    this.timePassed = new Date().getTime() - this.lastHit; // Milliseconds after hit
    return this.timePassed < 1000;
  }
}
