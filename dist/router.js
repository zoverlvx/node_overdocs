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
    //console.log(req.headers['user-agent']);
    //console.log(req.headers);
    console.log(req.body);

    Libraries.find(function (err, library_name) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name);
    });
});

//GET library
router.get('/libraries/:library_name/', function (req, res) {
    Libraries.findOne({
        library_name: req.params.library_name
    }), function (err, method) {
        if (err) {
            return res.status(500).json({
                message: 'Library not found.'
            });
        }
        res.json(method);
    };
});

//GET method
router.get('/libraries/:library_name/:method/', function (req, res) {
    console.log(req.params);
    Libraries.findOne({
        method: req.params.method
    }), function (err, description) {
        if (err) {
            return res.status(500).json({
                message: 'Method not found.'
            });
        }
        res.json(description);
    };
});

//POST libraries
router.post('/libraries', function (req, res) {
    console.log(req.body);
    console.log('This is params', req.params);
    Libraries.create({
        library_name: req.body.library_name
    }, function (err, library) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(library);
    });
});

//POST method and description to library
router.post('/libraries/:library_name', function (req, res) {
    console.log(req.body);
    Libraries.findOneAndUpdate({
        library_name: req.params.library_name
    }, {
        $set: {
            entries: [{
                method: req.body.method,
                description: req.body.description
            }]
        }
    }, function (err, library) {
        if (err) {
            console.log(err);
        }
        console.log(library);
    });
});

//PUT
// router.put('/libraries/:library_name', (req, res) => {
//     console.log('This is req.body: ', req.body);
//     console.log('This is req.params ',  req.params);
//     console.log('This is req.body.entries[0] ', req.body.entries[0]);
//     console.log('This is req.body.entries[0].method ', req.body.entries[0].method);
//     console.log('This is req.body.entries[0].description', req.body.entries[0].description);
//     console.log('This is req.params.library_name', req.params.library_name);
//console.log('This is req.body.library_name', req.body.library_name);

//     Libraries.findOneAndUpdate({
//             "library_name": req.params.library_name
//         }, 
//         {
//             $set: [{
//                 "method": req.body.entries[0].method,
//                 "description": req.body.entries[0].description
//             }]
//         })
//         .exec((err, update) => {
//             console.log('Update', update);
//             if (err) {
//                 res.status(500).send(err);
//             }
//             else {
//                 res.status(200).send(update);
//             }
//         })
// });

// This is to edit the name of an already existing library
// router.put('/libraries/:library_name', (req, res) => {
//     let library_name = req.params.library_name;
//     Libraries.findOne({
//         library_name: library_name
//     }, (err, updatedLibrary) => {
//         if (err) {
//             res.status(500).send(err);
//         }
//         else if (req.params.library_name) {
//             updatedLibrary.library_name = req.params.library_name;
//             res.status(200).send(updatedLibrary);
//         }
//     });
// });

// need a an edit button to change the library_name instead of using submit specifically

//This is to edit the name of an already existing method
router.put('/libraries/:library_name/:method', function (req, res) {
    // params as it relates to body, I understand // query - still more to be said //url
    var method = req.body.entries[0].method;
    Libraries.findOne({
        method: method
    }, function (err, updatedMethod) {
        if (err) {
            res.status(500).send(err);
        } else if (req.body.entries[0].method) {
            updatedMethod.method = req.body.entries[0].method;
            res.status(200).send(updatedMethod);
        }
    });
});

router.put('/libraries/:library_name/:method/:description', function (req, res) {
    var description = req.body.entries[0].description; // still, no idea why this is doing this   
    Libraries.findOne({
        description: description
    }, function (err, updatedDescription) {
        if (err) {
            res.status(500).send(err);
        } else if (req.body.entries[0].description) {
            updatedDescription.description = req.body.entries[0].description;
            res.status(200).send(updatedDescription);
        }
    });
});

// params - 
// body -
// query -


//DELETE library and methods
router.delete('/libraries/:library_name', function (req, res) {
    var library_name = req.params.library_name;
    Libraries.findOneAndRemove({
        library_name: library_name
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send();
        }

        res.status(200).send();
    });
});

//DELETE method and description
router.delete('/libraries/:library_name/:method', function (req, res) {
    var method = req.body.entries[0].method;
    Libraries.findOneAndRemove({
        method: method
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send();
        }

        res.status(200).send();
    });
});

module.exports = router;
//# sourceMappingURL=router.js.map