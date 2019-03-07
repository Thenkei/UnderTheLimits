class SocketProvider {
  constructor() {
    if (!SocketProvider.instance) {
      this.data = [];
      SocketProvider.instance = this;
    }

    return SocketProvider.instance;
  }

  set(existingData) {
    this.data.push(existingData);
  }

  get() {
    return this.data[0];
  }
}

const instance = new SocketProvider();
Object.freeze(instance);

module.exports = instance;
