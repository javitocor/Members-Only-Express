var Message = require('../models/message');
var User = require('../models/user');
const { body, validationResult } = require('express-validator');

var async = require('async');

exports.create_get = (req, res) => res.render("message-form");;
exports.create_post = ;