const express = require('express');
const app = express();
const port = 3000;

const dotenv = require('dotenv');
dotenv.config();

const db = require('./db');

const RecipeSchema = require('./models/RecipeSchema');

app.use(express.json());


app.get('/', (req, res) => {
    RecipeSchema.find().then(recipes => {
        res.send(recipes);
    });
});

db.connect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
});