const Cliente = require('../models/Cliente');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.post('/login', (req, res) => {

    let input = req.body;

    Cliente.findOne({email: input.email}, (err, cliente) => {

        if(err)
            return res.status(500).json({message: err.message});
 
        if(!cliente)
            return res.status(401).json({message: 'Cliente no encontrado'});

        if(!cliente.validPassword(input.password))
            return res.status(401).json({message: 'Clave incorrecta'});
        
        res.status(200)
        res.json({
            "token" : cliente.generateJwt()
        });
        
    });
});

router.post('/registrar', (req, res) => {

    let input = req.body;
    let cliente = new Cliente();

    cliente.email = input.email;
    cliente.nombre = input.nombre;
    cliente.telefono = input.telefono;
    cliente.dni = input.dni;
    cliente.domicilio_entrega = input.domicilio_entrega;
    cliente.baneos = [];
    cliente.faltas = [];
    cliente.activo = true;
  
    cliente.setPassword(input.password);
  
    cliente.save(function(err) {

        if(err && err.code == 11000)
            return res.status(200).json({code: err.code});
        if(err)
            return res.status(500).json({code: err.code});
        
        res.status(200);
        res.json({
            "token" : cliente.generateJwt()
        });
    });
});

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


router.put('/:id', (req, res) => {
    Cliente.findById(req.params.id, (err, cliente) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        if(!cliente) {
            return res.status(400).send({message: "Cliente no encontrado"});
        }
        cliente.nombre = req.body.nombre;
        cliente.dni = req.body.dni;
        cliente.email = req.body.email;
        cliente.domicilio_entrega = req.body.domicilio_entrega;
        cliente.telefono = req.body.telefono;
        cliente.activo = req.body.activo;
        cliente.faltas = req.body.faltas;
        cliente.password = req.body.password;
        cliente.baneos = req.body.baneos;

        cliente.save(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.send(cliente);
        });
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

router.post('/pedido', (req, res) => {

    let input = req.body;
    let cliente_id = input.cliente_id;
    let nuevoPedido = input.nuevoPedido;

    Cliente.update({ _id: cliente_id }, { $push: { pedidos: nuevoPedido }},{ runValidators: true }, err =>{
        if(err)
            res.status(500).json({message: err.message});
        else
            res.status(200).json();
    });

});

module.exports = router;