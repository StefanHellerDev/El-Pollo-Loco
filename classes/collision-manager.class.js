/**
 * Manages all collision checks and collision-based interactions in the game world.
 */
class CollisionManager {
  lastStompTime = 0;
  stompDamageProtectionMs = 200;

  /**
   * Creates a new collision manager for a specific game world.
   *
   * @param {World} world - The game world whose collisions should be managed.
   */
  constructor(world) {
    this.world = world;
  }

  /**
   * Checks all relevant collisions in the game world.
   *
   * @returns {void}
   */
  checkCollisions() {
    this.checkCollisionsWithEnemies();
    this.checkCollisionsWithEndboss();
    this.checkCollisionsWithBottlesOnGround();
    this.checkCollisionsWithCoins();
    this.checkCollisionEndbossWithFlyingBottle();
  }

  /**
   * Checks collisions between the character and enemies.
   * Handles stomp collisions before damage collisions.
   *
   * @returns {void}
   */
  checkCollisionsWithEnemies() {
    const stompedEnemy = this.findStompedEnemy();

    if (stompedEnemy) {
      this.stompEnemy(stompedEnemy);
      return;
    }

    this.checkEnemyDamageCollisions();
  }

  /**
   * Finds the highest enemy currently stomped by the character.
   *
   * @returns {MovableObject|undefined} The stomped enemy, or undefined if no enemy was stomped.
   */
  findStompedEnemy() {
    return this.world.level.enemies
      .filter((enemy) => !enemy.isDead() && this.jumpedOnChicken(enemy))
      .sort((a, b) => HitboxUtils.getHitbox(a).top - HitboxUtils.getHitbox(b).top)[0];
  }

  /**
   * Checks whether enemies damage the character on collision.
   *
   * @returns {void}
   */
  checkEnemyDamageCollisions() {
    if (this.isStompProtected()) return;

    this.world.level.enemies.forEach((enemy) => {
      if (!enemy.isDead() && this.world.character.isColliding(enemy)) {
        this.damageCharacter();
      }
    });
  }

  /**
   * Damages the character and updates the health status bar.
   *
   * @returns {void}
   */
  damageCharacter() {
    this.world.character.hit();
    this.world.statusBar.setPercentage(this.world.character.energy);
  }

  /**
   * Handles stomping an enemy by repositioning the character,
   * bouncing the character upward, killing the enemy, and playing a sound.
   *
   * @param {MovableObject} enemy - The enemy that was stomped.
   * @returns {void}
   */
  stompEnemy(enemy) {
    const enemyBox = HitboxUtils.getHitbox(enemy);

    this.world.character.y = enemyBox.top - this.world.character.height + this.world.character.offset.bottom;
    this.world.character.speedY = 26;

    enemy.hit();
    enemy.dead = 1;

    this.lastStompTime = Date.now();
    this.world.sounds.play('chickenDead');
  }

  /**
   * Checks whether the character is temporarily protected after stomping an enemy.
   *
   * @returns {boolean} True if stomp damage protection is active, otherwise false.
   */
  isStompProtected() {
    return Date.now() - this.lastStompTime < this.stompDamageProtectionMs;
  }

  /**
   * Checks whether the character landed on top of a chicken enemy while falling.
   *
   * @param {MovableObject} enemy - The enemy to check against.
   * @returns {boolean} True if the character stomped the enemy, otherwise false.
   */
  jumpedOnChicken(enemy) {
    if (enemy.isDead()) return false;
    if (this.world.character.speedY >= 0) return false;

    const characterBox = HitboxUtils.getHitbox(this.world.character);
    const enemyBox = HitboxUtils.getHitbox(enemy);
    const previousBottom = HitboxUtils.getPreviousBottom(this.world.character);
    const crossedEnemyTop = previousBottom <= enemyBox.top && characterBox.bottom >= enemyBox.top;
    const overlap = HitboxUtils.getHorizontalOverlap(characterBox, enemyBox);
    const minOverlap = Math.min(12, (enemyBox.right - enemyBox.left) * 0.35);

    return crossedEnemyTop && overlap >= minOverlap;
  }

  /**
   * Checks collisions between the character and the endboss.
   *
   * @returns {void}
   */
  checkCollisionsWithEndboss() {
    const { character, endboss } = this.world;

    if (character.isColliding(endboss) && endboss.dead !== 1) {
      character.hit();
      this.world.statusBar.setPercentage(character.energy);
    }
  }

  /**
   * Checks whether the character collects bottles from the ground.
   *
   * @returns {void}
   */
  checkCollisionsWithBottlesOnGround() {
    if (this.world.bottleCount >= 10) return;

    this.world.level.bottles.forEach((bottle, index) => {
      if (this.world.character.isColliding(bottle)) {
        this.collectBottle(index);
      }
    });
  }

  /**
   * Collects a bottle, updates the bottle count, and removes it from the level.
   *
   * @param {number} index - The index of the collected bottle.
   * @returns {void}
   */
  collectBottle(index) {
    this.world.sounds.play('getBottle');
    this.world.bottleCount++;
    this.world.bottleBar.setBottleBar(this.world.bottleCount);
    this.world.level.bottles.splice(index, 1);
  }

  /**
   * Checks whether the character collects coins.
   *
   * @returns {void}
   */
  checkCollisionsWithCoins() {
    if (this.world.coinCount >= 10) return;

    this.world.level.coins.forEach((coin, index) => {
      if (this.world.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
   * Collects a coin, updates the coin count, and removes it from the level.
   *
   * @param {number} index - The index of the collected coin.
   * @returns {void}
   */
  collectCoin(index) {
    this.world.sounds.play('getCoin');
    this.world.coinCount++;
    this.world.coinBar.setCoinBar(this.world.coinCount);
    this.world.level.coins.splice(index, 1);
  }

  /**
   * Checks collisions between flying bottles and the endboss.
   *
   * @returns {void}
   */
  checkCollisionEndbossWithFlyingBottle() {
    const bottles = this.world.throwableObjects;

    for (let i = bottles.length - 1; i >= 0; i--) {
      if (bottles[i].isColliding(this.world.endboss)) {
        this.hitEndbossWithBottle(i);
      }
    }
  }

  /**
   * Handles a flying bottle hit on the endboss.
   *
   * @param {number} index - The index of the bottle that hit the endboss.
   * @returns {void}
   */
  hitEndbossWithBottle(index) {
    this.world.throwableObjects.splice(index, 1);
    this.world.endboss.hit();
    this.world.statusBarEndboss.setPercentage(this.world.endboss.energy);
  }
}
