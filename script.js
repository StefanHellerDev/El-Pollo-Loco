/**
 * Stores the canvas element used to render the game.
 *
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Stores the current game world instance.
 *
 * @type {World}
 */
let world;

/**
 * Stores the current keyboard input state.
 *
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Indicates whether the game is currently muted.
 *
 * @type {boolean}
 */
let isGameMuted = localStorage.getItem('isGameMuted') === 'true';

/**
 * Stores the global sound manager instance.
 *
 * @type {Sounds}
 */
let sounds = new Sounds(isGameMuted);

/**
 * Indicates whether fullscreen mode is currently active.
 *
 * @type {boolean}
 */
let fullscreen = false;

/**
 * Starts the game by hiding the start screen, refreshing the mute state,
 * updating UI buttons, initializing the level, and creating the game world.
 *
 * @returns {void}
 */
function startGame() {
  hideStartScreen();
  refreshMuteState();
  updateMuteButton();
  updateFullscreenButton();
  initGame();
  init();
}

/**
 * Restarts the game by resetting the end screen, creating a new level,
 * and creating a new game world.
 *
 * @returns {void}
 */
function restartGame() {
  resetEndscreen();
  initGame();
  init();
}

/**
 * Hides the start screen and information button.
 *
 * @returns {void}
 */
function hideStartScreen() {
  document.getElementById('start_img_cont')?.classList.add('d_none');
  document.getElementById('information')?.classList.add('d_none');
}

/**
 * Shows the start screen and information button.
 *
 * @returns {void}
 */
function showStartScreen() {
  document.getElementById('start_img_cont')?.classList.remove('d_none');
  document.getElementById('information')?.classList.remove('d_none');
}

/**
 * Refreshes the mute state from local storage and applies it to all sounds.
 *
 * @returns {void}
 */
function refreshMuteState() {
  isGameMuted = localStorage.getItem('isGameMuted') === 'true';
  sounds?.muteAll?.(isGameMuted);
}

/**
 * Initializes the canvas, creates a new game world,
 * starts the theme sound, and initializes touch controls.
 *
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, sounds);
  sounds?.startLoop('theme');
  initTouchControls();
  updateTouchControlsVisibility();
}

/**
 * Hides the end screen and removes its active button state.
 *
 * @returns {void}
 */
function resetEndscreen() {
  const endscreen = document.getElementById('endscreen');
  endscreen?.classList.add('d_none');
  endscreen?.classList.remove('buttons_active');
}

/**
 * Ends the game, updates the end screen content,
 * hides touch controls, shows the end screen, and stops sounds after a delay.
 *
 * @param {string} deadPerson - The defeated character type.
 * @returns {void}
 */
function gameOver(deadPerson) {
  stopAllIntervals();

  const endImg = document.getElementById('end_img');
  const mainBtn = document.getElementById('button_main');

  setEndscreenContent(deadPerson, mainBtn, endImg);
  hideTouchButton();
  showEndscreen();
  stopSoundsDelayed();
}

/**
 * Sets the end screen image, button position, and sound based on who died.
 *
 * @param {string} deadPerson - The defeated character type.
 * @param {HTMLElement} mainBtn - The main button element on the end screen.
 * @param {HTMLImageElement} endImg - The end screen image element.
 * @returns {void}
 */
function setEndscreenContent(deadPerson, mainBtn, endImg) {
  if (deadPerson === 'character') {
    displayEndScreenWhenDead('250px', 'img/You won, you lost/You lost.png', 'characterDead', mainBtn, endImg);
  } else {
    displayEndScreenWhenDead('100px', 'img/You won, you lost/You won A.png', 'endbossDead', mainBtn, endImg);
  }
}

/**
 * Configures the end screen button position, image source, and sound.
 *
 * @param {string} left - The left position value for the main button.
 * @param {string} src - The image source for the end screen.
 * @param {string} soundName - The name of the sound to play.
 * @param {HTMLElement} mainBtn - The main button element on the end screen.
 * @param {HTMLImageElement} endImg - The end screen image element.
 * @returns {void}
 */
function displayEndScreenWhenDead(left, src, soundName, mainBtn, endImg) {
  if (mainBtn) mainBtn.style.left = left;
  if (endImg) endImg.src = src;
  world?.sounds?.play(soundName);
}

/**
 * Hides the touch control buttons and removes their active state.
 *
 * @returns {void}
 */
function hideTouchButton() {
  const controls = document.getElementById('touch_buttons_area');
  controls?.classList.add('d_none');
  controls?.classList.remove('buttons_active');
}

/**
 * Shows the end screen and activates its buttons.
 *
 * @returns {void}
 */
function showEndscreen() {
  const endscreen = document.getElementById('endscreen');
  endscreen?.classList.remove('d_none');
  endscreen?.classList.add('buttons_active');
}

/**
 * Stops all sounds after a short delay.
 *
 * @returns {void}
 */
function stopSoundsDelayed() {
  setTimeout(() => {
    world?.sounds?.stopAll();
  }, 2000);
}

/**
 * Stops all active intervals.
 *
 * @returns {void}
 */
function stopAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Returns to the main screen and hides the end screen.
 *
 * @returns {void}
 */
function backToMainScreen() {
  showStartScreen();
  resetEndscreen();
}
