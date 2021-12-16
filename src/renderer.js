/* eslint-disable no-undef */

function Renderer(context) {
  this.context = context;
  this.props = [];
}

Renderer.prototype.register = function (prop) {
  this.props.push(prop);
};

Renderer.prototype.rect = function ({ x, y, width, height }) {
  context.fillRect(x, y, width, height);
};

Renderer.prototype.draw = function (prop) {
  const { color, type, options } = prop;
  this.context.fillStyle = color || 'black';
  if (!type) return;
  this[type](options);
};

Renderer.prototype.drawAll = function () {
  this.props.forEach(this.draw.bind(this));
};

Renderer.prototype.clear = function () {
  const { width, height } = Config.field;
  this.context.clearRect(0, 0, width, height);
};
