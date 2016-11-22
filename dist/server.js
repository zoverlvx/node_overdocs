'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var router = require('./router');
var _ = require('underscore');

console.log('Starting program.');

app.use(jsonParser);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/libraries');

mongoose.connection.on('error', function (error) {
   console.log('Could not connect. Error:', error);
});

app.use('/', router);

app.use(express.static('../public'));

app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map