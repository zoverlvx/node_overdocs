//mongoDB later


//set up server w/ express - I think that's done
//set up urls with express - I think that's done
//use bodyparser for json (read docs) - I believe this is done
//use objects for words, defs, etc --- not sure how to go about this now. 

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
//const M = require('mongoose');
const Word = require('../entries/words');

console.log('Starting program.');

app.use(bodyParser.json());
app.use(express.static('../public'));

router.get('../entries/:_id', (req, res) => {
    Word.findOne({_id: req.params._id}), (err, words) => {
        if (err) {
            return res.status(500).json({
                message: 'Definition not found'
            });
        }
        res.json(words);
    }
});

router.get('/entries', (req, res) => {
    Word.find((err, words) => {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(words);
    });
});

// I don't think I need a post because the user isn't submitting anything
// I need a way to clear the page/refresh for the next word

app.listen(PORT, () => {
   console.log(`Express listening on port ${PORT}`); 
});
