var express = require('express');
var router = express.Router();


var index_controller = require('../controllers/indexController');
var message_controller = require('../controllers/messageController');

/* GET home page. */
router.get('/', index_controller.index);
// Get sign up page
router.get("/sign-up", index_controller.signup_get);
// Post signup page
router.post("/sign-up", index_controller.signup_post);
//Get login page
router.get("/log-in", index_controller.login_get);
//Post login page
router.post("/log-in", index_controller.login_post);
//Get logout
router.get("/log-out", index_controller.logout_get);
//Get create message page
router.get('/createmessage', message_controller.create_get);
//Post create message page
router.post('/createmessage', message_controller.create_post);
//Get delete message
router.get('/deletemessage/:id', message_controller.delete_get);
//Post delete message
router.post('/deletemessage/:id', message_controller.delete_post);

module.exports = router;
