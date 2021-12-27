/* eslint-disable no-undef */

function KeyboardHandler() {
  this.events = {
    ArrowLeft: 'arrow_left',
    ArrowUp: 'arrow_up',
    ArrowRight: 'arrow_right',
    ArrowDown: 'arrow_down',
  };
}

KeyboardHandler.prototype.handleEvent = function ({ key }) {
  const event = this.events[key];
  if (!event) return;
  EventEmiter.emit(event);
};
