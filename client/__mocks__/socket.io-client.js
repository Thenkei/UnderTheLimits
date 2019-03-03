let EVENTS = {};

function emit(event, ...args) {
  EVENTS[event].forEach(func => func(...args));
}

const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit,
};

// Additional helpers, not included in the real socket.io-client,just for out test.
// to emulate server emit.
export const serverSocket = { emit };

// cleanup helper
export function cleanup() {
  EVENTS = {};
}
export default () => socket;
