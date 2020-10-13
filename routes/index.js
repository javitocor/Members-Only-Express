var express = require('express');
var router = express.Router();


var index_controller = require('../controllers/indexController');

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

module.exports = router;
