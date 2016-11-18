'use strict';

const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Libraries = require('../models/library');
const _ = require('underscore');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
let nextId_lib = 1;
let nextId_code = 1;

app.use(bodyParser.json());

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


router.get('/libraries/:_id', (req, res) => { // 
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

});

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

// router.use('*', function(req, res) {
//     res.status(404).json({
//         message: 'Not Found'
//     });
// });

// const runServer = function(callback) {
//     mongoose.connect(config.DATABASE_URL, function(err) {
//         if (err && callback) {
//             return callback(err);
//         }

//         app.listen(config.PORT, function() {
//             console.log('Listening on localhost:' + config.PORT);
//             if (callback) {
//                 callback();
//             }
//         });
//     });
// };



module.exports = router;
