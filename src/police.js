/* eslint-disable no-undef */

function Police(player, { x, y }) {
  this.player = player;
  this.prop = {
    color: Color.BLUE,
    type: PropType.RECT,
    options: {
      x,
      y,
      width: 32,
      height: 16,
      radian: 0,
    },
  };
  this.specs = {
    spawn: {
      x,
      y,
    },
    patrolArea: 200,
    speed: 2,
    behaviour: Police.Behaviour.PATROLLING,
  };
}

Police.Behaviour = {
  PATROLLING: 0,
  CHASING: 1,
  COMING_BACK: 2,
};

Police.prototype.getProp = function () {
  return this.prop;
};

Police.prototype.update = function () {
  this.pickBehaviour();
  this.chase();
  this.comeBack();
};

Police.prototype.pickBehaviour = function () {
  const { player } = this;
  const { x, y } = this.prop.options;
  const { spawn, patrolArea } = this.specs;
  const distanceToPlayer = Math.sqrt((player.prop.options.x - x) ** 2
    + (player.prop.options.y - y) ** 2);
  if (distanceToPlayer <= patrolArea && player.specs.speed === 3) {
    this.specs.behaviour = Police.Behaviour.CHASING;
    return;
  }
  if (distanceToPlayer >= patrolArea && this.specs.behaviour === Police.Behaviour.CHASING) {
    this.specs.behaviour = Police.Behaviour.COMING_BACK;
    return;
  }
  if (x === spawn.x && y === spawn.y) {
    this.specs.behaviour = Police.Behaviour.PATROLLING;
  }
};

Police.prototype.chase = function () {
  const { behaviour } = this.specs;
  if (behaviour !== Police.Behaviour.CHASING) return;
  const { player } = this;
  const { options } = this.prop;
  const { speed } = this.specs;
  options.radian = Math.atan2(
    player.prop.options.y - options.y,
    player.prop.options.x - options.x,
  );
  if (options.x > player.prop.options.x) {
    options.x -= speed;
  }
  if (options.x < player.prop.options.x) {
    options.x += speed;
  }
  if (options.y > player.prop.options.y) {
    options.y -= speed;
  }
  if (options.y < player.prop.options.y) {
    options.y += speed;
  }
};

Police.prototype.comeBack = function () {
  const { behaviour } = this.specs;
  if (behaviour !== Police.Behaviour.COMING_BACK) return;
  const { options } = this.prop;
  const { spawn, speed } = this.specs;
  options.radian = Math.atan2(
    spawn.y - options.y,
    spawn.x - options.x,
  );
  if (options.x > spawn.x) {
    options.x -= speed;
  }
  if (options.x < spawn.x) {
    options.x += speed;
  }
  if (options.y > spawn.y) {
    options.y -= speed;
  }
  if (options.y < spawn.y) {
    options.y += speed;
  }
};
