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

//on request of route of libraries/library_name
//spits out an array of entries[i].method and entries[i].description

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

router.get('/libraries/library_name', function (req, res) {
    Libraries.findOne({
        method: req.params.method,
        description: req.params.description
    }), function (err, method) {
        if (err) {
            return res.status(500).json({
                message: 'Method not found'
            });
        }
        res.json(method);
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
    //???
});

router.put('/libraries/library_name', function (req, res) {
    //????
});

// app.put('/todos/:id', (req, res) => {
//     let todoId = parseInt(req.params.id, 10);
//     let matchedTodo = _.findWhere(todos, {
//         id: todoId
//     });

//     let body = _.pick(req.body, 'description', 'completed');
//     let validAttributes = {};

//     if (!matchedTodo) {
//         return res.status(404).send();
//     }

//     if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
//         validAttributes.completed = body.completed;
//     } else if (body.hasOwnProperty('completed')) {
//         return res.status(400).send();
//     }

//     if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
//         validAttributes.description = body.description
//     } else if (body.hasOwnProperty('description')) {
//         return res.status(400).send();
//     }

//     _.extend(matchedTodo, validAttributes);
//     res.json(matchedTodo);
// });


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