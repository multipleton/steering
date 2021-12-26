/* eslint-disable no-undef */
const field = document.getElementById('game-field');
const context = field.getContext('2d');

const renderer = new Renderer(context);
const gameLoop = new GameLoop(renderer);
const engine = new Engine(gameLoop);

const keyboardHandler = new KeyboardHandler();
document.addEventListener('keydown', keyboardHandler);

const player = new Player();
renderer.register(player.getProp());
gameLoop.register(player);

const people = new People(player);
renderer.register(people.getProp());
gameLoop.register(people);


engine.run();
