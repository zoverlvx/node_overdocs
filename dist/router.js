'use strict';

var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Libraries = require('../models/library');
var _ = require('underscore');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(jsonParser);

//GET all libraries
router.get('/libraries', function (req, res) {
    Libraries.find(function (err, library_name) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name);
    });
});

//GET single library // I don't think this is doing anything on the DOM yet
router.get('/libraries/:_id', function (req, res) {
    Libraries.findOne({
        _id: req.params._id
    }), function (err, library) {
        if (err) {
            return res.status(500).json({
                message: 'Library not found'
            });
        }
        res.json(library);
    };
});

//on request of route of libraries/library_name
//spits out an array of entries[i].method and entries[i].description

// router.get('/libraries/library_name', (req, res) => {
//     Libraries.findOne({
//         method: req.params.method,
//         description: req.params.description //this isn't declared???
//     }), (err, method) => {
//         if (err) {
//             return res.status(500).json({
//                 message: 'Method not found'
//             });
//         }
//         res.json(method);
//     }
// })

//POST library object in Mongo
router.post('/libraries', function (req, res) {
    console.log(req.body);
    console.log('Oi');
    var mylibraryToAdd = new Libraries({
        library_name: req.body.toString(),
        entries: [{
            method: req.body.toString(),
            description: req.body.toString()
        }]
    });
    mylibraryToAdd.save(function (err, library) {
        if (err) {
            console.error(err);
        }
        console.log({ library: library });
    });
});

//Seems doable
router.delete('/libraries/:_id', function (req, res) {

    Libraries.findByIdAndRemove(req.params._id, function (err, library) {
        if (err) {
            return res.status(404);
        }
        res.json({
            message: 'Library deleted.'
        });
    });
});

module.exports = router;
//# sourceMappingURL=router.js.map