'use strict';

const Track = require('../models/trackModel');

exports.createTrack = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a track'
    });
  }

  const track = new Track(body);

  if (!track) {
    return res.status(400).json({ success: false, error: err });
  }

  track
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: track._id,
        message: 'Track created!'
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Track not created!'
      });
    });
};

exports.updateTrack = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  Track.findOne({ _id: req.params.id }, (err, track) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Track not found!'
      });
    }
    track = body

    track
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: track._id,
          message: 'Track updated!'
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Track not updated!'
        });
      });
  });
};

exports.deleteTrack = async (req, res) => {
  await Track.findOneAndDelete({ _id: req.params.id }, (err, track) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!track) {
      return res.status(404).json({ success: false, error: `Track not found` });
    }

    return res.status(200).json({ success: true, data: track });
  }).catch(err => console.log(err));
};

exports.getTrackById = async (req, res) => {
  await Track.findOne({ _id: req.params.id }, (err, track) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: track });
  }).catch(err => console.log(err));
};

exports.getTracks = async (req, res) => {
  await Track.find({}, (err, tracks) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!tracks.length) {
      return res.status(404).json({ success: false, error: `Tracks not found` });
    }
    return res.status(200).json({ success: true, data: tracks });
  }).catch(err => console.log(err));
};