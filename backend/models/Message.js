const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'rooms'
  },
  msgContent: {
    type: String,
    required: true
  },
  sendDate: {
    type: String,
    required: true
  },
  sendTime: {
    type: String,
    required: true
  }
});

module.exports = Message = mongoose.model('messages', MessageSchema);
