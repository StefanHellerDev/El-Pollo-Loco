let canvas;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My character is", world.character);
  console.log("Enemies", world.enemies);
}

window.addEventListener("keydown", (event) => {
  console.log(event);
});
