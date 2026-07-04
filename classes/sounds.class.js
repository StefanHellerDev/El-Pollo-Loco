/**
 * Manages all game sounds, including playback, loops, volume settings,
 * and mute behavior.
 */
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

  /**
   * Creates a new sound manager, configures all sound settings,
   * applies the initial mute state, and updates the mute button.
   *
   * @param {boolean} isGameMuted - Indicates whether the game should start muted.
   */
  constructor(isGameMuted) {
    this.sounds.walk.loop = true;
    this.sounds.walk.volume = 0.4;
    this.sounds.jump.volume = 0.5;
    this.sounds.hurt.volume = 0.4;
    this.sounds.bottleThrow.volume = 0.5;
    this.sounds.getBottle.volume = 0.1;
    this.sounds.getCoin.volume = 0.5;
    this.sounds.sleep.loop = true;
    this.sounds.sleep.volume = 0.3;
    this.sounds.chickenDead.volume = 0.2;
    this.sounds.endbossHurt.volume = 0.5;
    this.sounds.endbossDead.volume = 0.9;
    this.sounds.theme.loop = true;
    this.sounds.theme.volume = 0.1;
    this.muteAll(isGameMuted);
    updateMuteButton();
  }

  /**
   * Plays a sound once from the beginning if sounds are not muted.
   *
   * @param {string} name - The name of the sound to play.
   * @returns {void}
   */
  play(name) {
    if (this.isMuted) return;

    const sound = this.sounds[name];
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  }

  /**
   * Starts playing a looping sound if it exists, is paused, and sounds are not muted.
   *
   * @param {string} name - The name of the loop sound to start.
   * @returns {void}
   */
  startLoop(name) {
    if (this.isMuted) return;

    const sound = this.sounds[name];
    if (!sound || !sound.paused) return;

    sound.play().catch((err) => {
      console.warn('Sound could not be played:', name, err);
    });
  }

  /**
   * Stops a sound and resets it to the beginning.
   *
   * @param {string} name - The name of the sound to stop.
   * @returns {void}
   */
  stop(name) {
    const sound = this.sounds[name];
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }

  /**
   * Stops all sounds and resets them to the beginning.
   *
   * @returns {void}
   */
  stopAll() {
    Object.values(this.sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Toggles the global mute state and stops all sounds when muted.
   *
   * @returns {void}
   */
  toggleMute() {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.stopAll();
    }
  }

  /**
   * Sets the mute state for all sounds.
   *
   * @param {boolean} status - The mute status to apply to all sounds.
   * @returns {void}
   */
  muteAll(status) {
    this.isMuted = status;
    Object.keys(this.sounds).forEach((key) => {
      this.sounds[key].muted = status;
    });
  }
}