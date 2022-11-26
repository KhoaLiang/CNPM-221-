const jwt = require('jsonwebtoken')
const User = require('../Model/Users');
 

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.render('error/error', {
            statusCode: 401,
            message: 'Your unauthenticated access to this content',
            toDo: 'Please login first'
        });
    } 

    try {
        const decoded = jwt.verify(token, 'project'); 
        //console.log(decoded);
        return next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(403)
    }

}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'project', async (err, decodedToken) => {
          if (err) {
            res.locals.curUser = null;
            next();
          } else {
            let user = await User.findOne({_id: decodedToken.id});
            user = {
              user,
              name1: user.name,
              slug1: user.slug,
            }
            res.locals.curUser = user;
            //console.log(res.locals.curUser);
            next();
          }
        });
      } else {
        res.locals.curUser = null;
        //console.log(res.locals.curUser);
        next();
      }
}

module.exports = { verifyToken, checkUser };