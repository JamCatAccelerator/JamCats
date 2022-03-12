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

// delete req to delete current jam session
jamSessionRouter.delete(
  '/delete/:playlistId',
  jamSessionController.deleteJamSession,
  (req, res) => {
    res.status(204);
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

// add guests
// hosts/guests can add songs - add songs to the songLIst on the jamSession schema

module.exports = jamSessionRouter;
