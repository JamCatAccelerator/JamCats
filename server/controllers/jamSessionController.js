const path = require('path');
const JamSession = require('../models/jamSessionModel.js');
const fetch = require('node-fetch');

const jamSessionController = {};

jamSessionController.createJamSession = async (req, res, next) => {
  // send spotify user id, playlist name, and playlist visibility (public/private) in request body
  const hostId = req.body.id;
  if (!hostId) return next({log:'Missing hostId in jamSessionController.createUser'});
  // create playlist on spotify using request body info
  const authOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.spotify_access_token,
    },
    body: {
      "name": req.body.playlistName,
      "description": "A JamCats Jam Session&#8482;",
      "public": req.body.isPublic
    }
  };
  const newPlaylist = await fetch('https://api.spotify.com/v1/users/' + req.body.id + '/playlists', authOptions).then(data => data.json());
  
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
  JamSession.create({hostId: hostId, playlistId: playlistId}, (err, jamSession) =>{
    if (err){
      return next({
        log: 'Error in jamSessionController.createJamSession',
        status: 400,
        message: { err: 'An error occurred :/' },
      });
    }
    else {
      res.locals.jamSession = jamSession;
      res.locals.playlist = newPlaylist;
      return next(); 
    }
  }) 
}
// check guest? yes -> next()
// check host? yes -> oAuth

module.exports = jamSessionController;