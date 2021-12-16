/* eslint-disable no-unused-vars */

const EventEmiter = (() => {
  const events = {};
  const subscribe = (event, callback) => {
    if (!events[event]) {
      events[event] = [];
    }
    events[event].push(callback);
  };
  const emit = (event, ...args) => {
    const callbacks = events[event];
    if (!callbacks) {
      throw new Error(`cannot find event with name ${event}`);
    }
    callbacks.forEach(callback => callback(...args));
  };
  return { subscribe, emit };
})();
