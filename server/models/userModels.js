const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

mongoose.set('debug', true);

// stores spotify_id and references to user's jam sessions in separate collection
const userSchema = new Schema({
  spotifyId: { type: String, required: true, unique: true },
  jamSessions: { type: [{ type: Schema.Types.ObjectId, ref: 'JamSession' }], default: [] }
});

module.exports = mongoose.model('User', userSchema);
