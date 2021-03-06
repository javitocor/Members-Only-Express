var User = require('../models/user');
const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.member_get = (req, res) => res.render("member-form", { title: 'MemberShip Access' });
exports.member_post  = [
  // Validate and santise the name field.
  body('member', 'Member required').isLength({ min: 1 }).trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('member-form', { title: 'MemberShip Access', errors: errors.array()});
      return;
    } else {
      const messages = function(callback) {
        Message.find(callback);
      }
      // Data from form is valid.
      //Validate correct passcode
      if(req.body.member === process.env.MEMBER_PASSCODE) {
        //Modify user status.
        User.findByIdAndUpdate(req.user._id, {status: true}, function (err,theuser) {
          if (err) { return next(err); }
             // Successful - redirect to index page.
             Message.find({}, 'title text owner')
            .populate('owner')
            .sort([['timestamp', 'descending']])
            .exec(function (err, list_messages) {
              if (err) { return next(err); }
              //Successful, so render
              res.render('index', { title: 'MessagesBoard', list_messages: list_messages });
            });
          });        
      } else {
        Message.find({}, 'title text owner')
        .populate('owner')
        .sort([['timestamp', 'descending']])
        .exec(function (err, list_messages) {
          if (err) { return next(err); }
          //Successful, so render
          res.render('index', { title: 'MessagesBoard', list_messages: list_messages });
        });
      }
    }
  }
];
exports.admin_get = (req, res) => res.render("admin-form", { title: 'Admin Access' });;
exports.admin_post = [
  // Validate and santise the name field.
  body('admin', 'Admin required').isLength({ min: 1 }).trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('admin-form', { title: 'Admin Access', errors: errors.array()});
      return;
    } else {
      // Data from form is valid.
      //Validate correct passcode
      if(req.body.admin === process.env.ADMIN_PASSCODE) {
        //Modify user status.
        User.findByIdAndUpdate(req.user._id, {admin: true}, function (err,theuser) {
          if (err) { return next(err); }
             // Successful - redirect to index page.
             Message.find({}, 'title text owner')
            .populate('owner')
            .sort([['timestamp', 'descending']])
            .exec(function (err, list_messages) {
              if (err) { return next(err); }
              //Successful, so render
              res.render('index', { title: 'MessagesBoard', list_messages: list_messages });
            });
          });        
      } else {
        Message.find({}, 'title text owner')
        .populate('owner')
        .sort([['timestamp', 'descending']])
        .exec(function (err, list_messages) {
          if (err) { return next(err); }
          //Successful, so render
          res.render('index', { title: 'MessagesBoard', list_messages: list_messages });
        });
      }
    }
  }
];