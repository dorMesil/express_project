const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/userModel');
const user = require('../controllers/userController');

router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.register) );

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local',{filaureFlash: false, failureRedirect: '/login' }),user.login);

router.get('/logout', user.logout);

module.exports = router;