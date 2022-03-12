const path = require('path');
const JamSession = require('../models/jamSessionModel.js');
const fetch = require('node-fetch');

const jamSessionController = {};

jamSessionController.createJamSession = async (req, res, next) => {
  // send spotify user id, playlist name, and playlist visibility (public/private) in request body
  console.log('body');
  console.log(req.body);
  const hostId = req.body.id;
  if (!hostId)
    return next({ log: 'Missing hostId in jamSessionController.createUser' });
  // create playlist on spotify using request body info
  const authOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.spotify_access_token,
    },
    body: JSON.stringify({
      name: req.body.playlistName,
      description: 'A JamCats Jam Session :)',
      public: req.body.isPublic,
    }),
  };
  const newPlaylist = await fetch(
    'https://api.spotify.com/v1/users/' + req.body.id + '/playlists',
    authOptions
  ).then((data) => data.json());

  // if playlist creation returns error, do not insert into database
  if (newPlaylist.error) {
    if (newPlaylist.error.status === 401) {
      // token expired ==> refresh token
      // may need to change from redirect to fetch request later. don't want to end response cycle
      return res.redirect('/login/refresh_token');
    }
    if (newPlaylist.error.status === 403) {
      // bad token ==> redirect to main page, refresh will not work here
      return res.redirect('/');
    }
  }
  const playlistId = newPlaylist.id;
  // req to start jam session: user with user._id makes post req - set hostId to user._id
  // create a new document in the jam sessions collection in database
  JamSession.create(
    {
      hostId: hostId,
      playlistId: playlistId,
    },
    (err, jamSession) => {
      if (err) {
        return next({
          log: 'Error in jamSessionController.createJamSession',
          status: 400,
          message: { err: 'An error occurred :/' },
        });
      } else {
        res.locals.jamSession = jamSession;
        res.locals.playlist = newPlaylist;
        return next();
      }
    }
  );
};

jamSessionController.deleteJamSession = async (req, res, next) => {
  const { playlistId } = req.query;
  JamSession.deleteOne({ playlistId: playlistId}, (err, session) => {
    if (err) {
      return next({
        log: 'Error in jamSessionController.deleteJamSession',
        status: 400,
        message: { err: 'An error occurred while trying to delete a jam session' },
      });
    }
    return next();
  })
}

jamSessionController.addSong = async (req, res, next) => {
  const { playlist_id, uri } = req.body;
  const authOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.spotify_access_token,
    },
    body: JSON.stringify({
      uris: [uri],
    }),
  };
  const newSong = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    authOptions
  );
  res.locals.isAdded = true;
  return next();
};

jamSessionController.joinSession = async (req, res, next) => {
  const { playlistId } = req.params;
  // get jam session using playlist ID from query
  const jamSession = await JamSession.findOne({ playlistId: playlistId }).catch(
    (err) => {
      return next({
        log: 'Error in jamSessionController.joinSession',
        status: 400,
        message: { err: 'An error occurred while trying to join a session' },
      });
    }
  );
  if (!jamSession.isActivated) {
    res.locals.isActivated = false;
    return next();
  }
  // get user info using jam session info
  const user = await User.findOne({
    spotifyId: jamSession.hostId,
  }).catch((err) => {
    return next({
      log: 'Error in jamSessionController.joinSession',
      status: 400,
      message: { err: 'An error occurred while trying to join a session' },
    });
  });
  // get playlist info from spotify
  const { hostToken } = user;
  const authOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + hostToken,
    },
  };
  const playlist = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    authOptions
  );
  res.locals = { playlist, jamSession, isActivated: true };
  return next();
};

module.exports = jamSessionController;
