/**
 * Represents the main playable character and handles movement, gravity,
 * sounds, and character animations.
 *
 * @extends MovableObject
 */
class Character extends MovableObject {
  height = 250;
  width = (this.height / 1200) * 610;
  y = 100;
  world;
  speed = 10;
  idleWait = 0;
  offset = {
    top: 100,
    left: 20,
    right: 30,
    bottom: 5,
  };
  energy = 1000;
  isWalking;
  isJumpAnimationRunning = false;
  jumpImageIndex = 0;
  jumpAnimationSpeed = 120;
  groundY = 190;

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ];

  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONGIDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ];

  /**
   * Creates a new character, loads all animation images,
   * applies gravity, and starts the animation logic.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts all character-related animation and movement intervals.
   *
   * @returns {void}
   */
  animate() {
    this.idleAnimations();
    this.movement();
    this.animations();
    this.jumping();
    this.jumpAnimation();
  }

  /**
   * Checks for jump input and starts the jump behavior if jumping is allowed.
   *
   * @returns {void}
   */
  jumping() {
    setInterval(() => {
      if (!this.canStartJump()) return;

      this.idleWait = 0;
      this.world.sounds.stop('sleep');
      this.jump();
      this.startJumpAnimation();
    }, 1000 / 20);
  }

  /**
   * Checks whether the character can start a jump.
   *
   * @returns {boolean} True if jump input is active and the character is allowed to jump, otherwise false.
   */
  canStartJump() {
    return (this.world.keyboard.KEY_UP || this.world.keyboard.KEY_SPACE) && !this.isAboveGround() && !this.isDead();
  }

  /**
   * Starts the jump animation from the first jump image.
   *
   * @returns {void}
   */
  startJumpAnimation() {
    this.isJumpAnimationRunning = true;
    this.jumpImageIndex = 0;
  }

  /**
   * Plays the jump animation frame by frame while the jump animation is active.
   * Stops the jump animation when the character dies and pauses it while the character is hurt.
   *
   * @returns {void}
   */
  jumpAnimation() {
    this.setStoppableInterval(() => {
      if (!this.isJumpAnimationRunning) return;
      if (this.isDead()) return this.cancelJumpAnimation();
      if (this.isHurt()) return;

      this.playNextJumpFrame();
    }, this.jumpAnimationSpeed);
  }

  /**
   * Checks whether the jump animation should be blocked by another character state.
   *
   * @returns {boolean} True if the character is hurt or dead, otherwise false.
   */
  shouldBlockJumpAnimation() {
    return this.isHurt() || this.isDead();
  }

  /**
   * Cancels the current jump animation and resets its image index.
   *
   * @returns {void}
   */
  cancelJumpAnimation() {
    this.isJumpAnimationRunning = false;
    this.jumpImageIndex = 0;
  }

  /**
   * Plays the next frame of the jump animation.
   *
   * @returns {void}
   */
  playNextJumpFrame() {
    const path = this.IMAGES_JUMPING[this.jumpImageIndex];
    this.img = this.imageCache[path];
    this.jumpImageIndex++;

    if (this.jumpImageIndex >= this.IMAGES_JUMPING.length) {
      this.cancelJumpAnimation();
    }
  }

  /**
   * Plays the correct character animation based on the current character state.
   *
   * @returns {void}
   */
  animations() {
    this.setStoppableInterval(() => {
      if (this.isDead()) return this.playDeadAnimation();
      if (this.isHurt()) return this.playHurtAnimation();
      if (this.shouldPlayWalkAnimation()) this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 20);
  }

  /**
   * Plays the character death animation, cancels the jump animation,
   * and triggers the game-over state.
   *
   * @returns {void}
   */
  playDeadAnimation() {
    this.cancelJumpAnimation();
    this.playAnimation(this.IMAGES_DEAD);
    gameOver('character');
  }

  /**
   * Plays the character hurt animation.
   *
   * @returns {void}
   */
  playHurtAnimation() {
    this.playAnimation(this.IMAGES_HURT);
  }

  /**
   * Checks whether the walking animation should be played.
   *
   * @returns {boolean} True if the character is on the ground and moving left or right, otherwise false.
   */
  shouldPlayWalkAnimation() {
    return !this.isAboveGround() && (this.world.keyboard.KEY_RIGHT || this.world.keyboard.KEY_LEFT);
  }

  /**
   * Handles character movement, walking sounds, and camera position.
   *
   * @returns {void}
   */
  movement() {
    setInterval(() => {
      this.characterMovesRight();
      this.characterMovesLeft();

      if (this.isWalking && !this.isAboveGround()) {
        this.world.sounds.startLoop('walk');
      } else {
        this.world.sounds.stop('walk');
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Moves the character to the left if the left key is pressed
   * and the character is inside the allowed world boundaries.
   *
   * @returns {void}
   */
  characterMovesLeft() {
    if (this.world.keyboard.KEY_LEFT && this.x > 100) {
      this.idleWait = 0;
      this.world.sounds.stop('sleep');
      this.moveLeft();
      this.otherDirection = true;
      this.isWalking = true;
    }
  }

  /**
   * Moves the character to the right if the right key is pressed
   * and the character has not reached the level end.
   *
   * @returns {void}
   */
  characterMovesRight() {
    if (this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x) {
      this.idleWait = 0;
      this.world.sounds.stop('sleep');
      this.moveRight();
      this.otherDirection = false;
      this.isWalking = true;
    }
  }

  /**
   * Plays the idle animation and switches to the long idle animation
   * after the character has been inactive for a while.
   *
   * @returns {void}
   */
  idleAnimations() {
    setInterval(() => {
      if (this.isAboveGround() || this.isHurt() || this.isDead() || this.isJumpAnimationRunning) return;

      this.playAnimation(this.IMAGES_IDLE);
      this.idleWait++;

      if (this.idleWait > 25) {
        this.world.sounds.startLoop('sleep');
        this.playAnimation(this.IMAGES_LONGIDLE);
      }
    }, 1000 / 5);
  }
}
