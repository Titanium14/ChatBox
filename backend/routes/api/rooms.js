const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load validation
const validateRoomInput = require('../../validation/createRoom');

// Load Room model
const Room = require('../../models/Room');

// @route   GET api/rooms/test
// @desc    Tests rooms route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Rooms works' }));

// @route   GET api/rooms
// @desc    Get current user's rooms
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Room.find({ user: req.user.id })
      .then(rooms => {
        if (rooms.length === 0) {
          errors.norooms = 'There are no rooms for this user';
          return res.status(404).json(errors);
        }
        res.json(rooms);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/rooms/:roomId
// @desc    Get specified room of current user
// @access  Private
router.get(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Room.findOne({ _id: req.params.roomId })
      .then(rooms => {
        if (!rooms) {
          errors.noroom = 'This room does not exist';
          return res.status(404).json(errors);
        }
        res.json(rooms);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/rooms
// @desc    Create rooms
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const roomFields = {};
    roomFields.user = req.user.id;
    if (req.body.roomName) roomFields.roomName = req.body.roomName;

    Room.findOne({ roomName: roomFields.roomName }).then(room => {
      // Create

      // Check if room exists
      if (room) {
        errors.roomName = 'That room already exists';
        res.status(400).json(errors);
      } else {
        // Save room
        new Room(roomFields).save().then(room => res.json(room));
      }
    });
  }
);

// @route   POST api/rooms/:roomId
// @desc    Edit rooms
// @access  Private
router.post(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRoomInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const roomFields = {};
    roomFields.user = req.user.id;
    if (req.body.roomName) roomFields.roomName = req.body.roomName;

    Room.findOne({ _id: req.params.roomId })
      .then(room => {
        if (room) {
          // Update
          Room.findOneAndUpdate(
            { _id: req.params.roomId },
            { $set: roomFields },
            { new: true }
          ).then(room => res.json(room));
        } else {
          errors.roomName = 'Failed to update this room';
          res.status(400).json(errors);
        }
      })
      .catch(err => res.status(404).json('This room does not exist'));
  }
);

// @route   DELETE api/rooms/:roomId
// @desc    Delete room
// @access  Private
router.delete(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOneAndRemove({ _id: req.params.roomId }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
