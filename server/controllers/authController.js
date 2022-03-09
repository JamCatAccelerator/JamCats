const path = require('path');
const User = require('../models/userModels.js');
const querystring = require('query-string');
const fetch = require('node-fetch');

const redirect_uri = (process.env.NODE_ENV === "development") ? 'http://localhost:8080/login/callback' : 'http://localhost:3000/login/callback';
const stateKey = 'spotify_auth_state';

const authController = {};

authController.initiateOauth = (req, res) => {
  const randomString = Math.random().toString(36).slice(2);
  res.cookie(stateKey, randomString);
  const scope = 'ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public user-read-currently-playing user-read-email';
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: randomString,
      })
  );
}

authController.getToken = async (req, res, next) => {
  console.log('hello from callback!')
  // callback contains two query params: code = an auth code that can be exchanged for an Access Token, state = value of state param supplied in request
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/login' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey)
    const authOptions = {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
      },
      json: true,
    };
    // after comparing state, now the user is ready to exchange the auth code for an Access Token by making a post request to /api/token
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );

    const data = await response.json();
    const access_token = data.access_token;
    const refresh_token = data.refresh_token;
    res.cookie('spotify_access_token', access_token, {secure: true, httpOnly: true})
    res.cookie('spotify_refresh_token', refresh_token, {secure: true, httpOnly: true})
    next();
  }
}




authController.verifyUser = (req, res, next) => {

  const { username, password } = req.body;
  if (!username || !password) return next({ log: 'Missing username or password in authController.verifyUser' });
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      // database error
      return next({log:'Error in authController.verifyUser: ' + JSON.stringify(err)});
    }
    else if (!user) {
      // no user was found
      res.redirect('/signup');
    }
    else {
      // user was found, compare the password to the hashed one
      bcrypt.compare(password, user.password)
        .then(result => {
          if (!result) {
            // password did not match
            res.redirect('/signup')
          }
          else {
            // password did match, save user for following middlewars
            res.locals.user = user;
            return next()
          }
        })
        .catch(err => {
          // error while bcrypt was running
          return next({log :'Error in authController.verifyUser: ' + JSON.stringify(err)})
        })
    }
  })
}



authController.verifyCookie = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return next({ log: 'Missing username or password in authController.verifyUser' });
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      // database error
      return next({log: 'Error in authController.verifyUser: ' + JSON.stringify(err)});
    }
    else if (!user) {
      // no user was found
      res.redirect('/signup');
    }
    else {
      // user was found, compare the password to the hashed one
      bcrypt.compare(password, user.password)
        .then(result => {
          if (!result) {
            // password did not match
            res.redirect('/signup')
          }
          else {
            // password did match, save user for following middlewars
            res.locals.user = user;
            return next()
          }
        })
        .catch(err => {
          // error while bcrypt was running
          return next({log: 'Error in authController.verifyUser: ' + JSON.stringify(err)})
        })
    }
  })
}

module.exports = authController;