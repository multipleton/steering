/* eslint-disable no-undef */

const CHANGE_INTERVAL = 300;
const BOOST = 1;
const SPEED = 0.5;

function Human(player, { x, y }) {
  this.player = player;
  this.interval = Math.floor(Math.random() * 40) + CHANGE_INTERVAL - 20;
  this.specs = {
    dx: 0,
    dy: SPEED,
    baseX: Math.floor(Math.random() * 40) + x - 20,
    baseY: Math.floor(Math.random() * 40) + y - 20,
    i: this.interval,
  };
  this.prop = {
    color: Color.BLACK,
    type: PropType.RECT,
    options: {
      x: this.specs.baseX,
      y: this.specs.baseY,
      width: 8,
      height: 8,
    },
  };
}

Human.prototype.getProp = function () {
  return this.prop;
};

Human.prototype.update = function () {
  const { prop, specs } = this;

  playerX = this.player.getProp().options.x;
  playerY = this.player.getProp().options.y;

  distance = Math.sqrt(
    Math.pow(playerX - prop.options.x, 2) +
      Math.pow(playerY - prop.options.y, 2),
  );

  if (distance < 50) {
    if (playerX > prop.options.x) {
      prop.options.x += -BOOST;
    }
    if (playerX < prop.options.x) {
      prop.options.x += BOOST;
    }
    if (playerY > prop.options.y) {
      prop.options.y += -BOOST;
    }
    if (playerY < prop.options.y) {
      prop.options.y += BOOST;
    }
    return;
  }

  distanceToBase = Math.floor(
    Math.sqrt(
      Math.pow(prop.options.x - specs.baseX, 2) +
        Math.pow(prop.options.y - specs.baseY, 2),
    ),
  );

  if (
    distanceToBase >= Math.abs(specs.dy) * this.interval ||
    specs.baseX !== prop.options.x
  ) {
    if (specs.baseX > prop.options.x) {
      prop.options.x += SPEED;
    }
    if (specs.baseX < prop.options.x) {
      prop.options.x += -SPEED;
    }
    if (specs.baseY > prop.options.y) {
      prop.options.y += SPEED;
    }
    if (specs.baseY < prop.options.y) {
      prop.options.y += -SPEED;
    }
    return;
  }

  if (--specs.i < 0) {
    specs.i = this.interval;
    specs.dx = -specs.dx;
    specs.dy = -specs.dy;
  }
  prop.options.x += specs.dx;
  prop.options.y += specs.dy;
};
