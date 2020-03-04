const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RoomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  room_name: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    required: true
  }
});

module.exports = Room = mongoose.model('rooms', RoomSchema);
