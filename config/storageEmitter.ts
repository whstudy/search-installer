export const StorageEmitter = {
  listeners: {},
  on(event, fn) {
    (this.listeners[event] || (this.listeners[event] = [])).push(fn);
  },
  off(event, fn) {
    const eventList = this.listeners[event];
    eventList && eventList.length && (this.listeners[event] = eventList.filter((f) => f !== fn));
  },
  emit(event, ...arg) {
    this.listeners[event] && this.listeners[event].forEach((fn) => fn.apply(this, arg));
  },
};
