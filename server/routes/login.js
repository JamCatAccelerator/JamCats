const express = require('express');
const path = require('path');
const querystring = require('query-string');
const authController = require('../controllers/authController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const fetch = require('node-fetch');

const loginRouter = express.Router();

// request to get authorization from user so our app can access Spotify resources in behalf of that user
loginRouter.get('/oauth', authController.initiateOauth);
// once request is processed, user will see authorization dialog asking to authorize access within the scope that is specified
// once user accepts or denies access, user is redirected to the specified redirect_uri

loginRouter.get('/callback', authController.getToken, (req, res) => {
  return res.redirect('/');
});

loginRouter.get('/refresh_token', async function(req, res) {

  const refresh_token = req.query.refresh_token;
  const authOptions = {
    method: "POST",
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET),
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      code: refresh_token
    }),
    json: true
  };

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );

  const data = await response.json();
  if (!data.error && data.status === 200) {
    const access_token = data.access_token;
    const refresh_token = data.refresh_token;
    //update the accesses tokens inside of the cookies
    res.cookie('spotify_access_token', access_token, {secure: true, httpOnly: true})
    res.cookie('spotify_refresh_token', refresh_token, {secure: true, httpOnly: true})
    res.status(200).json({ 'access_token': access_token})
  }
  return res.status(200).json(data);
});

module.exports = loginRouter;

