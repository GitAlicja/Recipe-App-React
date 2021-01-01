/**
 * Setup and run the backend server / application.
 */
const express = require('express');
const dotenv = require('dotenv');
const Db = require('../db/connection/DbConnection');

const middleware = require('../middleware');
const routes = require('../routes');

const app = express();
const port = 3100;

dotenv.config();
middleware.setup(app);
routes.setup(app);

Db.connect().then(() => {
    app.listen(port, () => console.log(`Backend server listening at http://localhost:${port}`));
});
