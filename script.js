let canvas;
let world;
let keyboard = new Keyboard();
let isGameMuted = localStorage.getItem('isGameMuted') === 'true';
let sounds = new Sounds(isGameMuted);
let fullscreen = false;

function init() {
  console.log('localStorage Mute? ', isGameMuted);
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, sounds);
  // sounds.startLoop('theme');
}

function startGame() {
  isGameMuted = localStorage.getItem('isGameMuted') === 'true';
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, sounds);
  sounds.startLoop('theme');
}

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    keyboard.KEY_SPACE = true;
  }
  if (event.key === 'd') {
    keyboard.KEY_D = true;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.KEY_LEFT = true;
    world.character.isWalking = true;
  }
  if (event.key === 'ArrowUp') {
    keyboard.KEY_UP = true;
  }
  if (event.key === 'ArrowRight') {
    keyboard.KEY_RIGHT = true;
    world.character.isWalking = true;
  }
  if (event.key === 'ArrowDown') {
    keyboard.KEY_DOWN = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.key === ' ') {
    keyboard.KEY_SPACE = false;
  }
  if (event.key === 'd') {
    keyboard.KEY_D = false;
  }
  if (event.key === 'ArrowLeft') {
    keyboard.KEY_LEFT = false;
    world.character.isWalking = false;
  }
  if (event.key === 'ArrowUp') {
    keyboard.KEY_UP = false;
  }
  if (event.key === 'ArrowRight') {
    keyboard.KEY_RIGHT = false;
    world.character.isWalking = false;
  }
  if (event.key === 'ArrowDown') {
    keyboard.KEY_DOWN = false;
  }
});

function toggleMute() {
  isGameMuted = !isGameMuted;
  localStorage.setItem('isGameMuted', isGameMuted);
  if (world && world.sounds) {
    world.sounds.muteAll(isGameMuted);
  }
  updateMuteButton();
  document.getElementById('sound_btn').blur();
}

function updateMuteButton() {
  let btn = document.getElementById('sound_btn');
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
  let btn = document.getElementById('fullscreen_btn');
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
  console.log('exit fullscreen');
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
