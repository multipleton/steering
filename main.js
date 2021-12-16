/* eslint-disable no-undef */
const field = document.getElementById('game-field');
const context = field.getContext('2d');

const renderer = new Renderer(context);
const gameLoop = new GameLoop(renderer);
const engine = new Engine(gameLoop);

const player = new Player();
renderer.register(player.getProp());

engine.run();
