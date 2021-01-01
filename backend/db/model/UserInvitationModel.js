/**
 * User invitation DB schema
 */
const mongoose = require('mongoose');

const userInvitationSchema = new mongoose.Schema({

    email: {type: String, required: true, index: true, unique: true},
    registrationKey: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model('UserInvitation', userInvitationSchema);
