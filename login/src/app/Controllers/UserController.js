const User = require('../Model/Users');
const { mongooseToObject } = require('../../util/mongoose');

class UserController {
    // ?[GET] /user/:slug
    show(req, res, next) {
        User.findOne({ slug: req.params.slug })
            .then((user) => {
                console.log(res.locals.curUser);
                res.render('user', {
                    user: mongooseToObject(user),
                    curUser: res.locals.curUser
            });
            })
    }

    // ?[GET] /user/:id/changepassword
    edit(req, res, next) {
        User.findById( req.params.id)
            .then((user) => {
                res.render('login/changepassword', {
                    user: mongooseToObject(user)
                })
            })
    }

    // ?[PUT] /user/:id
    change(req, res, next) {
        User.findById(req.params.id)
            .then((user) => {
                var user_temp = mongooseToObject(user);
                if (user_temp.password != req.body.oldPass) {
                    res.render('error/error', {
                        statusCode: "000",
                        message: 'Wrong Password',
                        toDo: 'Check your password'
                    })
                } else {
                    User.updateOne({_id: req.params.id}, {password: req.body.newPass})
                        .then((user) => {
                            console.log(user.slug);
                            res.redirect('/user/' + user_temp.slug);
                        })
                }
            })
        
    }
}

module.exports = new UserController;