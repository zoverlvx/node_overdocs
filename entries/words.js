'use strict';

const mongoose = require('mongoose');

let entrySchema = new mongoose.Schema({
    entry: {
        library: {
            name_of_library: String,
            // id_of_library: ObjectId, ???
            contents: String
            
        }
    }
});

let mongooseModel = mongoose.model('entrySchema', entrySchema);

module.exports = mongooseModel;
