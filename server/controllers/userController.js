const path = require('path');
const User = require('../models/userModel.js');
const JamSession = require('../models/jamSessionModel.js');
const querystring = require('query-string');
const fetch = require('node-fetch');

const userController = {};

userController.validateCookie = (req, res, next) => {
  if (!req.cookies.spotify_access_token) {
    return res.status(200).json({ authenticated: false });
  }
  res.locals.authenticated = true;
  return next();
};

userController.checkUser = async (req, res, next) => {
  //initiate fetch request with access token to get user info
  const authOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.spotify_access_token,
    },
  };
  //need to combine spotify profile and user info (redundant info)
  const spotifyProfile = await fetch(
    'https://api.spotify.com/v1/me',
    authOptions
  ).then((data) => data.json());
  // check if spotify responded with error
  if (spotifyProfile.error) {
    if (spotifyProfile.error.status === 401) {
      // token expired ==> refresh token
      return res.redirect('/login/refresh_token');
    }
    if (spotifyProfile.error.status === 403) {
      // bad token ==> redirect to main page, refresh will not work here
      return res.redirect('/');
    }
  }
  const { display_name, email, href, id, images } = spotifyProfile;
  res.locals.spotifyProfile = { display_name, email, href, images };
  // use findOne to look and see if user exists
  User.findOneAndUpdate(
    { spotifyId: id },
    { hostToken: req.cookies.spotify_access_token },
    { new: true },
    (err, user) => {
      if (err) {
        return next({
          log: 'Error in userController.checkUser',
          status: 400,
          message: {
            err: 'An error occurred while inserting a user into the database',
          },
        });
      }
      //if null (or doesn't exist) run create user method and return info to client
      if (!user) {
        User.create(
          { spotifyId: id, hostToken: req.cookies.spotify_access_token },
          (err, user) => {
            if (err) {
              return next({
                log: 'Error in userController.checkUser',
                status: 400,
                message: {
                  err: 'An error occurred while inserting a user into the database',
                },
              });
            }
            res.locals.dbInfo = user;
            return next();
          }
        );
      }
      // otherwise, store user info and move on to next middleware
      else {
        res.locals.dbInfo = user;
        return next();
      }
    }
  );
};

// get jam sessions from jamSession colleciton utilizing user's ID
userController.getJamSessions = (req, res, next) => {
  // find jam sessions using the user's document id, which will be stored in each jam session
  JamSession.find({ hostId: res.locals.dbInfo.spotifyId }, (err, sessions) => {
    if (err) {
      return next({
        log: 'Error in userController.getJamSessions',
        status: 400,
        message: {
          err: "An error occurred while retrieving a user's jam sessions",
        },
      });
    }
    res.locals.jamSessions = sessions;
    return next();
  });
};

// use sessions from previous middleware to query spotify for playlist info
userController.getPlaylists = async (req, res, next) => {
  const authOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.spotify_access_token,
    },
  };
  // map jam session playlist IDs to request URLs
  const playlistUrls = res.locals.jamSessions.map((session) =>
    fetch(
      'https://api.spotify.com/v1/playlists/' + session.playlistId,
      authOptions
    ).then((data) => data.json())
  );
  res.locals.playlists = await Promise.all(playlistUrls);
  return next();
};

module.exports = userController;
