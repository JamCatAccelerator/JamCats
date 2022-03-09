const express = require('express');
const path = require('path');
const querystring = require('query-string');
const userController = require('../controllers/userController.js');
const fetch = require('node-fetch');

const userRouter = express.Router();

userRouter.get("/info", userController.createUser, (req, res) => {
    return res.status(200).json(res.locals);
})

module.exports = userRouter;
