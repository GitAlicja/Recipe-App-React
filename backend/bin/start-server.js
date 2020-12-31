/**
 * Setup and run the backend server / application.
 */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {connectDb} = require('../db/connection');
const RecipeSchema = require('../db/schema/RecipeSchema');

const app = express();
const port = 3100;
dotenv.config();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    RecipeSchema.find().then(recipes => {
        res.send(recipes);
    });
});

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Backend server listening at http://localhost:${port}`);
    });
});
