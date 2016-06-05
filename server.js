'use strict';

// BASE SETUP
// =============================================================================

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const scrapers    = require('pf-scrapers');
const _           = require('lodash');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;


// API ROUTES
// =============================================================================

const router = express.Router();    // get an instance of the express router

// middleware to use for all requests
router.use( (req, res, next) => {
  console.log("Request received...");
  next();
});

// test route to verify connection (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({ message: "Connection to Pilot-Fish API was successful" });
});

// routes will end with /search
router.route('/search')

  // perform a search
  .post( (req, res) => {
    let args = {
      limit: req.body.limit == null ? 1 : req.body.limit,
      title: req.body.title
    };

    let promises = scrapers;

    Promise.all(promises.map( (x) => x(args)))
      .then( (results) => {
        results = _.flatten(results);
        res.json(results);
      });
  });

// REGISTER ROUTES --------------------------
// all routes will be prefixed with /api
app.use('/api', router);


// START SERVER
// =============================================================================
app.listen(port);
console.log("API Server running on port: " + port);
