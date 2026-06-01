class World {
  character = new Character();
  statusBar = new StatusBar();
  bottleBar = new BottleBar();
  enemies = level1.enemies;
  clouds = level1.clouds;
  bottles = level1.bottles;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  keyboard;
  level = level1;
  camera_x = 0;
  throwableObjects = [];
  bottleCount = 8;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.bottleBar.setBottleBar(this.bottleCount);
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 1000 / 5);
  }

  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithBottlesOnGround();
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsWithBottlesOnGround() {
    if (this.bottleCount < 10) {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          console.log('Bottle!', index);
          console.log(this.bottleCount);
          this.bottleCount += 1;
          this.bottleBar.setBottleBar(this.bottleCount);
          this.level.bottles.splice(index, 1);
        }
      });
    }
  }

  checkBottleCollisions() {
    this.throwableObjects.forEach((airBottle) => {
      if (this.level.enemies.isColliding(airBottle)) {
        console.log('Hit!');
      }
    });
  }

  checkThrowObjects() {
    if (this.keyboard.KEY_D && this.bottleCount > 0) {
      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.bottleCount -= 1;
      this.bottleBar.setBottleBar(this.bottleCount);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addMultipleObjectsToMap(this.level.backgroundObjects);
    this.addMultipleObjectsToMap(this.level.clouds);
    this.addMultipleObjectsToMap(this.level.bottles);
    this.addMultipleObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addMultipleObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);

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
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
