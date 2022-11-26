const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken');
const Users = require('../Model/Users');

class loginMiddleware {
    // ?[GET] /login => render login page
    login(req, res, next) {
        res.render("login/login")
    }

    // ?[POST] /login => send request to login
    checkLogin(req, res, next) {        
        Users.findOne({
            name: req.body.name,
            password: req.body.password,
        })
            .then((user) => {
                if (!user) {
                    return res.render('error/error', {
                        statusCode: 401,
                        message: 'Your unauthenticated login',
                        toDo: 'Please check again your username and password then login again.'
                    });
                }

                const userToken = mongooseToObject(user);
                const toCreateToken = {
                    id: userToken._id,
                    name: userToken.name,
                    type: userToken.type
                }
                const accessToken = jwt.sign(toCreateToken, 'project');
                res.cookie("jwt", accessToken);
                console.log({accessToken});
                res.redirect('/user/' + userToken.slug);
            })
        
    }

    //? [GET] /logout
    logout(req, res, next) {
        res.cookie('jwt', '');
        res.redirect('/');
    }
}

module.exports = new loginMiddleware;