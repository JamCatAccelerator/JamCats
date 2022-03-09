const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const jamSessionSchema = new Schema({
  hostId: { type: Schema.Types.ObjectId, required: true },
  guests: { type: Object, required: false },
  playlistId: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, required: true }
});

module.exports = mongoose.model('JamSession', jamSessionSchema);
