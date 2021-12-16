/* eslint-disable no-undef */

function Player() {
  this.prop = {
    color: Color.GREEN,
    type: PropType.RECT,
    options: {
      x: 500,
      y: 300,
      width: 32,
      height: 16,
      radian: 0,
    },
  };
  this.specs = {
    angle: 0,
    speed: 0,
    speedStep: 1,
    angleStep: 10,
  };
  EventEmiter.subscribe('arrow_up', () => this.increaseSpeed());
  EventEmiter.subscribe('arrow_down', () => this.decreaseSpeed());
  EventEmiter.subscribe('arrow_left', () => this.turnLeft());
  EventEmiter.subscribe('arrow_right', () => this.turnRight());
}

Player.prototype.getProp = function () {
  return this.prop;
};

Player.prototype.update = function () {
  const { prop, specs } = this;
  prop.options.radian = (Math.PI * specs.angle) / 180;
  const stepX = Math.cos(prop.options.radian) * specs.speed;
  const stepY = Math.sin(prop.options.radian) * specs.speed;
  prop.options.x += Number(parseFloat(stepX).toFixed(5));
  prop.options.y += Number(parseFloat(stepY).toFixed(5));
};

Player.prototype.increaseSpeed = function () {
  const { specs } = this;
  if (specs.speed + specs.speedStep > 5) return;
  specs.speed += specs.speedStep;
};

Player.prototype.decreaseSpeed = function () {
  const { specs } = this;
  if (specs.speed - specs.speedStep < 0) return;
  specs.speed -= specs.speedStep;
};

Player.prototype.turnLeft = function () {
  const { specs } = this;
  if (specs.speed === 0) return;
  specs.angle -= specs.angleStep;
  if (specs.angle === -1) {
    specs.angle = 359;
  }
};

Player.prototype.turnRight = function () {
  const { specs } = this;
  if (specs.speed === 0) return;
  specs.angle += specs.angleStep;
  if (specs.angle === 361) {
    specs.angle = 1;
  }
};
