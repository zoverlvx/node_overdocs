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

//GET singular library
router.get('/libraries/:library_name', (req, res) => {
    let query = Libraries.where({
        library_name: req.params.library_name
    });

    query.findOne((err, library) => {
        if (err) {
            return res.status(404).json({
                status: 'error'
            });
        }
        else {
            res.json(library)
        }
    });
});

//GET singular method
router.get('/libraries/:library_name/:method', (req, res) => {
    let query = Libraries.where({
        method: req.params.method
    });
    query.findOne((err, method) => {
        if (err) {
            return res.status(404).json({
                status: 'error'
            });
        }
        else {
            res.json(method)
        }
    });
});

//GET method
// router.get('/libraries/:library_name/', (req, res) => { // deleted :method
//     console.log('Got methods');
//     Libraries.findOne({
//         method: req.params.method
//     }), (err, description) => {

//         if (typeof method === 'undefined') {
//             return res.status(404).json({
//                 status: 'error'
//             });
//         }
//         else if (err) {
//             return res.status(500).json({
//                 message: 'Method not found.'
//             });
//         }
//         res.json(description);
//         console.log(description);
//     }
// });

//POST libraries
router.post('/libraries', (req, res) => {
    Libraries.create({
        library_name: req.body.library_name
    }, (err, library) => {

        if (typeof library_name === 'undefined') {
            return res.status(412).json({
                status: 'Precondition wasn\'t met'
            });
        }
        else if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(library);
        console.log(library);
    });
});

//PUT method and description to library
router.put('/libraries/:library_name', (req, res) => {
    Libraries.findOneAndUpdate({
        library_name: req.params.library_name,
    }, {
        $push: {
            entries: {
                method: req.body.method,
                description: req.body.description
            }
        }
    }, (err, library) => {

        if (typeof method === 'undefined' || typeof description === 'undefined') {
            res.status(404).json({
                status: 'error'
            });
        }
        else if (err) {
            console.log(err)
        }
        console.log(library);
    });
});

//DELETE library and methods 
router.delete('/libraries/:library_name', (req, res) => {
    Libraries.findOneAndRemove({
        library_name: req.params.library_name
    }, (err, library) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        console.log(library);
        res.status(200).send();
    });
});

//DELETE methods and descriptions
router.delete('libraries/:library_name/:method', (req, res) => {
    console.log('Delete method');
    Libraries.findOneAndRemove({
        entries: {
            method: req.params.method,
            description: req.params.description
        }
    }, (err, method) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        }
        console.log(method);
        res.status(200).send();
    });
});

//DELETE methods and descriptions
// router.delete('libraries/:library_name/:method', (req, res) => {
//     Libraries.find({
//         entries: {
//             method: req.params.method,
//             description: req.params.description
//         }

//     }).remove(), (err, deletedMethod) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send();
//         }
//         console.log(deletedMethod);
//         res.status(200).send();
//     }
// });

// router.delete('libraries/:library_name', (req, res) => {
//     Libraries.remove({ 
//         entries: [{
//             method: req.body.method,
//             description: req.body.description
//         }]
//     }, (err, deletedMethod) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send();
//         }
//         console.log(deletedMethod);
//         res.status(200).send();
//     });
// });

// router.delete('libraries/:library_name/:method', (req, res) => {
//     Libraries.find().remove({ 
//         entries: [{
//             method: req.body.method,
//             description: req.body.description
//         }]
//     }, (err, deletedMethod) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send();
//         }
//         console.log(deletedMethod);
//         res.status(200).send();
//     });
// });

//DELETE method and description // First attempt
// router.delete('/libraries/:library_name/:method', (req, res) => {
//     let method = req.body.method;
//     let description = req.body.description;
//     Libraries.find().remove({ //tried using just .remove() as well
//         entries: {
//             method: method,
//             description: description
//         },

//     }, (err) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send();
//         }

//         res.status(200).send();
//     });
// });

// second attempt
// router.delete('/libraries/:library_name/:method', (req, res) => {
//     Libraries.findOne({
//         entries: {
//             method: req.body.method,
//             description: req.body.description
//         }
//     }, (err, deletedMethod) => {
//         if (err) {
//             console.log(err);
//         }
//         Libraries.remove((err) => {
//             console.log(err);
//         });
//     });
// });

module.exports = router;
