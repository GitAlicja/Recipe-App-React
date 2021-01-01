const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const DbConnection = require('../db/connection/DbConnection');

/**
 * Session handler.
 */
const getSessionHandler = () => session({
    secret: process.env.SESSION_SECRET,
    cookie: {path: '/', httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 * 1000},
    unset: 'destroy',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: DbConnection.getConnection(),
        ttl: 3600 * 24 // 1 day
    })
});

module.exports = getSessionHandler;
