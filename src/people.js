/* eslint-disable no-undef */

const CHANGE_INTERVAL = 240;
let i = CHANGE_INTERVAL;
let dx = 0;
let dy = 0.5;

function People(player) {
  this.player = player;
  this.prop = {
    color: Color.BLACK,
    type: PropType.RECT,
    options: {
      x: 100,
      y: 300,
      width: 8,
      height: 8,
    },
  };
}

People.prototype.getProp = function () {
  return this.prop;
};

People.prototype.update = function () {
  const { prop } = this;

  playerX = this.player.getProp().options.x;
  playerY = this.player.getProp().options.y;

  distance = Math.sqrt(Math.pow((playerX - prop.options.x), 2) + Math.pow((playerY - prop.options.y), 2));

  if (distance < 50) {
    const BOOST = 0.8;
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

  if (--i < 0) { 
    i = CHANGE_INTERVAL;
    dx = -dx;
    dy = -dy;
  }
  prop.options.x += dx;
  prop.options.y += dy;
};