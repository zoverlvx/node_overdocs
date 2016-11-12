'use strict';

const express = require("express");
const router = express.Router();
const Word = require('../entries/words');
const _ = require('underscore');
let nextId_lib = 1;
let nextId_code = 1;

router.get('/', (req, res) => {
    res.send('API Root');
});

router.get('/entries', (req, res) => {
    Word.find((err, words) => {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(words);
    });
});

router.get('/entries/:_id', (req, res) => {
    Word.findOne({_id: req.params._id}), (err, words) => {
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
    
    body.id_of_library = nextId_lib++;
    body.id = nextId_code++;
    
    // Need some way to push/add props to the object?
    
    res.json(body);
});

router.put('/entries/:_id', (req, res) => {
    
});

router.delete('/entries/:_id', (req, res) => {
   
//   if () {}
//   else {}
    
});

module.exports = router