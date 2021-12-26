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
      x: 500,
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
  playerY = this.player.getProp().options.x;

  distance = Math.sqrt(Math.pow((playerX - prop.options.x), 2) + Math.pow((playerY - prop.options.y), 2));
  // console.log('start');
  // console.log('player', playerX, playerY);
  // console.log(prop.options.x, prop.options.y)
  // console.log(distance);

  if (distance < 200) {
    prop.options.x += 10;
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