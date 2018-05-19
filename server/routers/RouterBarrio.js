const Barrio = require('../models/Barrio');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    Barrio.find({}, (err, barrios) => {
        let barriosArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(barrios) {
            barrios.forEach(barrio => {
                barriosArr.push(barrio);
            });
        }
        res.json(barriosArr);
    });
});

module.exports = router;