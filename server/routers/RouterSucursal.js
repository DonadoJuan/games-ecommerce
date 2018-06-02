const Sucursal = require('../models/Sucursal');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/ubicacion', (req, res) => {
    Sucursal.find({}, {_id: 1, ubicacion: 1}, (err, sucursales) => {
        let sucursalesArr = [];
        if (err) {
            return res.status(500).send({message: err.message});
        }
        if(sucursales) {
            sucursales.forEach(sucursal => {
                sucursalesArr.push(sucursal);
            });
        }
        res.json(sucursalesArr);
    });
});

router.get('/', (req, res) => {
    Sucursal.find({}, (err, sucursales) => {
        let sucursalesArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!sucursales) {
            return res.status(400).send({message: 'No pudo identificarse a que sucursal pertenece.'});
        }
        if(sucursales) {
            sucursales.forEach(s => {
                sucursalesArr.push(s);
            });
        }
        res.json(sucursalesArr);
    });
});

router.get('/:id', (req, res) => {
    Sucursal.findById({_id: req.params.id}, (err, sucursal) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!sucursal) {
            return res.status(400).send({message: 'No pudo identificarse a que sucursal pertenece.'});
        }
        res.json(sucursal);
    });
});

router.put('/videojuegos/:id', (req, res) => {
    Sucursal.findById(req.params.id, (err, sucursal) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!sucursal) {
            return res.status(400).send({message: 'No pudo identificarse a que sucursal pertenece.'});
        }
        sucursal.videojuegos = req.body;
        sucursal.save((err) => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.json(sucursal);
        });
    });
});

module.exports = router;