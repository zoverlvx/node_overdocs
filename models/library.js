'use strict';

const mongoose = require('mongoose');

//option: strict ?

let librarySchema = new mongoose.Schema({

    library_name: String, //make Schema require a library_name
    entries: [{
        method: String,
        description: String
    }]

});

//Updated Schema
// let librarySchema = new mongoose.Schema({
//     library_name: {
//         type: String,
//         required: true
//     },
//     entries: [{
//         method: {
//             type: String,
//             required: true
//         },
//         description: {
//             type: String,
//             required: true
//         }
//     }]
// });

let Libraries = mongoose.model('Libraries', librarySchema);

module.exports = Libraries;

