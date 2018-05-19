const Cliente = require('../models/Cliente');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    Cliente.find({}, (err, clientes) => {
        let clientesArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(clientes) {
            clientes.forEach(c => {
                clientesArr.push(c);
            });
        }
        res.send(clientesArr);
    });
});

router.put('/baneo/:id', (req, res) => {
    Cliente.findById(req.params.id, (err, cliente) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!cliente) {
            return res.status(400).send({message: 'Cliente no encontrado'});
        }
        cliente.baneos = req.body;
        cliente.save(err => {
            if(err){
                return res.status(500).send({message: err.message});
            }
            res.send(cliente);
        });
    });
});

module.exports = router;