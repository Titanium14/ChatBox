const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: 'rooms'
  },
  content: {
    type: String,
    required: true
  },
  send_date: {
    type: Date,
    required: true
  }
});

module.exports = Message = mongoose.model('messages', MessageSchema);
