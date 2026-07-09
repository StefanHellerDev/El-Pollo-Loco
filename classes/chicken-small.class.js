/**
 * Represents a small chicken enemy that moves through the game world.
 *
 * @extends MovableObject
 */
class ChickenSmall extends MovableObject {
  // 236x210; height durch 210, mal 236
  height = 40;
  width = (this.height / 210) * 236;
  y = 480 - this.height - 50; // y = 390
  offset = {
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
  };
  energy = 5;

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ];

  IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

  /**
   * Creates a new small chicken enemy at a random position with random movement speed.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 1000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * Starts the movement and animation intervals of the small chicken.
   *
   * @returns {void}
   */
  animate() {
    this.setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.animations();
  }

  /**
   * Plays the walking animation or the dead animation depending on the chicken's state.
   *
   * @returns {void}
   */
  animations() {
    setInterval(() => {
      if (this.isDead()) {
        this.dead = 1;
        this.playAnimation(this.IMAGES_DEAD);

        setTimeout(() => {
          this.y = 1000 * 2;
        }, 1000 * 2);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 5);
  }
}
