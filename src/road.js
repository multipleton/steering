/* eslint-disable no-undef */

function Road(lines = []) {
  this.prop = {
    color: Color.BLACK,
    type: PropType.CURBE,
    options: {
      lines: [...lines],
    },
  };
}

Road.Curve = {
  IN: false,
  OUT: true,
};

Road.Random = function () {
  return Road.Builder()
    .start({ x: 220, y: 900 })
    .to({ x: 1600, y: 800, curve: Road.Curve.IN })
    .to({ x: 1550, y: 350, curve: Road.Curve.IN })
    .to({ x: 800, y: 220, curve: Road.Curve.IN })
    .to({ x: 350, y: 200, curve: Road.Curve.OUT })
    .end({ curve: Road.Curve.IN });
};

Road.Builder = function () {
  const lines = [];
  const prepareCurvePos = (start, end, curve) => {
    const centerX = (start.x + end.x) / 2;
    const centerY = (start.y + end.y) / 2;
    const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2) / 4;
    const angle = Math.abs(((Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI));
    let cpx;
    let cpy;
    if (angle > 0 && angle < 90) {
      cpx = centerX + Math.cos(angle) * (curve ? distance : -distance);
      cpy = centerY + Math.sin(angle) * (curve ? distance : -distance);
    } else if (angle > 90 && angle < 180) {
      cpx = centerX + Math.cos(angle) * (curve ? distance : -distance);
      cpy = centerY + Math.sin(angle) * (curve ? -distance : distance);
    } else if (angle === 0) {
      cpx = centerX;
      cpy = centerY + (curve ? distance : -distance);
    } else if (angle === 90) {
      cpx = centerX + (curve ? -distance : distance);
      cpy = centerY;
    } else if (angle === 180) {
      cpx = centerX;
      cpy = centerY + (curve ? -distance : distance);
    }
    return { cpx, cpy };
  };
  const end = ({ curve }) => {
    const previous = lines[lines.length - 1];
    const { x, y } = lines[0];
    const { cpx, cpy } = prepareCurvePos(previous, { x, y }, curve);
    lines.push({ x, y, cpx, cpy });
    return new Road(lines);
  };
  const to = ({ x, y, curve }) => {
    const previous = lines[lines.length - 1];
    const { cpx, cpy } = prepareCurvePos(previous, { x, y }, curve);
    lines.push({ x, y, cpx, cpy });
    return { to, end };
  };
  const start = ({ x, y }) => {
    lines.push({ x, y });
    return { to, end };
  };
  return {
    start,
  };
};

Road.prototype.getProp = function () {
  return this.prop;
};
