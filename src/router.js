'use strict';

const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Libraries = require('../models/library');
const _ = require('underscore');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
//let nextId_lib = 1;
//let nextId_code = 1;

app.use(jsonParser);

router.get('/libraries', (req, res) => {
    Libraries.find((err, library_name) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name); // end of reading
    });
});

//on request of route of libraries/library_name
//spits out an array of entries[i].method and entries[i].description

router.get('/libraries/:_id', (req, res) => { 
    Libraries.findOne({
        _id: req.params._id
    }), (err, library) => {
        if (err) {
            return res.status(500).json({
                message: 'Library not found'
            });
        }
        res.json(library);
    }
});

router.get('/libraries/library_name', (req, res) => {
    Libraries.findOne({
        method: req.params.method,
        description: req.params.description
    }), (err, method) => {
        if (err) {
            return res.status(500).json({
                message: 'Method not found'
            });
        }
        res.json(method);
    }
})



//POST

router.post('/libraries', (req, res) => {
    console.log(req.body);
    Libraries.create({
        library_name: req.body.library_name
    }, (err, library) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(library);
    });
});



router.put('/libraries/:_id', (req, res) => {
    let nameId = parseInt(req.params.id, 10);
    //counter for the library id?
    let matchedNameId = _.findWhere()
//???
});

router.put('/libraries/library_name', (req, res) => {
//????
})

router.delete('/libraries/:_id', (req, res) => {

    Libraries.findByIdAndRemove(req.params._id, (err, library) => {
        if (err) {
            return res.status(404);
        }
        res.json({
            message: 'Library deleted.'
        })
    });

});

module.exports = router;
