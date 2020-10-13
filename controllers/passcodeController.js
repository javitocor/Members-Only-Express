var User = require('../models/user');
const { body, validationResult } = require('express-validator');

exports.member_get = (req, res) => res.render("member-form", { title: 'MemberShip Access' });;
exports.member_post  = ;
exports.admin_get = (req, res) => res.render("admin-form", { title: 'Admin Access' });;
exports.admin_post = ;