class World {
  character = new Character();
  statusBar = new StatusBar(this.character.energy);
  bottleBar = new BottleBar();
  coinBar = new CoinBar();
  endboss = new Endboss();
  statusBarEndboss = new StatusBarEndboss(this.endboss.energy);
  enemies = level1.enemies;
  clouds = level1.clouds;
  bottles = level1.bottles;
  coins = level1.coins;
  backgroundObjects = level1.backgroundObjects;
  canvas;
  ctx;
  keyboard;
  level = level1;
  camera_x = 0;
  throwableObjects = [];
  bottleCount = 5;
  coinCount = 0;
  timeKeyDpressed = 1781619044044;

  constructor(canvas, keyboard, sounds) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.sounds = sounds;

    this.draw();
    this.setWorld();
    this.bottleBar.setBottleBar(this.bottleCount);
    this.coinBar.setCoinBar(this.coinCount);
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
    }, 1000 / 60);
  }

  checkThrownObjects() {
    if (this.keyboard.KEY_D && this.bottleCount > 0 && this.timeSinceObjectThrown(400, this.timeKeyDpressed)) {
      this.character.idleWait = 0;

      let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100);
      this.throwableObjects.push(bottle);
      
          this.sounds.play("bottleThrow");

      this.timeKeyDpressed = new Date().getTime();
      this.bottleCount -= 1;
      this.bottleBar.setBottleBar(this.bottleCount);
    }
    this.deleteBottleOutOfWorld();
  }

  deleteBottleOutOfWorld() {
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
    this.checkCollisionsWithCoins();
    this.checkCollisionEndbossWithFlyingBottle();
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.isDead()) return;
      if (this.jumpedOnChicken(enemy)) {
        this.character.speedY = 26;
        enemy.hit();
        enemy.dead = 1;
        this.sounds.play('chickenDead');
        return;
      }
      if (this.character.isColliding(enemy)) {
        this.world?.sounds?.play('hurt');
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  jumpedOnChicken(enemy) {
    if (enemy.isDead()) return false;
    if (!this.character.isColliding(enemy)) return false;
    if (this.character.speedY >= 0) return false;
    const characterBottom = this.character.y + this.character.height - this.character.offset.bottom;
    const characterPreviousBottom = this.character.lastY + this.character.height - this.character.offset.bottom;
    const enemyTop = enemy.y + enemy.offset.top;
    const maxLandingDepth = 20;
    const cameFromAbove = characterPreviousBottom <= enemyTop;
    const landedOnTop = characterBottom <= enemyTop + maxLandingDepth;
    return cameFromAbove && landedOnTop;
  }

  getHitbox(obj) {
    return {
      top: obj.y + obj.offset.top,
      bottom: obj.y + obj.height - obj.offset.bottom,
      left: obj.x + obj.offset.left,
      right: obj.x + obj.width - obj.offset.right,
    };
  }

  getPreviousBottom(obj) {
    return obj.lastY + obj.height - obj.offset.bottom;
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

  checkCollisionsWithCoins() {
    if (this.coinCount < 10) {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.coinCount += 1;
          this.coinBar.setCoinBar(this.coinCount);
          this.level.coins.splice(index, 1);
        }
      });
    }
  }

  checkCollisionEndbossWithFlyingBottle() {
    if (this.throwableObjects.length > 0) {
      for (let index = 0; index < this.throwableObjects.length; index++) {
        if (this.throwableObjects[index].isColliding(this.endboss)) {
          this.throwableObjects.splice(index, 1);
          this.endboss.hit();
          this.statusBarEndboss.setEndbossBar(this.endboss.energy);
          if (this.endboss.energy <= 0) {
            console.log('Endboss dead! - You won!');
          }
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
    this.addMultipleObjectsToMap(this.level.coins);
    this.addToMap(this.endboss);
    this.addToMap(this.character);
    this.addMultipleObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.endboss.displayStatusbarEndboss) {
      this.addToMap(this.statusBarEndboss);
    }

    // draw() wird immer wieder aufgerufen
    // let self = this;
    // requestAnimationFrame(function () {
    //   self.draw();
    // });
    requestAnimationFrame(() => {
      this.draw();
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
    // mo.drawFrame(this.ctx);

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
