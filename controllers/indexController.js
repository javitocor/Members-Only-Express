var User = require('../models/user');
var Message = require('../models/message');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const { body, validationResult } = require('express-validator');

var async = require('async');


exports.index = function(req, res, next) {
  Message.find({}, 'title owner')
    .populate('owner')
    .sort([['timestamp', 'descending']])
    .exec(function (err, list_messages) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('index', { title: 'MessagesBoard', list_messages: list_messages });
    });
};

exports.signup_get = (req, res) => res.render("sign-up-form");

exports.signup_post = (req, res, next) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    password: req.body.password
  });
  bcrypt.hash(user.password, 10, (err, hashedPassword) => {
    if(err) throw err;
    user.password = hashedPassword;
    user.save(err => {
      if (err) { 
        return next(err);
      };
      res.redirect("/log-in");
    });
  });  
};

exports.login_get = (req, res) => res.render("log-in-form");

exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in"
});

exports.logout_get = (req, res) => {
  req.logout();
  res.redirect("/");
};
