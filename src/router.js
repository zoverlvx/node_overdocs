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

//GET single library // I don't think this is doing anything on the DOM yet
router.get('/libraries/:_id', (req, res) => {
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

//on request of route of libraries/library_name
//spits out an array of entries[i].method and entries[i].description

//GET method
router.get('/libraries/library_name', (req, res) => {
    Libraries.findOne({
        method: req.params.method,
        description: req.params.description //this isn't declared???
    }), (err, method) => {
        if (err) {
            return res.status(500).json({
                message: 'Method not found'
            });
        }
        res.json(method);
    }
});


//POST libraries
router.post('/libraries', (req, res) => {
    //console.log(req.body);
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

// router.put('/libraries/library_name', (req, res) => {
//     Libraries.findOneAndUpdate({ _id: req.params.id }, Libraries.entries[{
//         method: res,
//         description: res
//     }]);
// });

router.put('/libraries/:_id', (req, res) => {
    Libraries.findByIdAndUpdate({_id: req.params._id})    
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

module.exports = router;
