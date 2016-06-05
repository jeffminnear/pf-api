'use strict';

// BASE SETUP
// =============================================================================

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;


// API ROUTES
// =============================================================================

const router = express.Router();    // get an instance of the express router

// test route to verify connection (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: "Connection to Pilot-Fish API was successful" });
});



// REGISTER ROUTES --------------------------
// all routes will be prefixed with /api
app.use('/api', router);


// START SERVER
// =============================================================================
app.listen(port);
console.log("API Server running on port: " + port);
