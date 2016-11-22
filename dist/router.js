'use strict';

var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var Libraries = require('../models/library');
var _ = require('underscore');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//let nextId_lib = 1;
//let nextId_code = 1;

app.use(jsonParser);

router.get('/libraries', function (req, res) {
    Libraries.find(function (err, library_name) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name); // end of reading
    });
});

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

//POST

router.post('/libraries', function (req, res) {
    console.log(req.body);
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

router.put('/libraries/:_id', function (req, res) {
    var nameId = parseInt(req.params.id, 10);
    //counter for the library id?
    var matchedNameId = _.findWhere();
});

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