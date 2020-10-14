var express = require('express');
var router = express.Router();

var passcode_controller = require('../controllers/passcodeController');

//Get passcode membership
router.get('/getmembership', passcode_controller.member_get);
//Post passcode membership
router.post('/getmembership', passcode_controller.member_post);
//Get passcode admin
router.get('/getadmin', passcode_controller.admin_get);
//Post passcode admin
router.post('/getadmin', passcode_controller.admin_post);

module.exports = router;