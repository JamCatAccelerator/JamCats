const path = require('path');
const User = require('../models/userModels.js');
const querystring = require('query-string');
const fetch = require('node-fetch');

const userController = {};

userController.createUser = async (req, res, next) => {
  //initiate fetch request with access token to get user info
  const authOptions = {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + req.cookies.spotify_access_token,
    }
  };
  //need to combine spotify profile and user info (redundant info)
  const spotifyProfile = await fetch("https://api.spotify.com/v1/me", authOptions).then(data => data.json());
  const { display_name, email, href, id, images } = spotifyProfile;
  // HOld off for now
  res.locals.spotifyProfile = { display_name, email, href, images }
  // use findOne to look and see if user exists
  // otherwise, store jam session info in locals and move on to next piece of middleware
  //store/update the user's document in the MongoDB database
  User.findOne({ spotifyId: id }, (err, user) => {
    if (err) {
      return next({
        log: 'Error in authController.createUser',
        status: 400,
        message: { err: 'An error occurred while inserting a user into the database' },
      })
    }
    //if null (or doesn't exist) run create user method
    if (!user) {
      User.create({ spotifyId: id }, (err, user) =>  {
        if (err) {
          return next({
            log: 'Error in authController.createUser',
            status: 400,
            message: { err: 'An error occurred while inserting a user into the database' },
          })
        }
        res.locals.dbInfo = user
        return next();
      })
    }
    else {
      res.locals.dbInfo = user;
      return next();
    }
  })
} 

module.exports = userController;