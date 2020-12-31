const express = require('express');
const router = express.Router();
const {UserController} = require('../controller/UserController');

/**
 * User login
 */
router.post('/login', (req, res) => {

    const email = getNonEmptyString('email', req.body);
    const password = getNonEmptyString('password', req.body.password);
    if (!password || !email) {
        const invalidParams = [];
        !email && invalidParams.push('email');
        !password && invalidParams.push('password');
        res.status(400).send({reason: 'Invalid parameters', invalidParams});
        console.info(`User login failed for '${email}'. Invalid params:`, invalidParams);
        return;
    }

    new UserController(req.session)
        .login(email, password)
        .then(user => {
            res.status(user ? 200 : 401).send(user);
            console.info(`User login success for '${email}'`);
        })
        .catch(error => {
            console.error(`User login failed for '${email}'`, error);
            res.status(500).send({error: 'Internal server error'})
        });
});

/**
 * User logout
 */
router.post('/logout', (req, res) => {
    const userId = (req.session && req.session.userId) || '(unknown)';

    new UserController(req.session)
        .logout()
        .then(() => {
            res.status(204).send();
            console.info(`User logout success for '${userId}'`);
        })
        .catch(error => {
            console.error(`User logout failed for '${userId}'`, error);
            res.status(500).send({error: 'Internal server error'})
        });
});

/**
 * Get own user details.
 */
router.get('/me', (req, res) => {
    const userId = (req.session && req.session.userId) || '(unknown)';
    new UserController(req.session)
        .getLoggedInUser()
        .then(user => {
            if (!user) {
                throw new Error(`User get self '${userId}' not found`);
            }
            res.send(user);
            console.info(`User get self success for '${user._id}'`)
        })
        .catch(error => {
            console.error(`User get self failed for '${userId}'`, error);
            res.status(500).send({error: 'Internal server error'})
        });
});

/**
 * Update own user properties.
 */
router.patch('/me', (req, res) => {

    const name = getNonEmptyString('name', req.body) || (req.body.hasOwnProperty('name') ? null : undefined);
    const avatarUrl = getNonEmptyString('avatarUrl', req.body) || (req.body.hasOwnProperty('avatarUrl') ? null : undefined);

    if (name === null) {
        res.status(400).send({reason: 'Invalid parameters', invalidParams: ['name']});
        return;
    }

    const userId = (req.session && req.session.userId) || '(unknown)';
    new UserController(req.session)
        .updateUser({name, avatarUrl})
        .then(user => {
            if (!user) {
                throw new Error(`User update self '${userId}' not found`);
            }
            res.send(user);
            console.info(`User update self success for '${user._id}'`)
        })
        .catch(error => {
            console.error(`User update self failed for '${userId}'`, error);
            res.status(500).send({error: 'Internal server error'})
        });
});

/**
 * Get trimmed string from object (only if not empty).
 *
 * @param key property key
 * @param body object containing key (may be falsy)
 * @returns {string|undefined} string if valid, undefined otherwise
 */
const getNonEmptyString = (key, body) => {
    if (!body || typeof body[key] !== 'string' || body[key].trim().length < 1) {
        return undefined;
    }
    return body[key].trim();
}
