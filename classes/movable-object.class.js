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
}
