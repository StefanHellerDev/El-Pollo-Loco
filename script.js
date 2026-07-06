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
console.log('isGameMuted:', isGameMuted);

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
 * Starts the game by hiding the start screen, initializing controls,
 * creating the level, creating the game world, and updating the UI.
 *
 * @returns {void}
 */
function startGame() {
  document.getElementById('start_img_cont').classList.add('d_none');
  document.getElementById('information').classList.add('d_none');
  isGameMuted = localStorage.getItem('isGameMuted') === 'true';
  console.log('isGameMuted:', isGameMuted);
  // sounds?.startLoop('theme');
  initTouchControls();
  updateMuteButton();
  updateFullscreenButton();
  initGame();
  init();
  updateTouchControlsVisibility();
}

/**
 * Restarts the game by hiding the end screen,
 * creating a new level, creating a new game world,
 * and updating the touch controls.
 *
 * @returns {void}
 */
function restartGame() {
  const endscreen = document.getElementById('endscreen');
  endscreen.classList.add('d_none');
  endscreen.classList.remove('buttons_active');
  initGame();
  init();
  updateTouchControlsVisibility();
}

/**
 * Checks whether the current device is a mobile touch device.
 *
 * @returns {boolean} True if the device is detected as a mobile touch device, otherwise false.
 */
function isMobileTouchDevice() {
  const hasTouch = navigator.maxTouchPoints > 0;
  const isPrimaryTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const ua = navigator.userAgent || '';
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
  const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return hasTouch && (isPrimaryTouch || isMobileUA || isIpadOS);
}

/**
 * Updates the visibility of the touch controls based on device type
 * and screen orientation.
 *
 * @returns {void}
 */
function updateTouchControlsVisibility() {
  const controls = document.getElementById('touch_buttons_area');
  if (!controls) return;
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  if (isMobileTouchDevice() && isLandscape) {
    controls.classList.remove('d_none');
    controls.classList.add('buttons_active');
  } else {
    controls.classList.add('d_none');
    controls.classList.remove('buttons_active');
  }
}

window.addEventListener('resize', updateTouchControlsVisibility);
window.addEventListener('orientationchange', updateTouchControlsVisibility);

/**
 * Initializes the canvas, creates a new game world,
 * initializes touch controls, and updates their visibility.
 *
 * @returns {void}
 */
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, sounds);
  initTouchControls();
  updateTouchControlsVisibility();
}

/**
 * Initializes all touch control buttons for movement, jumping, and throwing.
 *
 * @returns {void}
 */
function initTouchControls() {
  bindHoldButton('button_left', 'KEY_LEFT');
  bindHoldButton('button_right', 'KEY_RIGHT');
  bindHoldButton('button_jump', 'KEY_SPACE');
  bindTapButton('button_throw', 'KEY_D');
}

/**
 * Binds a touch button that keeps a keyboard key active while it is pressed.
 *
 * @param {string} buttonId - The ID of the button element.
 * @param {string} keyName - The keyboard property that should be updated.
 * @returns {void}
 */
function bindHoldButton(buttonId, keyName) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  if (btn.dataset.touchBound === '1') return;
  btn.dataset.touchBound = '1';

  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    btn.setPointerCapture?.(e.pointerId);
    setKeyboardKey(keyName, true);
  });

  btn.addEventListener('pointerup', (e) => {
    e.preventDefault();
    btn.releasePointerCapture?.(e.pointerId);
    setKeyboardKey(keyName, false);
  });

  btn.addEventListener('pointercancel', (e) => {
    e.preventDefault();
    setKeyboardKey(keyName, false);
  });

  btn.addEventListener('lostpointercapture', () => {
    setKeyboardKey(keyName, false);
  });

  btn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

/**
 * Binds a touch button that activates a keyboard key for a short tap.
 *
 * @param {string} buttonId - The ID of the button element.
 * @param {string} keyName - The keyboard property that should be updated.
 * @returns {void}
 */
function bindTapButton(buttonId, keyName) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  if (btn.dataset.touchBound === '1') return;
  btn.dataset.touchBound = '1';
  btn.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    setKeyboardKey(keyName, true);
    setTimeout(() => {
      setKeyboardKey(keyName, false);
    }, 80);
  });
  btn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}

/**
 * Updates a keyboard key state and synchronizes the character walking state.
 *
 * @param {string} keyName - The keyboard property that should be updated.
 * @param {boolean} value - The new key state.
 * @returns {void}
 */
