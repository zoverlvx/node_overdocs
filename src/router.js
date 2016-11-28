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

//GET single library // I think I need to update this with methods and descriptions
router.get(`/libraries/${Libraries.library_name}`, (req, res) => {
    Libraries.findOne({
        library_name: Libraries.library_name
    }), (err, library) => {
        if (err) {
            return res.status(500).json({
                message: 'Library not found'
            });
        }
        res.json(library);
    }
});


//GET method and description from library // I think this almost works
router.get(`/libraries/${Libraries.library_name}`, (req, res) => {
    Libraries.findOne({
        method: Libraries.library_name.entries[0].method,
        description: Libraries.library_name.entries[0].description
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


//PUT 
router.put(`/libraries/${Libraries.library_name}`, (req, res) => {
    Libraries.findOneAndUpdate({
        library_name: Libraries.library_name
    }, Libraries.entries[{
        method: req.body.toString(),
        description: req.body.toString()
    }]);
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
