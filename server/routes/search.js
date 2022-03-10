const express = require('express');
const path = require('path');
const querystring = require('query-string');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');
const { request } = require('http');
const searchController = require('../controllers/searchController.js');

const searchRouter = express.Router();
searchRouter.use(cookieParser());

// request to get authorization from user so our app can access Spotify resources in behalf of that user
searchRouter.get('/', searchController.getSearchResults, (req, res) => {
  return res.status(200).json(res.locals);
});

module.exports = searchRouter;
