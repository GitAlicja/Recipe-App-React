/**
 * Functions to open and close DB connection.
 */
const mongoose = require('mongoose');

exports.connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
};

exports.closeDb = () => {
    return mongoose.connection.close();
};
