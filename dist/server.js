'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var router = require('./router');
var _ = require('underscore');

app.use('/', router);

console.log('Starting program.');

app.use(jsonParser);
app.use(express.static('../public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/libraries');

mongoose.connection.on('error', function (error) {
   console.log('Could not connect. Error:', error);
});

app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map