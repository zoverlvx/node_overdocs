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
    //console.log(req.headers['user-agent']);
    //console.log(req.headers);
    console.log(req.body);
    
    Libraries.find((err, library_name) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name);
    });
});

//GET library
router.get('/libraries/:library_name/', (req, res) => {
    Libraries.findOne({
        library_name: req.params.library_name
    }), (err, method) => {
        if (err) {
            return res.status(500).json({
                message: 'Library not found.'
            });
        }
        res.json(method);
    }
});

//GET method
router.get('/libraries/:library_name/:method/', (req, res) => {
    Libraries.findOne({
        method: req.params.entries[0].method
    }), (err, description) => {
        if (err) {
            return res.status(500).json({
                message: 'Method not found.'
            });
        }
        res.json(description);
    }
});

//POST libraries
router.post('/libraries', (req, res) => {
    Libraries.create({
        library_name: req.params.library_name
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

router.put('/libraries/:library_name', (req, res) => {
    let library_name = req.params.library_name;
    Libraries.findOne({library_name: library_name}, (err, updatedLibrary) => {
        if (err) {  
            res.status(500).send(err);
        } else if (req.params.library_name) {
            updatedLibrary.library_name = req.params.library_name;
            res.status(200).send(updatedLibrary);
        }
    });
});

router.put('/libraries/:library_name/:method', (req, res) => {
    let method = req.body.entries[0].method;
    Libraries.findOne({method: method}, (err, updatedMethod) => {
        if (err) {
            res.status(500).send(err);
        } else if (req.body.entries[0].method) {
            updatedMethod.method = req.body.entries[0].method;
            res.status(200).send(updatedMethod);
            
        }        
    });
});

router.put('/libraries/:library_name/:method/:description', (req, res) => {
 let description = req.body.entries[0].description // still, no idea why this is doing this   
    Libraries.findOne({description: description}, (err, updatedDescription) => {
        if (err) {
            res.status(500).send(err);
        } else if (req.body.entries[0].description) {
            updatedDescription.description = req.body.entries[0].description;
            res.status(200).send(updatedDescription);
        }
    });
});


//DELETE library and methods
router.delete('/libraries/:library_name', (req, res) => {
   let library_name = req.params.library_name;
   Libraries.findOneAndRemove({library_name: library_name}, (err) => {
       if (err) {
           console.log(err);
           res.status(500).send();
       }
       
        res.status(200).send();
   });
});
    

//DELETE method and description
router.delete('/libraries/:library_name/:method', (req, res) => {
   let method = req.body.entries[0].method;
   Libraries.findOneAndRemove({method: method}, (err) => {
       if (err) {
           console.log(err);
           res.status(500).send();
       }
       
        res.status(200).send();
   });
});

module.exports = router;
