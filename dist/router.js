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

//GET single library // I don't think I need this
router.get('/libraries/:_id', function (req, res) {
    Libraries.findOne({
        library_name: Libraries.library_name
    }), function (err, library) {
        if (err) {
            return res.status(500).json({
                message: 'Library not found'
            });
        }
        res.json(library);
    };
});

//GET method and description from library // I think this almost works
router.get('/libraries/' + Libraries.library_name, function (req, res) {
    Libraries.findOne({
        method: Libraries.library_name.entries[0].method,
        description: Libraries.library_name.entries[0].description
    }), function (err, method) {
        if (err) {
            return res.status(500).json({
                message: 'Method not found'
            });
        }
        res.json(method);
    };
});

//POST libraries
router.post('/libraries', function (req, res) {
    //console.log(req.body);
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

//PUT 
router.put('/libraries/' + Libraries.library_name, function (req, res) {
    Libraries.findOneAndUpdate({ library_name: Libraries.library_name }, Libraries.entries[{
        method: req.body.toString(),
        description: req.body.toString()
    }]);
});

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