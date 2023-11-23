const express = require('express');

const Routes = express();

const User = require('./userRouter/userRouter');
const Device = require('./deviceRouter/deviceRouter');

Routes.use('/user', User);
Routes.use('/device', Device)

module.exports = Routes;