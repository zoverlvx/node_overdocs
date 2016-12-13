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

//GET singular library
router.get('/libraries/:library_name', (req, res) => {
    let query = Libraries.where({
        library_name: req.params.library_name
    });

    query.findOne((err, library) => {
        if (err) {
            return res.status(404).json({
                status: 'error'
            });
        }
        else {
            res.json(library)
        }
    });
});

//GET method
router.get('/libraries/:library_name/', (req, res) => { // deleted :method
    console.log('Got methods');
    Libraries.findOne({
        method: req.params.method
    }), (err, description) => {

        if (typeof method === 'undefined') {
            return res.status(404).json({
                status: 'error'
            });
        }
        else if (err) {
            return res.status(500).json({
                message: 'Method not found.'
            });
        }
        res.json(description);
        console.log(description);
    }
});

//GET Method edit
// router.get()

//POST libraries
router.post('/libraries', (req, res) => {
    Libraries.create({
        library_name: req.body.library_name
    }, (err, library) => {

        if (typeof library_name === 'undefined') {
            return res.status(412).json({
                status: 'Precondition wasn\'t met'
            });
        }
        else if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(library);
        console.log(library);
    });
});

//PUT method and description to library
router.put('/libraries/:library_name', (req, res) => {
    Libraries.findOneAndUpdate({
        library_name: req.params.library_name,
    }, {
        $push: {
            entries: {
                method: req.body.method,
                description: req.body.description
            }
        }
    }, (err, library) => {

        if (typeof method === 'undefined' || typeof description === 'undefined') {
            res.status(404).json({
                status: 'error'
            });
        }
        else if (err) {
            console.log(err)
        }
        console.log(library);
    });
});

//DELETE library and methods // works beautifully
router.delete('/libraries/:library_name', (req, res) => {
    let library_name = req.params.library_name;
    Libraries.findOneAndRemove({
        library_name: library_name
    }, (err, library) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        console.log(library);
        res.status(200).send();
    });
});

//DELETE method and description // Can't tell if this is completely working because I can't GET methods to DOM
router.delete('/libraries/:library_name/:method', (req, res) => {
    let method = req.body.method;
    let description = req.body.description;
    Libraries.find().remove({
        entries: {
            method: method,
            description: description
        },

    }, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }

        res.status(200).send();
    });
});

module.exports = router;

