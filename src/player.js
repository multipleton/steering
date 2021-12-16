/* eslint-disable no-undef */

function Player() {
  this.prop = {
    color: Color.GREEN,
    type: PropType.RECT,
    options: {
      x: 500,
      y: 300,
      width: 32,
      height: 32,
    },
  };
}

Player.prototype.getProp = function () {
  return this.prop;
};
