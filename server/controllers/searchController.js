const path = require('path');
const querystring = require('query-string');
const fetch = require('node-fetch');
const { nextTick } = require('process');

const searchController = {};

searchController.getSearchResults = async (req, res) => {
  const { spotify_access_token } = req.cookies;
  const { searchString } = req.query;

  const searchQuery = querystring.stringify({
    q: searchString,
    type: 'track',
  });
  const authOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.cookies.spotify_access_token,
    },
  };
  const data = await fetch(
    'https://api.spotify.com/v1/search?' + searchQuery,
    authOptions
  ).then((data) => data.json());

  if (data.error.status === 401) {
    // if response from Spotify gives an error with status = 401, token has expired
    // invoke refresh_token middleware to get new access token
    res.redirect(
      '/login/refresh_token' +
        querystring.stringify({
          refresh_token: spotify_refresh_token,
        })
    );
    // store refreshed tokens inside of the res.locals.tokens
    res.locals.access_token = req.cookies.spotify_access_token;
    res.locals.refresh_token = req.cookies.spotify_refresh_token;
    //const { access_token, refresh_token } = res.locals.tokens;
    // update tokens inside of the cookies ===> updated inside of the /refresh_token

    // create an option object with the refreshed token
    const searchOptionRefresh = {
      header: {
        Authorization: 'Bearer ' + spotify_access_token,
      },
    };

    // once the new access token is obtained, make new search query with the new access token
    const response = await fetch(
      'https://api.spotify.com/v1/search?' + searchQuery,
      searchOptionRefresh
    );
    console.log(response);
  }

  const tracks = data.tracks.items;
  console.log(tracks);
  res.locals.results = tracks;
  return next();
};

module.exports = searchController;
