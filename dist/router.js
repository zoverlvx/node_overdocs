'use strict';

var express = require("express");
var app = express();
var router = express.Router();
var Libraries = require('../models/library');
var _ = require('underscore');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var nextId_lib = 1;
var nextId_code = 1;

app.use(bodyParser.json());

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

//fix words
router.get('/libraries/:_id', function (req, res) {
    // 
    Libraries.findOne({ _id: req.params._id }), function (err, library_name) {
        if (err) {
            return res.status(500).json({
                message: 'Library not found'
            });
        }
        res.json(library_name);
    };
});

//POST

router.post('/libraries', function (req, res) {
    var body = req.body;

    // id field?

    console.log('description: ' + body.description);

    // push?

    res.json(body);
});

router.put('/libraries/:_id', function (req, res) {
    var nameId = parseInt(req.params.id, 10);
    //counter for the library id?
    var matchedNameId = _.findWhere();
});

router.delete('/libraries/:_id', function (req, res) {

    //   if () {}
    //   else {}

});

module.exports = router;
//# sourceMappingURL=router.js.map