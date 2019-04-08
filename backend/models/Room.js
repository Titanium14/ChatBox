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
  dateCreated: {
    type: String,
    required: true
  }
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
