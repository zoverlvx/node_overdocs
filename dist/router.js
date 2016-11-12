'use strict';

var express = require("express");
var router = express.Router();
var Word = require('../entries/words');
console.log(router);

//on search
router.get('/entries/:_id', function (req, res) {
    Word.findOne({ _id: req.params._id }), function (err, words) {
        if (err) {
            return res.status(500).json({
                message: 'Definition not found'
            });
        }
        res.json(words);
    };
});

router.get('/entries', function (req, res) {
    Word.find(function (err, words) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(words);
    });
});

module.exports = router;
//# sourceMappingURL=router.js.map