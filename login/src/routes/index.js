const LoginRouter = require('./login');
const UserRouter = require('./user');
const LogoutRouter = require('./logout');
const HomeRouter = require('./home');
const { checkUser } = require('../app/Middleware/AuthMiddleware');

function route(app) {
    app.use('/user', UserRouter);
    app.use('/login', LoginRouter);
    app.use('/logout', LogoutRouter);
    app.use('/', HomeRouter);
}

module.exports = route;
