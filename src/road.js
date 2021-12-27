/* eslint-disable no-undef */

function Road(points) {
  const { start, inner, outer, control } = this.buildProps(points);
  this.prop = [start, inner, outer, ...control];
  this.specs = {
    start: start.options.points,
  };
}

Road.Random = function () {
  return Road.Builder()
    .start({ x: 390, y: 850 }, { x: 390, y: 1000 })
    .to({ x: 590, y: 850 }, { x: 580, y: 1000 })
    .to({ x: 750, y: 900 }, { x: 730, y: 960 })
    .to({ x: 1600, y: 870 }, { x: 1610, y: 930 })
    .to({ x: 1650, y: 820 }, { x: 1700, y: 850 })
    .to({ x: 1680, y: 720 }, { x: 1740, y: 720 })
    .to({ x: 1680, y: 620 }, { x: 1735, y: 620 })
    .to({ x: 1650, y: 520 }, { x: 1715, y: 520 })
    .to({ x: 1630, y: 400 }, { x: 1700, y: 400 })
    .to({ x: 1640, y: 300 }, { x: 1710, y: 300 })
    .to({ x: 1620, y: 260 }, { x: 1690, y: 260 })
    .to({ x: 1560, y: 230 }, { x: 1600, y: 180 })
    .to({ x: 1340, y: 180 }, { x: 1340, y: 120 })
    .to({ x: 1100, y: 180 }, { x: 1100, y: 120 })
    .to({ x: 1000, y: 240 }, { x: 1000, y: 180 })
    .to({ x: 900, y: 350 }, { x: 900, y: 280 })
    .to({ x: 850, y: 380 }, { x: 850, y: 320 })
    .to({ x: 750, y: 380 }, { x: 750, y: 320 })
    .to({ x: 670, y: 340 }, { x: 670, y: 280 })
    .to({ x: 620, y: 270 }, { x: 620, y: 210 })
    .to({ x: 520, y: 230 }, { x: 520, y: 170 })
    .to({ x: 420, y: 220 }, { x: 420, y: 160 })
    .to({ x: 320, y: 230 }, { x: 320, y: 170 })
    .to({ x: 260, y: 240 }, { x: 240, y: 180 })
    .to({ x: 220, y: 320 }, { x: 140, y: 320 })
    .to({ x: 190, y: 350 }, { x: 120, y: 350 })
    .to({ x: 185, y: 420 }, { x: 125, y: 420 })
    .to({ x: 200, y: 520 }, { x: 130, y: 520 })
    .to({ x: 190, y: 620 }, { x: 120, y: 620 })
    .to({ x: 210, y: 780 }, { x: 150, y: 780 })
    .to({ x: 290, y: 850 }, { x: 210, y: 870 })
    .end();
};

Road.Builder = function () {
  const points = {
    inner: [],
    outer: [],
  };
  const end = () => {
    points.inner.push(points.inner[0]);
    points.outer.push(points.outer[0]);
    return new Road(points);
  };
  const to = (inner, outer) => {
    points.inner.push(inner);
    points.outer.push(outer);
    return { to, end };
  };
  const start = (inner, outer) => {
    points.inner.push(inner);
    points.outer.push(outer);
    return { to, end };
  };
  return {
    start,
  };
};

Road.prototype.getProp = function () {
  return this.prop;
};

Road.prototype.getSpecs = function () {
  return this.specs;
};

Road.prototype.buildProps = function (points) {
  const inner = Line(Color.BLACK, points.inner);
  const outer = Line(Color.BLACK, points.outer);
  const start = Line(Color.RED, [points.inner[0], points.outer[0]]);
  const control = [];
  for (let i = 1; i < points.inner.length - 1; i++) {
    control.push(Line(Color.GREEN, [points.inner[i], points.outer[i]]));
  }
  return { start, inner, outer, control };
};
