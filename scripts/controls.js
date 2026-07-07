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
 * Binds a touch button that keeps a keyboard key active while pressed.
 *
 * @param {string} buttonId - The ID of the touch button.
 * @param {string} keyName - The keyboard property to update.
 * @returns {void}
 */
function bindHoldButton(buttonId, keyName) {
  const btn = document.getElementById(buttonId);
  if (!btn || !bindTouchOnce(btn)) return;

  btn.addEventListener('pointerdown', (e) => startHoldButton(e, btn, keyName));
  btn.addEventListener('pointerup', (e) => endHoldButton(e, btn, keyName));
  btn.addEventListener('pointercancel', (e) => cancelTouchInput(e, keyName));
  btn.addEventListener('lostpointercapture', () => setKeyboardKey(keyName, false));
  preventContextMenu(btn);
}

/**
 * Binds a touch button that activates a keyboard key for a short tap.
 *
 * @param {string} buttonId - The ID of the touch button.
 * @param {string} keyName - The keyboard property to update.
 * @returns {void}
 */
function bindTapButton(buttonId, keyName) {
  const btn = document.getElementById(buttonId);
  if (!btn || !bindTouchOnce(btn)) return;

  btn.addEventListener('pointerdown', (e) => tapKeyboardKey(e, keyName));
  preventContextMenu(btn);
}

/**
 * Marks a button as bound to prevent duplicate touch event listeners.
 *
 * @param {HTMLElement} btn - The button element to mark.
 * @returns {boolean} True if the button was not bound before, otherwise false.
 */
function bindTouchOnce(btn) {
  if (btn.dataset.touchBound === '1') return false;
  btn.dataset.touchBound = '1';
  return true;
}

/**
 * Starts a hold button interaction and activates the matching keyboard key.
 *
 * @param {PointerEvent} event - The pointer event triggered by pressing the button.
 * @param {HTMLElement} btn - The pressed button element.
 * @param {string} keyName - The keyboard property to activate.
 * @returns {void}
 */
function startHoldButton(event, btn, keyName) {
  event.preventDefault();
  btn.setPointerCapture?.(event.pointerId);
  setKeyboardKey(keyName, true);
}

/**
 * Ends a hold button interaction and deactivates the matching keyboard key.
 *
 * @param {PointerEvent} event - The pointer event triggered by releasing the button.
 * @param {HTMLElement} btn - The released button element.
 * @param {string} keyName - The keyboard property to deactivate.
 * @returns {void}
 */
function endHoldButton(event, btn, keyName) {
  event.preventDefault();
  btn.releasePointerCapture?.(event.pointerId);
  setKeyboardKey(keyName, false);
}

/**
 * Cancels a touch input and deactivates the matching keyboard key.
 *
 * @param {PointerEvent} event - The pointer event triggered by cancelling the input.
 * @param {string} keyName - The keyboard property to deactivate.
 * @returns {void}
 */
function cancelTouchInput(event, keyName) {
  event.preventDefault();
  setKeyboardKey(keyName, false);
}

/**
 * Activates a keyboard key briefly for tap-style touch controls.
 *
 * @param {PointerEvent} event - The pointer event triggered by tapping the button.
 * @param {string} keyName - The keyboard property to activate briefly.
 * @returns {void}
 */
function tapKeyboardKey(event, keyName) {
  event.preventDefault();
  setKeyboardKey(keyName, true);
  setTimeout(() => setKeyboardKey(keyName, false), 80);
}

/**
 * Prevents the browser context menu on a specific button.
 *
 * @param {HTMLElement} btn - The button element on which the context menu should be prevented.
 * @returns {void}
 */
function preventContextMenu(btn) {
  btn.addEventListener('contextmenu', (event) => event.preventDefault());
}

/**
 * Updates a keyboard key state and synchronizes related character states.
 *
 * @param {string} keyName - The keyboard property to update.
 * @param {boolean} value - The new key state.
 * @returns {void}
 */
function setKeyboardKey(keyName, value) {
  keyboard[keyName] = value;
  updateCharacterWalkingState(keyName);
}

/**
 * Updates the character walking state when left or right movement keys change.
 *
 * @param {string} keyName - The keyboard property that was updated.
 * @returns {void}
 */
function updateCharacterWalkingState(keyName) {
  if (!world?.character) return;
  if (keyName !== 'KEY_LEFT' && keyName !== 'KEY_RIGHT') return;

  world.character.isWalking = keyboard.KEY_LEFT || keyboard.KEY_RIGHT;
}

