/**
 * User DB Schema
 */
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true, index: true},
    passwordHash: {type: String, required: true},
    avatarUrl: {type: String, required: false},
    createdAt: {type: Date, required: true, default: Date.now},
    lastModified: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
