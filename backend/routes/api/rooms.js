const express = require('express');
const router = express.Router();
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Room = require('../../models/Room');
const Message = require('../../models/Message');

// @route   GET api/rooms
// @desc    Get all rooms
// @access  Private
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/rooms/user
// @desc    Get specified rooms of current user
// @access  Private
router.get('/user', auth, async (req, res) => {
  try {
    const rooms = await Room.find({ user: req.user.id });
    res.json(rooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/rooms/:roomId
// @desc    Get specific room by ID
// @access  Private
router.get('/:roomId', auth, async (req, res) => {
  const { roomId } = req.params;
  try {
    const rooms = await Room.findById({ _id: roomId });
    res.json(rooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/rooms
// @desc    Create rooms
// @access  Private
router.post(
  '/',
  auth,
  [
    check('room_name', 'Please enter a room name')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { room_name } = req.body;

    try {
      let room = await Room.findOne({
        user: req.user.id,
        room_name: room_name
      });

      if (room) {
        return res.status(400).json({
          errors: [
            {
              value: room_name,
              msg:
                'You already have a room with that name. Please choose another name.',
              param: 'room_name',
              location: 'body'
            }
          ]
        });
      }

      room = new Room({
        user: req.user.id,
        room_name: room_name,
        date_created: moment()
      });

      await room.save(() => res.json({ room }));
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/rooms/:roomId
// @desc    Edit rooms
// @access  Private
router.put(
  '/:roomId',
  auth,
  [
    check('room_name', 'Please enter a room name')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { roomId } = req.params;
    const { room_name } = req.body;

    try {
      let room = await Room.findById({ _id: roomId });

      if (room) {
        if (room_name !== room.room_name) room.room_name = room_name;
        await Room.findOneAndUpdate(
          { _id: roomId },
          { $set: room },
          { new: true }
        );
        res.json({ room });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/rooms/:roomId
// @desc    Delete room
// @access  Private
router.delete('/:roomId', auth, async (req, res) => {
  const { roomId } = req.params;

  try {
    await Room.findOneAndRemove({ _id: roomId });
    await Message.deleteMany({ room_id: roomId });
    res.json({ msg: 'Room deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
