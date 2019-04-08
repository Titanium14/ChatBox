const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load validation
const validateRoomInput = require('../../validation/createRoom');

// Load Room model
const Room = require('../../models/Room');

//------------------------------------------------------------------
// All GET requests
//------------------------------------------------------------------

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
    Room.find()
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

// @route   GET api/rooms/:userId
// @desc    Get specified room of current user
// @access  Private
router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Room.find({ user: req.params.userId })
      .then(rooms => {
        if (!rooms) {
          errors.noroom = 'This user does not have any rooms';
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

//------------------------------------------------------------------
// All POST requests
//------------------------------------------------------------------

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
    const currentTime = new Date();
    roomFields.user = req.user.id;
    if (req.body.roomName) roomFields.roomName = req.body.roomName;
    roomFields.dateCreated = currentTime.toLocaleString();

    User.findOne({ _id: roomFields.user }).then(user => {
      Room.findOne({ user: user._id, roomName: roomFields.roomName }).then(
        room => {
          // Check if room exists
          if (room) {
            errors.roomName = 'That room already exists';
            res.status(400).json(errors);
          } else {
            // Save room
            new Room(roomFields).save().then(room => res.json(room));
          }
        }
      );
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

//------------------------------------------------------------------
// All DELETE requests
//------------------------------------------------------------------

// @route   DELETE api/rooms/:roomId
// @desc    Delete room
// @access  Private
router.delete(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOneAndDelete({ _id: req.params.roomId })
      .then(room => {
        Message.deleteMany({ roomId: room._id })
          .then(() => {
            res.json({ success: true });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
