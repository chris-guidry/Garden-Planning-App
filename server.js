var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('config');
var port = config.get('gardenPlan.webServer.port');
var database = config.get('gardenPlan.databaseServer');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var validator  = require('express-validator');

mongoose.connect('mongodb://' + config.get('gardenPlan.databaseServer.host') + '/' + config.get('gardenPlan.databaseServer.database'));

app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
//app.use(validator());
//app.use(function(req, res, next) {
//  for (var item in req.body) {
//    req.sanitize(item).escape();
//  }
//  next();
//});
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

//for testing
module.exports = app;