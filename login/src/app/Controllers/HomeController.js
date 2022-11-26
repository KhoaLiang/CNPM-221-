const { response } = require("express");

class HomeController {
    //? [GET] localhost:{port}/
    index(req, res, next) {
        console.log(res.locals.curUser);
        res.render('home', res.locals.curUser);
    }
}

module.exports = new HomeController;