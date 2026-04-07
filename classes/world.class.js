class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud("img/5_background/layers/4_clouds/1.png")];
  backgroundObjects = [
    new BackgroundObject("../img/5_background/layers/air.png", 0),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/air.png", 720),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 720),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 720),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 720),
    new BackgroundObject("../img/5_background/layers/air.png", 1440),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 1440),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 1440),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 1440),
    new BackgroundObject("../img/5_background/layers/air.png", 2160),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 2160),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 2160),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 2160),
  ];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addMultipleObjectsToMap(this.backgroundObjects);
    this.addMultipleObjectsToMap(this.clouds);
    this.addMultipleObjectsToMap(this.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);

    // draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addMultipleObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
