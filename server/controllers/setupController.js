'use strict';

const Setup = require('../models/setupModel');

exports.createSetup = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a setup'
    });
  }

  const setup = new Setup(body);

  if (!setup) {
    return res.status(400).json({ success: false, error: err });
  }

  setup
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: setup._id,
        message: 'Setup created!'
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Setup not created!'
      });
    });
};

exports.updateSetup = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  Setup.findOne({ _id: req.params.id }, (err, setup) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Setup not found!'
      });
    }
    setup = body;

    setup
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: setup._id,
          message: 'Setup updated!'
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Setup not updated!'
        });
      });
  });
};

exports.deleteSetup = async (req, res) => {
  await Setup.findOneAndDelete({ _id: req.params.id }, (err, setup) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!setup) {
      return res.status(404).json({ success: false, error: `Setup not found` });
    }

    return res.status(200).json({ success: true, data: setup });
  }).catch(err => console.log(err));
};

exports.getSetupById = async (req, res) => {
  const query = { _id: req.params.id };

  await Setup.findById(query)
    .populate('car')
    .populate('game')
    .populate('track')
    .populate('driver')
    .exec((err, setup) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }

      return res.status(200).json({ success: true, data: setup });
    })
    .catch(err => console.log(err));
};

exports.getSetups = async (req, res) => {
  await Setup.find({})
    .populate('car')
    .populate('game')
    .populate('track')
    .populate('driver')
    .exec((err, setups) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      }
      if (!setups.length) {
        return res
          .status(404)
          .json({ success: false, error: `Setups not found` });
      }
      return res.status(200).json({ success: true, data: setups });
    })
    .catch(err => console.log(err));
};