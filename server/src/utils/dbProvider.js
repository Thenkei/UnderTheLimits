class DBProvider {
  constructor() {
    if (!DBProvider.instance) {
      this.data = [];
      DBProvider.instance = this;
    }

    return DBProvider.instance;
  }

  set(existingData) {
    this.data.push(existingData);
  }

  get() {
    return this.data[0];
  }
}

const instance = new DBProvider();
Object.freeze(instance);

module.exports = instance;
