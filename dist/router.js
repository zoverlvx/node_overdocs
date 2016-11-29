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

//GET single library // I think I need to update this with methods and descriptions
// router.get('/libraries/:library_name', (req, res) => {
//     console.log('Libraries.library_name: ', Libraries);
//     console.log('params.library_name: ', req.params);
//     Libraries.findOne({
//         library_name: req.params.library_name
//     }), (err, library) => {
//         if (err) {
//             return res.status(500).json({
//                 message: 'Library not found'
//             });
//         }
//         res.json(library);
//     }
// });

// e.g. Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});


//GET method 
router.get('/libraries/:library_name/:method', function (req, res) {
    Libraries.findOne({
        method: req.params.library_name.entries[0].method
    }), function (err, method) {
        if (err) {
            return res.status(500).json({
                message: 'Method not found.'
            });
        }
        res.json(method);
    };
});

//GET description
router.get('/libraries/:library_name/:method/:description', function (req, res) {
    Libraries.findOne({
        description: req.params.library_name.entries[0].description
    }), function (err, description) {
        if (err) {
            return res.status(500).json({
                message: 'Description not found.'
            });
        }
        res.json(description);
    };
});

//POST libraries
router.post('/libraries', function (req, res) {
    //console.log(req.body);
    Libraries.create({
        library_name: req.params.library_name
    }, function (err, library) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(library);
    });
});

//PUT 
router.put('/libraries/:method/:description', function (req, res) {
    Libraries.findOneAndUpdate({
        library_name: Libraries.library_name
    }, Libraries.entries[{
        method: req.params.library_name.entries[0].method,
        description: req.params.library_name.entries[0].description
    }]); //This doesn't look right at all
});

// Not sure if this is better code for the PUT

// router.put(`/libraries/${Libraries.library_name}`, (req, res) => {
//     Libraries.findOneAndUpdate({
//         "library_name": Libraries.library_name
//     }, {
//         "$set": {
//             "method": Libraries.library_name.entries[0].method,
//             "description": Libraries.library_name.entries[0].description
//         }
//     }).exec((err, library) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err);
//         }
//         else {
//             res.status(200).send(library);
//         }
//     });
// });


//POST library object in Mongo
// router.post('/libraries', (req, res) => {
//     console.log(req.body);
//     let mylibraryToAdd = new Libraries({
//             library_name: req.body.toString(),
//             entries: [{
//                 method: req.body.toString(),
//                 description: req.body.toString()
//             }]
//         })
//         mylibraryToAdd.save((err, library) => {
//             if (err) {
//                 console.error(err);                
//             }            
//                 console.log({library});

//         });

// });


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