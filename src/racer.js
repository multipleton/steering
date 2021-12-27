/* eslint-disable no-undef */

function Racer(road, { x, y }) {
  this.road = road;
  this.specs = {
    angle: 0,
    speed: 2,
    controlPoints: road.specs.centerControls.slice(0),
    nextPoint: road.specs.centerControls[1],
  };
  this.prop = {
    color: Color[Object.keys(Color)[random(Object.keys(Color).length - 1)]],
    type: PropType.RECT,
    options: {
      x,
      y,
      width: 32,
      height: 16,
      radian: 0,
    },
  };
  this.specs.controlPoints.shift();
  this.specs.controlPoints.shift();
}

Racer.prototype.getProp = function () {
  return this.prop;
};

Racer.prototype.update = function () {
  const { prop, specs } = this;
  if (
    Math.abs(Math.round(prop.options.x) - this.specs.nextPoint.x) < 5 &&
    Math.abs(Math.round(prop.options.y) - this.specs.nextPoint.y) < 5
  ) {
    if (!specs.controlPoints.length) {
      specs.controlPoints = this.road.specs.centerControls.slice(0);
    }
    this.specs.nextPoint = specs.controlPoints.shift();
  }
  prop.options.radian = Math.atan2(
    this.specs.nextPoint.y - this.prop.options.y,
    this.specs.nextPoint.x - this.prop.options.x,
  );
  const stepX = Math.cos(prop.options.radian) * specs.speed;
  const stepY = Math.sin(prop.options.radian) * specs.speed;
  prop.options.x += Number(parseFloat(stepX).toFixed(5));
  prop.options.y += Number(parseFloat(stepY).toFixed(5));
};
