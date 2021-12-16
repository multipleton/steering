function GameLoop(renderer) {
  this.renderer = renderer;
}

GameLoop.prototype.draw = function () {
  this.renderer.clear();
  this.renderer.drawAll();
};

GameLoop.prototype.update = function () {};
