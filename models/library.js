'use strict';

const mongoose = require('mongoose');

let librarySchema = new mongoose.Schema({

    library_name: String,
    entries: [{
        method: String,
        description: String
    }]

});

//let Libraries = mongoose.model('librarySchema', librarySchema);
let Libraries = mongoose.model('Libraries', librarySchema); // I think I've corrected this

module.exports = Libraries;

