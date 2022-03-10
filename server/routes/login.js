const express = require('express');
const authController = require('../controllers/authController.js');
const fetch = require('node-fetch');

const loginRouter = express.Router();

// request to get authorization from user so our app can access Spotify resources in behalf of that user
loginRouter.get('/oauth', authController.initiateOauth);
// once request is processed, user will see authorization dialog asking to authorize access within the scope that is specified
// once user accepts or denies access, user is redirected to the specified redirect_uri

loginRouter.get('/callback', authController.getToken, (req, res) => {
  return res.redirect('/');
});

loginRouter.get(
  '/refresh_token',
  authController.getRefreshToken,
  (req, res) => {
    return res.redirect('/');
  }
);

module.exports = loginRouter;
