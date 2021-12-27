/* eslint-disable no-undef */

function Road(points = []) {
  this.prop = this.buildProps(points);
}

Road.Random = function () {
  return Road.Builder()
    .start({ x: 390, y: 850 })
    .to({ x: 590, y: 850 })
    .to({ x: 750, y: 900 })
    .to({ x: 1600, y: 870 })
    .to({ x: 1650, y: 820 })
    .to({ x: 1680, y: 720 })
    .to({ x: 1680, y: 620 })
    .to({ x: 1650, y: 520 })
    .to({ x: 1630, y: 400 })
    .to({ x: 1640, y: 300 })
    .to({ x: 1620, y: 260 })
    .to({ x: 1560, y: 230 })
    .to({ x: 1340, y: 180 })
    .to({ x: 1100, y: 180 })
    .to({ x: 1000, y: 240 })
    .to({ x: 900, y: 350 })
    .to({ x: 850, y: 380 })
    .to({ x: 750, y: 380 })
    .to({ x: 670, y: 340 })
    .to({ x: 620, y: 270 })
    .to({ x: 520, y: 230 })
    .to({ x: 420, y: 220 })
    .to({ x: 320, y: 230 })
    .to({ x: 260, y: 240 })
    .to({ x: 220, y: 320 })
    .to({ x: 190, y: 350 })
    .to({ x: 185, y: 420 })
    .to({ x: 200, y: 520 })
    .to({ x: 190, y: 620 })
    .to({ x: 210, y: 780 })
    .to({ x: 290, y: 850 })
    .end();
};

Road.Builder = function () {
  const points = [];
  const end = () => {
    const { x, y } = points[0];
    points.push({ x, y });
    return new Road(points);
  };
  const to = ({ x, y }) => {
    points.push({ x, y });
    return { to, end };
  };
  const start = ({ x, y }) => {
    points.push({ x, y });
    return { to, end };
  };
  return {
    start,
  };
};

Road.prototype.getProp = function () {
  return this.prop;
};

Road.prototype.buildProps = function (points) {
  /* const inner = Line(Color.BLACK, points);
  const outer = Line(Color.BLACK, points.map(point => {
    const angle = (Math.atan2(point.y, point.x) * 180) / Math.PI;
    const x = point.x + Math.cos(angle) * 40;
    const y = point.y + Math.sin(angle) * 40;
    return { x, y };
  })); */
  const innerPoints = [];
  const outerPoints = [];
  for (let i = 0; i < points.length - 1; i++) {
    const next = points[i + 1];
    const current = points[i];
    const angle = (Math.atan2(next.y - current.y, next.x - current.y) * 180) / Math.PI;
    const innerX = Math.cos(angle) * (current.x - 20 + (next.x - current.x - 20) * Math.cos(angle) - (next.y - current.y - 20) * Math.sin(angle));
    const innerY = Math.sin(angle) * (current.y - 20 + (next.x - current.x - 20) * Math.sin(angle) - (next.y - current.y - 20) * Math.cos(angle));
    const outerX = Math.cos(angle) * (current.x + 20 + (next.x - current.x + 20) * Math.cos(angle) - (next.y - current.y + 20) * Math.sin(angle));
    const outerY = Math.sin(angle) * (current.y + 20 + (next.x - current.x + 20) * Math.sin(angle) - (next.y - current.y + 20) * Math.cos(angle));
    innerPoints.push({ x: innerX, y: innerY });
    outerPoints.push({ x: outerX, y: outerY });
  }
  const inner = Line(Color.BLACK, innerPoints);
  const outer = Line(Color.BLACK, outerPoints);
  const control = [];
  /* for (let i = 0; i < points.length; i++) {
    const left = inner.options.points[i];
    const right = outer.options.points[i];
    control.push(Line(Color.RED, [left, right]));
  } */
  return [inner, outer, ...control];
};
