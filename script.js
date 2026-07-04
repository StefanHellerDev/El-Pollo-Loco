let canvas;
let world;
let keyboard = new Keyboard();
let isGameMuted = localStorage.getItem('isGameMuted') === 'true';
let sounds = new Sounds(isGameMuted);
let fullscreen = false;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, sounds);
}

function startGame() {
  initTouchDeviceClass();
  document.getElementById('start_img_cont').classList.add('d_none');
  isGameMuted = localStorage.getItem('isGameMuted') === 'true';
  sounds?.startLoop('theme');

  initTouchControls();
  updateMuteButton();
  updateFullscreenButton();

  const isTouchLandscape = window.matchMedia('(pointer: coarse) and (orientation: landscape) and (max-height: 500px)').matches;
  if (isTouchLandscape) {
    let controls = document.getElementById('touch_buttons_area');
    controls.classList.remove('d_none');
    controls.classList.add('buttons_active');
  }
  initGame();
  init();
}

function initTouchControls() {
  bindHoldButton('button_left', 'KEY_LEFT');
  bindHoldButton('button_right', 'KEY_RIGHT');
  bindHoldButton('button_jump', 'KEY_SPACE');
  bindTapButton('button_throw', 'KEY_D');
}

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

function toggleMute() {
  isGameMuted = !isGameMuted;
  localStorage.setItem('isGameMuted', isGameMuted);
  if (world && world.sounds) {
    world.sounds.muteAll(isGameMuted);
  }
  updateMuteButton();
  document.getElementById('sound_button').blur();
}

function updateMuteButton() {
  let btn = document.getElementById('sound_button');
  if (isGameMuted) {
    btn.style.opacity = '1';
  } else {
    btn.style.opacity = '0.4';
  }
}

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

function updateFullscreenButton() {
  let btn = document.getElementById('fullscreen_button');
  if (fullscreen) {
    btn.style.opacity = '1';
  } else {
    btn.style.opacity = '0.4';
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function initTouchDeviceClass() {
  if (navigator.maxTouchPoints > 0) {
    document.body.classList.add('is-touch-device');
  }
}

function gameOver(deadPerson) {
  stopAllIntervals();
  let end_img = document.getElementById('end_img');
  if (deadPerson == 'character') {
    end_img.src = 'img/You won, you lost/You lost.png';
  } else {
    end_img.src = 'img/You won, you lost/You won A.png';
  }
  let controls = document.getElementById('endscreen');
  controls.classList.remove('d_none');
  controls.classList.add('buttons_active');
}

function stopAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function restartGame() {
  let controls = document.getElementById('endscreen');
  controls.classList.add('d_none');
  controls.classList.remove('buttons_active');
  initGame();
  init();
}

function backToMainScreen() {
  document.getElementById('start_img_cont').classList.remove('d_none');
  let controls = document.getElementById('endscreen');
  controls.classList.add('d_none');
  controls.classList.remove('buttons_active');
}
