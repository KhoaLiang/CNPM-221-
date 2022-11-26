var express = require('express');
const route = require('.');
var router = express.Router();

const HomeController = require('../app/Controllers/HomeController');

/* newsController.index() */
const { verifyToken, checkUser } = require('../app/Middleware/AuthMiddleware');
/* newsController.index() */



// ! GET USER PAGE (FE)
router.get('/', checkUser, HomeController.index);



module.exports = router;