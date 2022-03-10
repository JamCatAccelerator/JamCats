const express = require('express');
const path = require('path');
const jamSessionController = require('../controllers/jamSessionController.js');

const jamSessionRouter = express.Router();

// post req to create new jam session
jamSessionRouter.post(
  '/create',
  jamSessionController.createJamSession,
  (req, res) => {
    res.status(200).json(res.locals); // return jamsession and playlist info
  }
);

// add song to Spotify
jamSessionRouter.post('/addSong', jamSessionController.addSong, (req, res) => {
  res.status(200).json(res.locals);
});

jamSessionRouter.get(
  '/join/:playlistId',
  jamSessionController.joinSession,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// // get request for when they click on "join as guest" to display the current session
// jamSessionRouter.get('/', (req, res) => {
//   return res.status(200).sendFile(path.resolve(__dirname, '../../client/jamSession.html'));
// })

// add guests
// hosts/guests can add songs - add songs to the songLIst on the jamSession schema

module.exports = jamSessionRouter;
