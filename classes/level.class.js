/**
 * Represents a game level with enemies, clouds, background objects,
 * collectible bottles, collectible coins, and the level end position.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  bottles;
  coins;
  level_end_x = 720 * 5 + 100; // level_end_x = 3700

  /**
   * Creates a new level with all required game objects.
   *
   * @param {MovableObject[]} enemies - The enemies placed in the level.
   * @param {Cloud[]} clouds - The clouds displayed in the level.
   * @param {BackgroundObject[]} backgroundObjects - The background objects of the level.
   * @param {Bottle[]} bottles - The collectible bottles placed in the level.
   * @param {Coin[]} coins - The collectible coins placed in the level.
   */
  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
