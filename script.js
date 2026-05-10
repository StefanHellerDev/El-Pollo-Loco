let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
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
  }
  if (event.key === 'ArrowUp') {
    keyboard.KEY_UP = true;
  }
  if (event.key === 'ArrowRight') {
    keyboard.KEY_RIGHT = true;
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
  }
  if (event.key === 'ArrowUp') {
    keyboard.KEY_UP = false;
  }
  if (event.key === 'ArrowRight') {
    keyboard.KEY_RIGHT = false;
  }
  if (event.key === 'ArrowDown') {
    keyboard.KEY_DOWN = false;
  }
});
