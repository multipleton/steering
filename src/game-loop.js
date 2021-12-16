function GameLoop(renderer) {
  this.renderer = renderer;
  this.entities = [];
}

GameLoop.prototype.register = function (entity) {
  this.entities.push(entity);
};

GameLoop.prototype.draw = function () {
  this.renderer.clear();
  this.renderer.drawAll();
};

GameLoop.prototype.update = function () {
  this.entities.forEach(entity => entity.update());
};
