var express = require('express');
const route = require('.');
var router = express.Router();
const jwt = require('jsonwebtoken');

const loginController = require('../app/Controllers/LoginController');

/* newsController.index() */

// ! [GET] /login
router.get('/', loginController.login);

// ! [POST] /login
router.post('/',loginController.checkLogin);


module.exports = router;