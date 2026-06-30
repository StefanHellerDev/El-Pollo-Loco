class Sounds {
  isMuted = false;

  sounds = {
    walk: new Audio('sounds/run.mp3'),

    jump: new Audio('sounds/jump.mp3'),
    hurt: new Audio('sounds/mixkit-ow-exclamation-of-pain-2204.wav'),
    bottleThrow: new Audio('sounds/mixkit-quick-rope-throw-730.mp3'),
    getBottle: new Audio('sounds/get_bottle.mp3'),
    getCoin: new Audio('sounds/get_coin.mp3'),
    sleep: new Audio('sounds/mixkit-sleep-breathing-1914.wav'),

    chickenDead: new Audio('sounds/mixkit-creature-cry-of-hurt-2208.wav'),

    endbossHurt: new Audio('sounds/mixkit-aquatic-creature-scream-2203.wav'),
    endbossDead: new Audio('sounds/mixkit-arcade-space-shooter-dead-notification-272.wav'),

    theme: new Audio('sounds/El_pollo_Loco_theme.mp3'),
  };

  constructor(isGameMuted) {
    this.sounds.walk.loop = true;
    this.sounds.walk.volume = 0.4;

    this.sounds.jump.volume = 0.5;
    this.sounds.hurt.volume = 0.4;
    this.sounds.bottleThrow.volume = 0.5;
    this.sounds.getBottle.volume = 0.1;
    this.sounds.getCoin.volume = 0.5;
    this.sounds.sleep.volume = 0.4;

    this.sounds.chickenDead.volume = 0.2;

    this.sounds.endbossHurt.volume = 0.5;
    this.sounds.endbossDead.volume = 0.9;

    this.sounds.theme.loop = true;
    this.sounds.theme.volume = 0.2;
    this.muteAll(isGameMuted);
    updateMuteButton();
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

  muteAll(status) {
    this.isMuted = status;
    Object.keys(this.sounds).forEach((key) => {
      this.sounds[key].muted = status;
    });
  }
}
