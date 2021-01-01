const bcrypt = require('bcrypt');
const UserModel = require('../db/model/UserModel');

const saltIterations = 10;

/**
 * User management logic
 */
class UserController {

    /**
     * Create request scoped instance.
     *
     * @param session request session
     */
    constructor(session) {
        this.session = session;
    }

    /**
     * Create and save a new user to DB. User is logged in afterwards.
     *
     * @param name user name
     * @param email user email
     * @param password user password (plaintext)
     * @returns {Promise<UserModel>} created user
     * @throws RegistrationError if precondition fails
     */
    async register(name, email, password) {

        if (await UserModel.findOne({email})) {
            throw new RegistrationError(`User with email '${email}' already exists`,
                RegistrationError.prototype.DUPLICATE_EMAIL);
        }
        if (await UserModel.findOne({name})) {
            throw new RegistrationError(`User with email '${name}' already exists`,
                RegistrationError.prototype.DUPLICATE_NAME);
        }

        const passwordHash = await bcrypt.hash(password, saltIterations);
        const newUser = {email, name, passwordHash};
        const user = await UserModel.create(newUser);
        this.session.userId = user._id;
        return user;
    }

    /**
     * Validate user credentials and login a user.
     *
     * @param email user email
     * @param password user password (plaintext)
     * @returns {Promise<UserModel|undefined>} logged in user if success, undefined if login failed.
     */
    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user || !await bcrypt.compare(password, user.passwordHash)) {
            this.session.destroy();
            return undefined;
        }
        this.session.userId = user._id;
        return user;
    }

    /**
     * Destroy a user session.
     *
     * @returns {Promise<void>} when executed
     */
    async logout() {
        this.session.destroy();
    }

    /**
     * Get the current logged in user by session.
     *
     * @returns {Promise<null|UserModel>} null if not logged in, UserModel otherwise
     */
    async getLoggedInUser() {
        if (!this.session.userId) {
            return null;
        }
        return UserModel.findById(this.session.userId).exec();
    }


    /**
     * Update / patch allowed user properties for logged in user, if set.
     *
     * @param changes object with name or avatarUrl to save
     * @returns {Promise<UserModel>} updated UserModel
     * @throws UpdateError if update failed
     */
    async updateUser(changes) {
        const user = await this.getLoggedInUser();
        if (!user) {
            throw new UpdateError('Not logged-in!', UpdateError.prototype.NOT_LOGGED_IN);
        }
        if (changes.avatarUrl !== undefined) {
            user.avatarUrl = changes.avatarUrl;
        }
        if (changes.name) {
            user.name = changes.name;
        }
        user.lastModified = new Date();
        return await user.save();
    }

    /**
     * Set a new password for the current user.
     *
     * @param oldPassword old password for confirmation
     * @param newPassword new password to set
     * @returns {Promise<boolean>} true if success, false if old password mismatch
     * @throws UpdateError if user not logged in
     */
    async updatePassword(oldPassword, newPassword) {
        const user = await this.getLoggedInUser();
        if (!user) {
            throw new UpdateError('Not logged-in!', UpdateError.prototype.NOT_LOGGED_IN);
        }
        if (!await bcrypt.compare(oldPassword, user.passwordHash)) {
            return false;
        }
        user.passwordHash = bcrypt.hash(newPassword, saltIterations);
        user.lastModified = new Date();
        await user.save();
        return true;
    }
}

/**
 * Thrown in registration process.
 */
class RegistrationError extends Error {

    constructor(message, cause) {

        super(message);
        this.cause = cause;
    }
}

RegistrationError.prototype.DUPLICATE_EMAIL = 'duplicateEmail';
RegistrationError.prototype.DUPLICATE_NAME = 'duplicateName';

/**
 * Thrown during user update.
 */
class UpdateError extends Error {
    constructor(message, cause) {

        super(message);
        this.cause = cause;
    }
}

UpdateError.prototype.NOT_LOGGED_IN = 'not_logged_in';


module.exports = {UserController, RegistrationError, UpdateError};
