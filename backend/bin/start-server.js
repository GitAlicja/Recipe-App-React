/**
 * Setup and run the backend server / application.
 */
const express = require('express');
const dotenv = require('dotenv');
const {connectDb} = require('../db/connection');
const RecipeSchema = require('../db/schema/RecipeSchema');

const startServer = express();
const port = 3000;
dotenv.config();

startServer.use(express.json());

startServer.get('/', (req, res) => {
    RecipeSchema.find().then(recipes => {
        res.send(recipes);
    });
});

connectDb().then(() => {
    startServer.listen(port, () => {
        console.log(`Backend server listening at http://localhost:${port}`);
    });
});
