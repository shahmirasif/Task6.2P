const express = require("express");
const router = express.Router();
const validator = require("../validations/worker.js");
const Worker = require("../models/Worker.js");

router.get("", async (req, res) => {
  const workers = await Worker.getWorkers();
  if (workers) {
    return res.status(200).json({
      status: 200,
      message: workers,
    });
  }

  return res.status(400).json({
    status: 400,
    message: "No workers added yet",
  });
});

router.get("/:id", async (req, res) => {
  const worker = await Worker.getWorker(req.params.id);
  if (worker) {
    return res.status(200).json({
      status: 200,
      message: worker,
    });
  }

  return res.status(400).json({
    status: 400,
    message: "No such worker",
  });
});

router.post("", async (req, res) => {
  const {error} = validator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }
  const worker = await Worker.createWorker(req.body);

  if (!worker || worker._message)
    return res.status(404).json({
      status: 404,
      message: "Unable to create worker",
    });

  res.status(200).json({
    status: 200,
    message: "Worker created succesfully",
  });
});

router.put("/:id", async (req, res) => {
  const {error} = validator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  const worker = await Worker.updateWorker(req.params.id, req.body);

  if (!worker || worker._message)
    return res.status(404).json({
      status: 404,
      message: "Unable to update worker",
    });

  res.status(200).json({
    status: 200,
    message: "Worker updated succesfully",
  });
});

router.delete("", async (req, res) => {
  const success = await Worker.deleteWorkers();
  if (success) {
    res.status(200).json({
      status: 200,
      message: "Workers deleted succesfully",
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Unable to delete workers",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const success = await Worker.deleteWorker(req.params.id);
  if (success) {
    res.status(200).json({
      status: 200,
      message: "Worker deleted succesfully",
    });
  } else {
    res.status(400).json({
      status: 400,
      message: "Unable to delete worker",
    });
  }
});

router.patch("/:id", async (req, res) => {
  const {error} = validator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  const worker = await Worker.updateDetails(req.params.id, req.body);

  if (!worker || worker._message)
    return res.status(404).json({
      status: 404,
      message: "Unable to update worker",
    });

  res.status(200).json({
    status: 200,
    message: "Worker updated  succesfully",
  });
});

router.patch("/:id/password", async (req, res) => {
  const {error} = validator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  const worker = await Worker.updatePassword(req.params.id, req.body);

  if (!worker || worker._message)
    return res.status(404).json({
      status: 404,
      message: "Unable to update password",
    });

  res.status(200).json({
    status: 200,
    message: "Password updated succesfully",
  });
});

module.exports = router;
