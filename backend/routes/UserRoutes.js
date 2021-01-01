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
            if (user) {
                res.send(userForApiOutput(user));
                console.info(`User login success for '${email}'`);
            } else {
                res.sendStatus(401);
                console.info(`User login failed for '${email}', unauthorized`);
            }
        })
        .catch(error => {
            console.error(`User login failed for '${email}'`, error);
            res.sendStatus(500);
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
            res.sendStatus(204);
            console.info(`User logout success for '${userId}'`);
        })
        .catch(error => {
            console.error(`User logout failed for '${userId}'`, error);
            res.sendStatus(500);
        });
});

/**
 * Get own user details.
 */
router.get('/', (req, res) => {
    const userId = (req.session && req.session.userId) || '(unknown)';
    new UserController(req.session)
        .getLoggedInUser()
        .then(user => {
            if (!user) {
                throw new Error(`User get self '${userId}' not found`);
            }
            res.send(userForApiOutput(user));
            console.info(`User get self success for '${user._id}'`)
        })
        .catch(error => {
            console.error(`User get self failed for '${userId}'`, error);
            res.sendStatus(500);
        });
});

/**
 * Update own user properties.
 */
router.patch('/', (req, res) => {

    const userId = (req.session && req.session.userId) || '(unknown)';
    const name = getNonEmptyString('name', req.body) || (req.body.hasOwnProperty('name') ? null : undefined);
    const avatarUrl = getNonEmptyString('avatarUrl', req.body) || (req.body.hasOwnProperty('avatarUrl') ? null : undefined);

    if (name === null) {
        res.status(400).send({reason: 'Invalid parameters', invalidParams: ['name']});
        console.info(`User update self failed for '${user._id}', invalid param name`);
        return;
    }

    new UserController(req.session)
        .updateUser({name, avatarUrl})
        .then(user => {
            if (!user) {
                throw new Error(`User update self '${userId}' not found`);
            }
            res.send(userForApiOutput(user));
            console.info(`User update self success for '${user._id}'`)
        })
        .catch(error => {
            console.error(`User update self failed for '${userId}'`, error);
            res.sendStatus(500);
        });
});

/**
 * Set new password.
 */
router.post('/updatePassword', (req, res) => {

    const userId = (req.session && req.session.userId) || '(unknown)';
    const oldPassword = getNonEmptyString('oldPassword', req.body);
    const newPassword = getNonEmptyString('newPassword', req.body);
    if (!oldPassword || !newPassword) {
        const invalidParams = [];
        !newPassword && invalidParams.push('newPassword');
        !oldPassword && invalidParams.push('oldPassword');
        res.status(400).send({reason: 'Invalid parameters', invalidParams});
        console.info(`User update password failed for '${userId}'. Invalid params:`, invalidParams);
        return;
    }

    new UserController(req.session)
        .updatePassword(oldPassword, newPassword)
        .then(user => {
            if (!user) {
                throw new Error(`User update password '${userId}' not found`);
            }
            res.sendStatus(204);
            console.info(`User update password success for '${user._id}'`)
        })
        .catch(error => {
            console.error(`User update password failed for '${userId}'`, error);
            res.sendStatus(500);
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

/**
 * Convert UserModel to API output by removing sensitive data.
 *
 * @param userModel DB model
 * @returns JSON for API output
 */
const userForApiOutput = userModel => ({...userModel, passwordHash: undefined});

module.exports = router;