function setKeyboardKey(keyName, value) {
  keyboard[keyName] = value;
  if (world?.character && (keyName === 'KEY_LEFT' || keyName === 'KEY_RIGHT')) {
    world.character.isWalking = keyboard.KEY_LEFT || keyboard.KEY_RIGHT;
  }
}

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') setKeyboardKey('KEY_SPACE', true);
  if (event.key === 'd') setKeyboardKey('KEY_D', true);
  if (event.key === 'ArrowLeft') setKeyboardKey('KEY_LEFT', true);
  if (event.key === 'ArrowUp') setKeyboardKey('KEY_UP', true);
  if (event.key === 'ArrowRight') setKeyboardKey('KEY_RIGHT', true);
  if (event.key === 'ArrowDown') setKeyboardKey('KEY_DOWN', true);
});

window.addEventListener('keyup', (event) => {
  if (event.key === ' ') setKeyboardKey('KEY_SPACE', false);
  if (event.key === 'd') setKeyboardKey('KEY_D', false);
  if (event.key === 'ArrowLeft') setKeyboardKey('KEY_LEFT', false);
  if (event.key === 'ArrowUp') setKeyboardKey('KEY_UP', false);
  if (event.key === 'ArrowRight') setKeyboardKey('KEY_RIGHT', false);
  if (event.key === 'ArrowDown') setKeyboardKey('KEY_DOWN', false);
});

/**
 * Toggles the global mute state, stores it in local storage,
 * updates the sound manager, and refreshes the mute button.
 *
 * @returns {void}
 */
function toggleMute() {
  isGameMuted = !isGameMuted;
  localStorage.setItem('isGameMuted', isGameMuted);
  if (world && world.sounds) {
    world.sounds.muteAll(isGameMuted);
  }
  updateMuteButton();
  document.getElementById('sound_button').blur();
}

/**
 * Updates the visual state of the mute button.
 *
 * @returns {void}
 */
function updateMuteButton() {
  let btn = document.getElementById('sound_button');
  if (isGameMuted) {
    btn.style.opacity = '1';
  } else {
    btn.style.opacity = '0.4';
  }
}

/**
 * Toggles fullscreen mode and updates the fullscreen button.
 *
 * @returns {void}
 */
function toggleFullscreen() {
  fullscreen = !fullscreen;
  if (fullscreen) {
    let element = document.getElementById('fullscreen');
    enterFullscreen(element);
  } else {
    exitFullscreen();
  }
  updateFullscreenButton();
}

/**
 * Updates the visual state of the fullscreen button.
 *
 * @returns {void}
 */
function updateFullscreenButton() {
  let btn = document.getElementById('fullscreen_button');
  if (fullscreen) {
    btn.style.opacity = '1';
  } else {
    btn.style.opacity = '0.4';
  }
}

/**
 * Opens fullscreen mode for a specific element.
 *
 * @param {HTMLElement} element - The element that should be displayed in fullscreen mode.
 * @returns {void}
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode if it is active.
 *
 * @returns {void}
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Adds a CSS class to the body when the current device supports touch input.
 *
 * @returns {void}
 */
function initTouchDeviceClass() {
  if (navigator.maxTouchPoints > 0) {
    document.body.classList.add('is-touch-device');
  }
}

/**
 * Ends the game, displays the correct end screen image,
 * adjusts the main button position, and hides the touch controls.
 *
 * @param {string} deadPerson - The defeated character type.
 * @returns {void}
 */
function gameOver(deadPerson) {
  stopAllIntervals();
  world.sounds.stopAll();
  let end_img = document.getElementById('end_img');
  let button_main = document.getElementById('button_main');
  if (deadPerson == 'character') {
    button_main.style.left = '250px';
    end_img.src = 'img/You won, you lost/You lost.png';
  } else {
    button_main.style.left = '100px';
    end_img.src = 'img/You won, you lost/You won A.png';
  }
  hideTouchButton();
  showEndscreen();
}

/**
 * Shows the end screen and activates its buttons.
 *
 * @returns {void}
 */
function showEndscreen() {
  let endscreen = document.getElementById('endscreen');
  endscreen.classList.remove('d_none');
  endscreen.classList.add('buttons_active');
}

/**
 * Hides the touch control buttons and removes their active state.
 *
 * @returns {void}
 */
function hideTouchButton() {
  let controls = document.getElementById('touch_buttons_area');
  controls.classList.add('d_none');
  controls.classList.remove('buttons_active');
}

/**
 * Stops all active intervals.
 *
 * @returns {void}
 */
function stopAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Returns from the end screen to the main start screen.
 *
 * @returns {void}
 */
function backToMainScreen() {
  document.getElementById('start_img_cont').classList.remove('d_none');
  document.getElementById('information').classList.remove('d_none');
  let controls = document.getElementById('endscreen');
  controls.classList.add('d_none');
  controls.classList.remove('buttons_active');
}