/**
 * Handles keydown events and activates the matching keyboard key.
 *
 * @param {KeyboardEvent} event - The keydown event.
 * @returns {void}
 */
function handleKeyDown(event) {
  setKeyFromEvent(event, true);
}

/**
 * Handles keyup events and deactivates the matching keyboard key.
 *
 * @param {KeyboardEvent} event - The keyup event.
 * @returns {void}
 */
function handleKeyUp(event) {
  setKeyFromEvent(event, false);
}

/**
 * Maps a keyboard event to a game input key and updates its state.
 *
 * @param {KeyboardEvent} event - The keyboard event to evaluate.
 * @param {boolean} value - The new key state.
 * @returns {void}
 */
function setKeyFromEvent(event, value) {
  const keyMap = getKeyMap();
  const keyName = keyMap[event.key];

  if (keyName) setKeyboardKey(keyName, value);
}

/**
 * Returns the mapping between browser key values and game keyboard properties.
 *
 * @returns {{' ': string, d: string, ArrowLeft: string, ArrowUp: string, ArrowRight: string, ArrowDown: string}} The keyboard mapping.
 */
function getKeyMap() {
  return {
    ' ': 'KEY_SPACE',
    d: 'KEY_D',
    ArrowLeft: 'KEY_LEFT',
    ArrowUp: 'KEY_UP',
    ArrowRight: 'KEY_RIGHT',
    ArrowDown: 'KEY_DOWN',
  };
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

/**
 * Checks whether the current device is a mobile touch device.
 *
 * @returns {boolean} True if the device is detected as a mobile touch device, otherwise false.
 */
function isMobileTouchDevice() {
  const hasTouch = navigator.maxTouchPoints > 0;
  const isPrimaryTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
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
  toggleTouchControls(controls, isMobileTouchDevice() && isLandscape);
}

/**
 * Shows or hides the touch controls.
 *
 * @param {HTMLElement} controls - The touch controls container.
 * @param {boolean} shouldShow - Indicates whether the touch controls should be visible.
 * @returns {void}
 */
function toggleTouchControls(controls, shouldShow) {
  controls.classList.toggle('d_none', !shouldShow);
  controls.classList.toggle('buttons_active', shouldShow);
}

window.addEventListener('resize', updateTouchControlsVisibility);
window.addEventListener('orientationchange', updateTouchControlsVisibility);

/**
 * Toggles the global mute state, stores it, applies it to the sound manager,
 * and updates the mute button.
 *
 * @returns {void}
 */
function toggleMute() {
  isGameMuted = !isGameMuted;
  localStorage.setItem('isGameMuted', isGameMuted);
  world?.sounds?.muteAll(isGameMuted);
  updateMuteButton();
  document.getElementById('sound_button')?.blur();
}

/**
 * Updates the visual state of the mute button.
 *
 * @returns {void}
 */
function updateMuteButton() {
  const btn = document.getElementById('sound_button');
  if (btn) btn.style.opacity = isGameMuted ? '1' : '0.4';
}

/**
 * Toggles fullscreen mode and updates the fullscreen button.
 *
 * @returns {void}
 */
function toggleFullscreen() {
  fullscreen = !fullscreen;

  fullscreen ? enterFullscreen(document.getElementById('fullscreen')) : exitFullscreen();
  updateFullscreenButton();
}

/**
 * Updates the visual state of the fullscreen button.
 *
 * @returns {void}
 */
function updateFullscreenButton() {
  const btn = document.getElementById('fullscreen_button');
  if (btn) btn.style.opacity = fullscreen ? '1' : '0.4';
}

/**
 * Opens fullscreen mode for a specific element.
 *
 * @param {HTMLElement} element - The element that should be displayed in fullscreen mode.
 * @returns {void}
 */
function enterFullscreen(element) {
  if (element?.requestFullscreen) element.requestFullscreen();
  else if (element?.webkitRequestFullscreen) element.webkitRequestFullscreen();
  else if (element?.msRequestFullscreen) element.msRequestFullscreen();
}

/**
 * Exits fullscreen mode if it is active.
 *
 * @returns {void}
 */
function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

window.addEventListener('DOMContentLoaded', () => {
  updateMuteButton();
  updateFullscreenButton();
  updateTouchControlsVisibility();
});
