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

  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIDs.push(id);
  }
}
