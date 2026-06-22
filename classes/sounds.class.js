class Sounds {
  isMuted = false;

  sounds = {
    walk: new Audio('sounds/run.mp3'),
    jump: new Audio('sounds/jump.mp3'),
    hurt: new Audio('sounds/mixkit-ow-exclamation-of-pain-2204.wav'),
    chickenDead: new Audio('sounds/chicken_dead.mp3'),
    bottleThrow: new Audio('sounds/bottle_throw.mp3'),
    theme: new Audio('sounds/El_pollo_Loco_theme.mp3'),
  };

  constructor() {
    this.sounds.walk.loop = true;
    this.sounds.walk.volume = 0.4;

    this.sounds.theme.loop = true;
    this.sounds.theme.volume = 0.3;

    this.sounds.jump.volume = 0.5;
    this.sounds.hurt.volume = 1;
    this.sounds.chickenDead.volume = 0.5;
    this.sounds.bottleThrow.volume = 0.5;
  }

  play(name) {
    if (this.isMuted) return;

    const sound = this.sounds[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  startLoop(name) {
    if (this.isMuted) return;

    const sound = this.sounds[name];
    if (!sound || !sound.paused) return;

    sound.play().catch((err) => {
      console.warn('Sound could not be played:', name, err);
    });
  }

  stop(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.stopAll();
    }
  }
}
