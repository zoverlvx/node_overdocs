'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const router = require('./router');
const _ = require('underscore');

app.use('/', router)

console.log('Starting program.');

app.use(jsonParser);
app.use(express.static('../public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/libraries');

mongoose.connection.on('error', error => {
    console.log('Could not connect. Error:', error);
});


app.listen(PORT, () => {
   console.log(`Express listening on port ${PORT}`); 
});
 
