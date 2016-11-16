'use strict';

const express = require("express");
const app = express();
const router = express.Router();
const Libraries = require('../models/library');
const _ = require('underscore');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
let nextId_lib = 1;
let nextId_code = 1;

app.use(bodyParser.json());

router.get('/libraries', (req, res) => {
    Libraries.find((err, library_name) => {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(library_name);
    });
});

//fix words
router.get('/libraries/:_id', (req, res) => { // 
    Libraries.findOne({_id: req.params._id}), (err, library_name) => {
        if (err) {
            return res.status(500).json({
                message: 'Library not found'
            });
        }
        res.json(library_name);
    }
});



//POST

router.post('/libraries', (req, res) => {
    let body = req.body;
  
  // id field?
  
    console.log('description: ' + body.description);
  
  // push?
    
    res.json(body);
});



router.put('/libraries/:_id', (req, res) => {
    let nameId = parseInt(req.params.id, 10);
    //counter for the library id?
    let matchedNameId = _.findWhere()
    
});

router.delete('/libraries/:_id', (req, res) => {
   
//   if () {}
//   else {}
    
});

module.exports = router;
