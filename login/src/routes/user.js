var express = require('express');
const route = require('.');
var router = express.Router();

const UserController = require('../app/Controllers/UserController');
const { verifyToken, checkUser } = require('../app/Middleware/AuthMiddleware');
/* newsController.index() */


// ! [GET] /user/:slug
router.get('/:slug', verifyToken, checkUser, UserController.show);

// ! [GET] /user/changepassword/:id
router.get('/:id/changepassword', checkUser, UserController.edit);
// ! [PUT] /user/:id
router.put('/:id', checkUser, UserController.change);
module.exports = router;