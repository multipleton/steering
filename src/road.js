/* eslint-disable no-undef */

function Road(points = []) {
  this.prop = {
    color: Color.BLACK,
    type: PropType.CURBE,
    options: {
      points: [...points],
    },
  };
}

Road.Random = function () {
  return Road.Builder()
    .start({ x: 290, y: 850 })
    .to({ x: 750, y: 920 })
    .to({ x: 1600, y: 870 })
    .to({ x: 1550, y: 350 })
    .to({ x: 1100, y: 180 })
    .to({ x: 500, y: 350 })
    .to({ x: 200, y: 200 })
    .end();
};

Road.Builder = function () {
  const points = [];
  const prepareLine = (start, end) => {
    const centerX = (start.x + end.x) / 2;
    const centerY = (start.y + end.y) / 2;
    const cpxStart = (centerX + start.x) / 2;
    const cpxEnd = (centerX + end.x) / 2;
    return {
      start: {
        x: centerX,
        y: centerY,
        cpx: cpxStart,
        cpy: start.y,
      },
      end: {
        x: end.x,
        y: end.y,
        cpx: cpxEnd,
        cpy: end.y,
      },
    };
  };
  const end = () => {
    const previous = points[points.length - 1];
    const { x, y } = points[0];
    const line = prepareLine(previous, { x, y });
    points.push(line.start, line.end);
    return new Road(points);
  };
  const to = ({ x, y }) => {
    const previous = points[points.length - 1];
    const line = prepareLine(previous, { x, y });
    points.push(line.start, line.end);
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
