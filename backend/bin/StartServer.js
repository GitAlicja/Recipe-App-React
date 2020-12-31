/**
 * Setup and run the backend server / application.
 */
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const dotenv = require('dotenv');
const cors = require('cors');
const {DbConnection, RecipeModel} = require('../db');

const app = express();
const port = 3100;
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { path: '/', httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600 * 1000 },
    unset: 'destroy',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: DbConnection.getConnection(),
        ttl: 3600 * 24 // 1 day
    })
}));

app.get('/', (req, res) => {
    RecipeModel.find().then(recipes => {
        res.send(recipes);
    });
});

DbConnection.connect().then(() => {
    app.listen(port, () => {
        console.log(`Backend server listening at http://localhost:${port}`);
    });
});
