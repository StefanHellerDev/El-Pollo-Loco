class World {
  character = new Character();
  statusBar = new StatusBar();
  bottleBar = new BottleBar();
  endboss = new Endboss();
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
  timeKeyDpressed = 0;

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
    this.endboss.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrownObjects();
    }, 1000 / 5);
  }

  checkThrownObjects() {
    if (this.keyboard.KEY_D && this.bottleCount > 0 && this.timeSinceObjectThrown(400, this.timeKeyDpressed)) {
      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.timeKeyDpressed = new Date().getTime();
      this.bottleCount -= 1;
      this.bottleBar.setBottleBar(this.bottleCount);
    }

    if (this.throwableObjects.length > 0) {
      for (let index = 0; index < this.throwableObjects.length; index++) {
        if (this.throwableObjects[index].y > 480) {
          this.throwableObjects.splice(index, 1);
        }
      }
    }
  }

  timeSinceObjectThrown(time, event) {
    let timePassed = new Date().getTime() - event;
    return timePassed > time;
  }

  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithEndboss();
    this.checkCollisionsWithBottlesOnGround();
    this.checkCollisionsWithFlyingBottle();
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.jumpedOnChicken(enemy)) {
        console.log('Sprung!');
      } else if (this.character.isColliding(enemy)) {
        if (enemy.dead != 1) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  jumpedOnChicken(enemy) {    
    return (this.character.isColliding(enemy) && this.character.isAboveGround() && (this.character.lastY < this.character.y));
  }

  checkCollisionsWithEndboss() {
    if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  checkCollisionsWithBottlesOnGround() {
    if (this.bottleCount < 10) {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.bottleCount += 1;
          this.bottleBar.setBottleBar(this.bottleCount);
          this.level.bottles.splice(index, 1);
        }
      });
    }
  }

  checkCollisionsWithFlyingBottle() {
    if (this.throwableObjects.length > 0) {
      for (let index = 0; index < this.throwableObjects.length; index++) {
        if (this.throwableObjects[index].isColliding(this.endboss)) {
          this.endboss.hit();
          if (this.endboss.energy <= 0) {
            console.log('Endboss dead!');
          }
          this.throwableObjects.splice(index, 1);
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addMultipleObjectsToMap(this.level.backgroundObjects);
    this.addMultipleObjectsToMap(this.level.clouds);
    this.addMultipleObjectsToMap(this.level.bottles);
    this.addMultipleObjectsToMap(this.level.enemies);
    this.addToMap(this.endboss);
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
