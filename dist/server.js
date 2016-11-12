//implement CRUD 

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var PORT = process.env.PORT || 3000;
var mongoose = require('mongoose');
var router = require('./router');

app.use('/', router);

console.log('Starting program.');
console.log(express.Router);

app.use(bodyParser.json());
app.use(express.static('../public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dictionary');

mongoose.connection.on('error', function (err) {
   console.err('Could not connect. Error:', err);
});

// I don't think I need a post because the user isn't submitting anything
// I need a way to clear the page/refresh for the next word

app.listen(PORT, function () {
   console.log('Express listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map