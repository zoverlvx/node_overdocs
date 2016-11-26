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

//is this doing anything?
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
        console.log(method);
        console.log(description);
    }
})

//POST
router.post('/libraries', (req, res) => {
    console.log(req.body);
    console.log('Oi');
    let mylibraryToAdd = new Libraries({
            library_name: req.body.toString(),
            entries: [{
                method: 'an example',
                description: 'an example'
            }]
        })
        mylibraryToAdd.save((err, library) => {
            if (err) {
                console.error(err);                
            }            
                console.log({library});
            
        });
        
        // Libraries.create({
        //     library_name: req.body.library_name
        // }, (err, library) => {
        //     if (err) {
        //         return res.status(500).json({
        //             message: 'Internal Server Error'
        //         });
        //     }
        //     res.status(201).json(library);
        // });
});


//No idea what I'm doing
router.put('/libraries/:_id', (req, res) => {

});

//Trying to glean

// app.put('/todos/:id', (req, res) => {
//     let todoId = parseInt(req.params.id, 10);
//     let matchedTodo = _.findWhere(todos, {
//         id: todoId
//     });

//     let body = _.pick(req.body, 'description', 'completed'); // good for the method and description
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


router.put('/libraries/library_name', (req, res) => {
    //????
})


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

// Code I've been hoping to glean from

// router.delete('/items/:id', function(request, response){
//     console.log(request.params);
//     var id = request.params.id;

//         for (var i = 0; i < storage.items.length; i++){
//             if (id == storage.items[i].id){
//                 storage.items.splice(i, 1);
//                 break;
//             }
//         }

//         console.log(storage.items);
//         return response.json(storage.items);
// });


// router.delete('/libraries/library_name', (req, res) => {
//   Libraries.findByIdAndRemove(req.params._id, (err, method) => {
//       if (err) {
//           return res.status(404);
//       }
//       res.json({
//           message: 'Method deleted.'
//       });
//   }); 
// });


// app.delete('/todos/:id', (req, res) => {
//     let todoId = parseInt(req.params.id, 10);

//     let matchedTodo = _.findWhere(todos, {
//         id: todoId
//     });

//     if (!matchedTodo) {
//         res.status(404).json({
//             "Error": "No todo found with that id"
//         });
//     } else {
//         todos = _.without(todos, matchedTodo);
//         res.json(matchedTodo);
//     }
// });

module.exports = router;
