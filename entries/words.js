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

module.exports = entrySchema;

let code_library = {
        name_of_library: 'Underscore',
        id_of_library: '',
        content: {
            name_of_code: {
                name: 'each',
                code: '_.each(list, iteratee, [context])',
                description: "Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.",
                id: ''
            }
        }
    }

