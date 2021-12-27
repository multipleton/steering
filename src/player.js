/* eslint-disable no-undef */

function Player(road) {
  this.road = road;
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
    speedCoefficient: 100,
    angleStep: 4,
  };
  EventEmiter.subscribe('arrow_up', () => this.increaseSpeed());
  EventEmiter.subscribe('arrow_down', () => this.decreaseSpeed());
  EventEmiter.subscribe('arrow_left', () => this.turnLeft());
  EventEmiter.subscribe('arrow_right', () => this.turnRight());
  this.setStartPos();
}

Player.prototype.getProp = function () {
  return this.prop;
};

Player.prototype.setStartPos = function () {
  const { options } = this.prop;
  const { start } = this.road;
  options.x = (start[0].x + start[1].x) / 2 + 20;
  options.y = (start[0].y + start[1].y) / 2;
};

Player.prototype.update = function () {
  this.updateSpeed();
  this.updatePosition();
};

Player.prototype.updateSpeed = function () {
  const { coating } = this.road;
  const { x, y } = this.prop.options;
  const playerIn = coating.some(entry => {
    const upX = Math.abs(x - entry.leftUp.x) > x && x < Math.abs(x - entry.rightUp.x);
    const leftY = Math.abs(y - entry.leftDown.y) > y && y < Math.abs(y - entry.leftDown.y);
    const downX = Math.abs(x - entry.leftDown.x) > x && x < Math.abs(x - entry.rightDown.x);
    const rightY = Math.abs(y - entry.rightDown.y) > y && y < Math.abs(y - entry.rightDown.y);
    return upX && leftY && rightY && downX;
  });
  if (!playerIn) {
    console.log('out');
  }
  this.specs.speedCoefficient = playerIn ? 100 : 50;
};

Player.prototype.updatePosition = function () {
  const { prop, specs } = this;
  prop.options.radian = (Math.PI * specs.angle) / 180;
  const stepX = Math.cos(prop.options.radian)
    * (specs.speed * (specs.speedCoefficient / 100));
  const stepY = Math.sin(prop.options.radian)
    * (specs.speed * (specs.speedCoefficient / 100));
  prop.options.x += Number(parseFloat(stepX).toFixed(5));
  prop.options.y += Number(parseFloat(stepY).toFixed(5));
};

Player.prototype.increaseSpeed = function () {
  const { specs } = this;
  if (specs.speed === 3) return;
  specs.speed += specs.speedStep;
};

Player.prototype.decreaseSpeed = function () {
  const { specs } = this;
  if (specs.speed === -1) return;
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
