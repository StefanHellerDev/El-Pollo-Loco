class Endboss extends MovableObject {
  // 1045x1217; height durch 1217, mal 1045
  height = 500;
  width = (this.height / 1217) * 1045;
  y = 480 - this.height - 10;
  energy = 30;
  speed = 0.05;
  lastSpeed;
  displayStatusbarEndboss = false;
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

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 3700;
    // this.speed = 0.15 + Math.random() * 0.25;
    this.speed = 0.05;
    this.animate();
  }

  animate() {
    this.setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.dead = 1;
        // this.world.sounds.play('endbossDead');
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          this.y = 480 - this.height / 2 - 50;
          this.loadImage(this.IMAGES_DEAD[1]);
        }, 1000);
      } else if (this.world.endboss.isHurt()) {
        console.log('Endboss is attacked');
        this.endbossIsAttacking();
      } else if (this.characterIsCloseToEndboss()) {
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 4);
  }

  characterIsCloseToEndboss() {
    if (this.world.endboss.x - this.world.character.x < 400) {
      this.displayStatusbarEndboss = true;
      return true;
    } else {
      return false;
    }
  }

  endbossIsAttacking() {
    this.lastSpeed = this.speed;
    this.speed = 6;
    this.playAnimation(this.IMAGES_ATTACK);
    setTimeout(() => {
      this.speed = this.lastSpeed;
      this.playAnimation(this.IMAGES_ATTACK);
    }, 1000 / 4);
  }
}
