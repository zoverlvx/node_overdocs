//implement CRUD 

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
//console.log(express.Router);

app.use(bodyParser.json());
app.use(express.static('../public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dictionary');

mongoose.connection.on('error', err => {
    console.log('Could not connect. Error:', err);
});


app.listen(PORT, () => {
   console.log(`Express listening on port ${PORT}`); 
});
 
