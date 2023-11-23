const express = require('express');

const Routes = express();

const User = require('./userRouter/userRouter');

Routes.use('/user', User);

module.exports = Routes;