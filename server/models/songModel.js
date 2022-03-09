//do not use; no longer relevant becuase song information will be stored in Redux or on Spotify playlist

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  songName: { type: String, required: true},
  songArtist: { type: String, required: true }
});

const songModel = mongoose.model('Song', songSchema);
// module.exports = mongoose.model('Song', songSchema);
module.exports = {
  songSchema,
  songModel
}
