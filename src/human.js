/* eslint-disable no-undef */

const CHANGE_INTERVAL = 240;
const BOOST = 0.8;

function Human(player, { x, y }) {
  this.player = player;
  this.interval = Math.floor(Math.random() * 40) + CHANGE_INTERVAL - 20;
  this.specs = {
    dx: 0,
    dy: 0.5,
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

  if (--specs.i < 0) {
    specs.i = this.interval;
    specs.dx = -specs.dx;
    specs.dy = -specs.dy;
  }
  prop.options.x += specs.dx;
  prop.options.y += specs.dy;
};
