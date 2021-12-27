/* eslint-disable no-undef */
const field = document.getElementById('game-field');
const context = field.getContext('2d');

const renderer = new Renderer(context);
const gameLoop = new GameLoop(renderer);
const engine = new Engine(gameLoop);

const keyboardHandler = new KeyboardHandler();
document.addEventListener('keydown', keyboardHandler);

const road = Road.Random();
renderer.register(road.getProp());

const player = new Player();
renderer.register(player.getProp());
gameLoop.register(player);

const racer = new Racer(road, { x: 450, y: 900 });
renderer.register(racer.getProp());
gameLoop.register(racer);

const racer1 = new Racer(road, { x: 380, y: 900 });
renderer.register(racer1.getProp());
gameLoop.register(racer1);

for (let i = 0; i < 5; i++) {
  const human = new Human(player, { x: 300, y: 120 });
  renderer.register(human.getProp());
  gameLoop.register(human);
}

for (let i = 0; i < 5; i++) {
  const human = new Human(player, { x: 1300, y: 80 });
  renderer.register(human.getProp());
  gameLoop.register(human);
}

for (let i = 0; i < 5; i++) {
  const human = new Human(player, { x: 1000, y: 880 });
  renderer.register(human.getProp());
  gameLoop.register(human);
}

engine.run();
