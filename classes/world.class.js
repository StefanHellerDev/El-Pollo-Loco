/**
 * Represents the main game world and coordinates the character,
 * enemies, level objects, status bars, managers, and rendering.
 */
class World {
  character = new Character();
  endboss = new Endboss();

  enemies = level1.enemies;
  clouds = level1.clouds;
  bottles = level1.bottles;
  coins = level1.coins;
  backgroundObjects = level1.backgroundObjects;

  level = level1;
  camera_x = 0;
  throwableObjects = [];

  bottleCount = 5;
  coinCount = 0;

  statusBar = new HealthStatusBar(this.character.energy);
  bottleBar = new BottleBar(this.bottleCount);
  coinBar = new CoinBar(this.coinCount);
  statusBarEndboss = new EndbossStatusBar(this.endboss.energy);

  /**
   * Creates a new game world, initializes rendering,
   * connects input and sounds, and starts the game loop.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element used to render the game.
   * @param {Keyboard} keyboard - The keyboard input state used to control the character.
   * @param {Sounds} sounds - The sound manager used to play game sounds.
   */
  constructor(canvas, keyboard, sounds) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.keyboard = keyboard;
    this.sounds = sounds;

    this.setWorld();
    this.initManagers();
    this.initBars();
    this.run();
    this.renderer.draw();
  }

  /**
   * Assigns the current world instance to objects that need world access.
   *
   * @returns {void}
   */
  setWorld() {
    this.character.world = this;
    this.endboss.world = this;
  }

  /**
   * Initializes the collision, throwable object, and rendering managers.
   *
   * @returns {void}
   */
  initManagers() {
    this.collisionManager = new CollisionManager(this);
    this.throwableManager = new ThrowableManager(this);
    this.renderer = new WorldRenderer(this);
  }

  /**
   * Initializes the collectible status bars with their current values.
   *
   * @returns {void}
   */
  initBars() {
    this.bottleBar.setBottleBar(this.bottleCount);
    this.coinBar.setCoinBar(this.coinCount);
  }

  /**
   * Starts the main game loop for collision checks and throwable objects.
   *
   * @returns {void}
   */
  run() {
    setInterval(() => {
      this.collisionManager.checkCollisions();
      this.throwableManager.checkThrownObjects();
    }, 1000 / 60);
  }

  /**
   * Resets the character idle timer and stops the sleep sound.
   *
   * @returns {void}
   */
  stopSleepSound() {
    this.character.idleWait = 0;
    this.sounds.stop('sleep');
  }
}
