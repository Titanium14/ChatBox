const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  roomName: {
    type: String,
    required: true
  },
  message: [
    {
      msgContent: {
        type: String,
        required: true
      },
      sendDate: {
        type: Date,
        default: Date.now()
      }
    }
  ]
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
