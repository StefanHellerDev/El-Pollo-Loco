let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let isGameMuted = localStorage.getItem('isGameMuted') === 'true';

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard, sounds);
  sounds.startLoop('theme');
}

function startGame() {
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
    btn.style.opacity = '0.4';
  } else {
    btn.style.opacity = '1';
  }
}
