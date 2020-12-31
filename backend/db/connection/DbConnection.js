/**
 * Functions to open and close DB connection.
 */
const mongoose = require('mongoose');

module.exports.connect = () => {
    return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};

module.exports.close = () => {
    return mongoose.connection.close();
};

module.exports.getConnection = () => mongoose.connection;
