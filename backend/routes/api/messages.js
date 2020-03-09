const express = require('express');
const router = express.Router();
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Room = require('../../models/Room');
const Message = require('../../models/Message');

// @route   GET api/messages/:roomId
// @desc    Get current room's messages
// @access  Private
router.get('/:roomId', auth, async (req, res) => {
  const { roomId } = req.params;

  try {
    let room = await Room.findById({ _id: roomId });

    if (!room) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'This room does not exist.' }] });
    }

    let msg = await Message.find({ room_id: roomId });

    if (msg === null) {
      msg = 'There are no messages';
    }
    res.json(msg);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/messages/:roomId
// @desc    Add message to room
// @access  Private
router.post(
  '/:roomId',
  auth,
  [
    check('content', 'Please enter a message')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { content } = req.body;
    const { roomId } = req.params;

    try {
      let room = await Room.findOne({ _id: roomId });

      if (!room) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'This room does not exist' }] });
      }

      const msg = new Message({
        user: req.user.id,
        room_id: roomId,
        content: content,
        send_date: moment()
      });

      await msg.save(() => res.json({ msg }));
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/messages/:roomId/:msgId
// @desc    Delete message from room
// @access  Private
router.delete('/:roomId/:msgId', auth, async (req, res) => {
  const { roomId, msgId } = req.params;

  try {
    await Message.findOneAndRemove({ _id: msgId, room_id: roomId });
    res.json({ msg: 'Message deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
