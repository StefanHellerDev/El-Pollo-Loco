class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 100;
  y = 280;
  height = 150;
  width = 100;

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
}
