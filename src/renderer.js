/* eslint-disable no-undef */

function Renderer(context) {
  this.context = context;
  this.props = [];
}

Renderer.prototype.register = function (prop) {
  this.props.push(prop);
};

Renderer.prototype.rect = function ({ x, y, width, height, radian }) {
  if (radian) {
    this.context.translate(x, y);
    this.context.rotate(radian);
    this.context.translate(-x, -y);
  }
  context.fillRect(x, y, width, height);
};

Renderer.prototype.draw = function (prop) {
  const { color, type, options } = prop;
  this.context.fillStyle = color || 'black';
  this.context.setTransform(1, 0, 0, 1, 0, 0);
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
