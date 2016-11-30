'use strict';

const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Libraries = require('../models/library');
const _ = require('underscore');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(jsonParser);


//GET all libraries
router.get('/libraries', (req, res) => {
    Libraries.find((err, library_name) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name);
    });
});

//GET method 
router.get('/libraries/:library_name/', (req, res) => {

    console.log('This is with params ' + req.params.library_name);
    console.log('This is with body ' + req.body);

    Libraries.findOne({
        method: req.params.library_name.entries[0].method
    }), (err, method) => {
        if (err) {
            return res.status(500).json({
                message: 'Method not found.'
            });
        }
        res.json(method);
    }
});

//GET description
router.get('/libraries/:library_name/:method/', (req, res) => {
    Libraries.findOne({
        description: req.params.library_name.entries[0].description
    }), (err, description) => {
        if (err) {
            return res.status(500).json({
                message: 'Description not found.'
            });
        }
        res.json(description);
    }
});

//POST libraries
router.post('/libraries', (req, res) => {
    Libraries.create({
        library_name: req.params.library_name
    }, (err, library) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(library);
    });
});

//PUT
router.put('/libraries/:library_name', (req, res) => {
    Libraries.findOneAndUpdate({
            "library_name": req.params.library_name
        }, {
            "$set": {
                "method": req.params.library_name.entries[0].method,
                "description": req.params.library_name.entries[0].description
            }
        })
        .exec((err, update) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send(update);
            }
        })
});

//StackOverFlow Example
// Book.findOneAndUpdate({ "_id": bookId }, { "$set": { "name": name, "genre": genre, "author": author, "similar": similar}}).exec(function(err, book){
//   if(err) {
//       console.log(err);
//       res.status(500).send(err);
//   } else {
//             res.status(200).send(book);
//   }
// });

//DELETE library and methods

//DELETE method and description

module.exports = router;
