const express = require('express');
const router = express.Router();
const passport = require('passport');

// // Load validation
const validateMessageInput = require('../../validation/createMsg');

// Load Room model
const Room = require('../../models/Room');

// Load Message model
const Message = require('../../models/Message');

// @route   GET api/messages/test
// @desc    Tests messages route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Message works' }));

// @route   GET api/messages/:roomId
// @desc    Get current room's messages
// @access  Private
router.get(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Room.findOne({ _id: req.params.roomId }).then(room => {
      Message.find({ roomId: room._id }).then(messages => {
        if (messages.length === 0) {
          errors.nomessages = 'There are no messages';
          return res.status(404).json(errors);
        }
        res.json(messages);
      });
    });
  }
);

// @route   POST api/messages/:roomId
// @desc    Add message to room
// @access  Private
router.post(
  '/:roomId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const msgFields = {};
    const currentTime = new Date();
    msgFields.roomId = req.params.id;
    if (req.body.msgContent) msgFields.msgContent = req.body.msgContent;
    msgFields.sendDate = currentTime.toLocaleTimeString();

    Room.findOne({ _id: msgFields.roomId }).then(room => {
      Message.findOne({ roomId: room._id }).then(message => {
        // Save room
        new Message(msgFields).save().then(message => res.json(message));
      });
    });
  }
);

// @route   DELETE api/budget/:roomId/:msgId
// @desc    Delete message from room
// @access  Private
router.delete(
  '/:roomId/:msgId',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Room.findOne({ _id: req.params.roomId })
      .then(room => {
        // Do a check here if there is no rooms, do not execute following code
        console.log(room);
        Message.findOneAndRemove({ _id: req.params.msgId })
          .then(() => {
            res.json({ success: true });
          })
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
