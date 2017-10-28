// setting up the node-postgres driver
var pg = require('pg');
var postgresUrl = 'postgres://localhost/stackathon'; //prof's code doesn't have this
// var postgresUrl = process.env.DATABASE_URL //i vaguely remember DATABASE_URL was what heroku provided

var client = new pg.Client(postgresUrl);


// connecting to the `postgres` server
client.connect();

// make the client available as a Node module
module.exports = client;

