const mongoose = require("mongoose");
const workerSchema = require("../schemas/worker.js");

class Worker {
  constructor() {
    this.Worker = mongoose.model("Worker", workerSchema);
  }

  async getWorkers() {
    return await this.Worker.find({});
  }

  async getWorker(_id) {
    return await this.Worker.find({_id: _id});
  }

  async createWorker(_worker) {
    const worker = new this.Worker({
      name: _worker.name,
      address: _worker.address,
      contact: _worker.contact,
      password: _worker.password,
    });

    return await worker.save();
  }

  async updateWorker(_id, _worker) {
    return await this.Worker.findOneAndUpdate(_id, _worker);
  }

  async updateDetails(_id, _worker) {
    return await this.Worker.findOneAndUpdate(_id, {
      address: _worker.address,
      contact: _worker.contact,
    });
  }

  async updatePassword(_id, _worker) {
    return await this.Worker.findOneAndUpdate(_id, {
      password: _worker.password,
    });
  }

  async deleteWorker(_id) {
    return await this.Worker.findOneAndDelete(_id);
  }

  async deleteWorkers() {
    return await this.Worker.deleteMany({});
  }
}

module.exports = new Worker();
