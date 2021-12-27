/* eslint-disable no-undef */

function Renderer(context) {
  this.context = context;
  this.props = [];
}

Renderer.prototype.register = function (prop) {
  if (Array.isArray(prop)) {
    this.props.push(...prop);
  } else {
    this.props.push(prop);
  }
};

Renderer.prototype.rect = function ({ x, y, width, height, radian }) {
  if (radian) {
    this.context.translate(x, y);
    this.context.rotate(radian);
    this.context.translate(-x, -y);
  }
  context.fillRect(x, y, width, height);
};

Renderer.prototype.line = function ({ points }) {
  this.context.beginPath();
  const start = points[0];
  this.context.moveTo(start.x, start.y);
  points.forEach(({ x, y }) =>
    this.context.lineTo(x, y));
  this.context.stroke();
};

Renderer.prototype.curve = function ({ points }) {
  this.context.beginPath();
  const start = points[0];
  this.context.moveTo(start.x, start.y);
  points.forEach(({ cpx, cpy, x, y }) =>
    this.context.quadraticCurveTo(cpx, cpy, x, y));
  this.context.stroke();
};

Renderer.prototype.draw = function (prop) {
  const { color, type, options } = prop;
  if (!type) return;
  this.context.fillStyle = color || 'black';
  this.context.strokeStyle = color || 'black';
  this[type](options);
  this.context.setTransform(1, 0, 0, 1, 0, 0);
};

Renderer.prototype.drawAll = function () {
  this.props.forEach(this.draw.bind(this));
};

Renderer.prototype.clear = function () {
  const { width, height } = Config.field;
  this.context.clearRect(0, 0, width, height);
};
