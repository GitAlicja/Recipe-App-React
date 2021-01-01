const express = require('express');
const router = express.Router();
const RecipeModel = require('../db/model/RecipeModel');

router.get('/', (req, res) => {
    RecipeModel.find().then(recipes => {
        res.send(recipes);
    });
});

module.exports = router;
