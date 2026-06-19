class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 720 * 5 + 100; // level_end_x = 3700

  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
