const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jamSessionSchema = new Schema({
  hostId: { type: Schema.Types.ObjectId, required: true },
  guests: { type: [{ type: String }], default: [] },
  playlistId: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, required: true, default: true },
});

module.exports = mongoose.model('JamSession', jamSessionSchema);
