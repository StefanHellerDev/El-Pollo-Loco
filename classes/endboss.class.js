/**
 * Represents the final boss enemy and handles its movement, attacks,
 * animations, and game-over behavior.
 *
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  // 1045x1217; height durch 1217, mal 1045
  height = 500;
  width = (this.height / 1217) * 1045;
  y = 480 - this.height - 10;
  energy = 30; // 5 less per hit
  speed = 0.05;
  displayStatusbarEndboss = false;
  isAttacking = false;
  lastSpeed = this.speed;
  hadFirstContact = false;
  shouldAttackAfterHurt = false;
  wasHurtBefore = false;
  alertAnimationCounter = 0;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ];

  IMAGES_HURT = ['img/4_enemie_boss_chicken/4_hurt/G21.png', 'img/4_enemie_boss_chicken/4_hurt/G22.png', 'img/4_enemie_boss_chicken/4_hurt/G23.png'];

  IMAGES_DEAD = ['img/4_enemie_boss_chicken/5_dead/G24.png', 'img/4_enemie_boss_chicken/5_dead/G25.png', 'img/4_enemie_boss_chicken/5_dead/G26.png'];

  offset = {
    top: 100,
    left: 10,
    right: 5,
    bottom: 0,
  };

  /**
   * Creates a new endboss, loads all animation images,
   * sets its start position, and starts its animation logic.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3700;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Starts the movement interval and the endboss state animation interval.
   *
   * @returns {void}
   */
  animate() {
    this.setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playEndbossStateAnimation();
    }, 1000 / 6);
  }

  /**
   * Plays the correct endboss animation based on its current state.
   *
   * @returns {void}
   */
  playEndbossStateAnimation() {
    if (this.handleDeadState()) return;
    if (this.handleHurtState()) return;
    if (this.handleAttackAfterHurt()) return;
    if (this.handleCurrentAttack()) return;

    this.updateFirstContactState();

    if (this.handleAlertState()) return;

    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Handles the endboss death state.
   *
   * @returns {boolean} True if the death state was handled, otherwise false.
   */
  handleDeadState() {
    if (!this.isDead()) return false;

    this.endbossIsDead();
    return true;
  }

  /**
   * Handles the endboss hurt state and prepares a counterattack.
   *
   * @returns {boolean} True if the hurt state was handled, otherwise false.
   */
  handleHurtState() {
    if (!this.isHurt()) return false;

    this.shouldAttackAfterHurt = true;
    this.playAnimation(this.IMAGES_HURT);
    return true;
  }

  /**
   * Handles the endboss attack that should start after being hurt.
   *
   * @returns {boolean} True if the attack was started, otherwise false.
   */
  handleAttackAfterHurt() {
    if (!this.shouldAttackAfterHurt) return false;

    this.shouldAttackAfterHurt = false;
    this.endbossIsAttacking();
    return true;
  }

  /**
   * Handles the currently running endboss attack animation.
   *
   * @returns {boolean} True if the attack animation was handled, otherwise false.
   */
  handleCurrentAttack() {
    if (!this.isAttacking) return false;

    this.playAnimation(this.IMAGES_ATTACK);
    return true;
  }

  /**
   * Updates the first contact state when the character gets close to the endboss.
   *
   * @returns {void}
   */
  updateFirstContactState() {
    if (!this.isCharacterClose() || this.hadFirstContact) return;

    this.displayStatusbarEndboss = true;
    this.alertAnimationCounter = 0;
    this.hadFirstContact = true;
  }

  /**
   * Plays the alert animation after the first contact with the character.
   *
   * @returns {boolean} True if the alert animation was handled, otherwise false.
   */
  handleAlertState() {
    if (!this.hadFirstContact || this.alertAnimationCounter >= 10) return false;

    this.playAnimation(this.IMAGES_ALERT);
    this.alertAnimationCounter++;
    return true;
  }

  /**
   * Checks whether the character is close enough to activate the endboss.
   *
   * @returns {boolean} True if the character is close to the endboss, otherwise false.
   */
  isCharacterClose() {
    return this.x - this.world.character.x < 400;
  }

  /**
   * Handles the endboss attack by temporarily increasing its speed
   * and playing the attack animation.
   *
   * @returns {void}
   */
  endbossIsAttacking() {
    if (this.isDead() || this.isHurt()) return;

    if (this.isAttacking) {
      this.playAnimation(this.IMAGES_ATTACK);
      return;
    }

    this.isAttacking = true;
    this.lastSpeed = this.speed;
    this.speed = 6;

    setTimeout(() => {
      this.speed = this.lastSpeed;
      this.isAttacking = false;
    }, 450);

    this.playAnimation(this.IMAGES_ATTACK);
  }

  /**
   * Handles the endboss death animation, changes its final position,
   * and triggers the game-over state.
   *
   * @returns {void}
   */
  endbossIsDead() {
    this.dead = 1;
    this.playAnimation(this.IMAGES_DEAD);

    setTimeout(() => {
      this.y = 480 - this.height / 2 - 50;
      this.loadImage(this.IMAGES_DEAD[1]);
    }, 1000);

    gameOver('endboss');
  }
}
