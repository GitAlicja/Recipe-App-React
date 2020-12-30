
const mongoose = require('mongoose');

exports.connect = () => {
    return mongoose.connect(process.env.DATABASE_URL);
};

exports.close = () => {
    return mongoose.connection.close();
};