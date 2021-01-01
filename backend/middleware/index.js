const cors = require('cors');
const {json} = require('express');
const requireLogin = require('./requireLogin');
const session = require('./session');

/**
 * Setup the middleware
 *
 * @param app express app
 */
const setup = app => {

    if (process.env.NODE_ENV === 'development') {
        app.use(cors()); // disable cors by adding '*' header
    }
    app.use(json());
    app.use(session());
    app.use(requireLogin(['/recipe', '/user/login', '/user/logout'])); // allow '/recipe' temporary
};

module.exports.setup = setup;
