var Message = require('../models/message');
var User = require('../models/user');
const { body, validationResult } = require('express-validator');

var async = require('async');

exports.create_get = (req, res) => res.render("message-form", {title: 'Create a new message'});
exports.create_post = [
  // Validate and santise the name field.
  body('title', 'Title required').isLength({ min: 3 }).trim().escape(),
  body('text', 'Text required').isLength({ min: 5 }).trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('message-form', { title: 'Create a new message', errors: errors.array()});
      return;
    } else {
      const message = new Message ({
        title: req.body.title,
        text: req.body.text,
        owner: req.user._id
      }).save(err => {
        if (err) { 
          return next(err);
        };
        res.redirect("/");
      });
    }
  }
];

exports.delete_get = function(req, res) {
  Message.findById(req.params.id)
  .exec(function (err, message) {
    if (err) { return next(err); }
    if (message==null) { // No results.
        var err = new Error('Message not found');
        err.status = 404;
        return next(err);
      }
    // Successful, so render.
    res.render('message_delete', { title: 'Delete Message', message:  message});
  })
};
exports.delete_post = function(req, res) {
  Message.findByIdAndRemove(req.body.messageid, function deleteMessage(err) {
      if (err) { return next(err); }
      // Success - go to index
      res.redirect('/')
  })
};