'use strict';

const express = require("express");
const router = express.Router();
const Entries = require('../entries/words');
const _ = require('underscore');
let nextId_lib = 1;
let nextId_code = 1;

router.get('/entries', (req, res) => {
    Entries.find((err, words) => {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(words);
    });
});

router.get('/entries/:_id', (req, res) => { // 
    Entries.findOne({_id: req.params._id}), (err, words) => {
        if (err) {
            return res.status(500).json({
                message: 'Definition not found'
            });
        }
        res.json(words);
    }
});

router.post('/entries', (req, res) => {
  let body = _.pick(req.body, 'name_of_library', 'name', 'code', 'description'); // in '' put in the property(s) that must be included 

    if (!_.isString(body.words) || !_.isString(body.definitions) || body.definitions.trim().length === 0) {
        return res.status(400).send();
    }
    
    body.description = body.description.trim();
    
    body.id_of_library = nextId_lib++; // I think this needs to be a separate post b/c 
    // I'm adding the name of the library, then a name of the method, then an example of the method, and a description
    // 
    body.id = nextId_code++;
    
    // Need some way to push/add props to the object?
    
    res.json(body);
});

router.put('/entries/:_id', (req, res) => {
    let nameId = parseInt(req.params.id, 10);
    //counter for the library id?
    let matchedNameId = _.findWhere()
    
});

router.delete('/entries/:_id', (req, res) => {
   
//   if () {}
//   else {}
    
});

module.exports = router;
module.exports = Entries;