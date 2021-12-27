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

engine.run();
