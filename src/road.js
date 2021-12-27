/* eslint-disable no-undef */

function Road(points = []) {
  this.prop = {
    color: Color.BLACK,
    type: PropType.LINE,
    options: {
      points: [...points],
    },
  };
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
