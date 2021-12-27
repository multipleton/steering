function Engine(gameLoop, config = { fps: 60 }) {
  this.gameLoop = gameLoop;
  this.config = config;
  this.interval = null;
}

Engine.prototype.run = function () {
  const { fps } = this.config;
  this.interval = setInterval(() => {
    this.gameLoop.draw();
    this.gameLoop.update();
  }, 1000 / fps);
};
