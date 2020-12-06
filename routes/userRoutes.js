const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const user = require('../controllers/userController');
const catchAsync = require('../utils/catchAsync');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.register) );

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local',{filaureFlash: false, filureRediract: '/login' }),user.login);

module.exports = router;