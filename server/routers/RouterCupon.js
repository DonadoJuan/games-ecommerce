const Cupon = require('../models/Cupon');
const Cliente = require('../models/Cliente');
const express = require('express');
const router = express.Router({ mergeParams: true });


router.get('/', (req, res) => {
    Cupon.find({}, (err, cupon) => {
        let cuponArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(cupon) {
            cupon.forEach(p => {
                cuponArr.push(p);
            });
        }
        res.send(cuponArr);
    });
});

router.post('/new', (req, res) => {
    console.log('Llegue al endpoint!!');
    Cupon.findOne({
        codigo: req.body.codigo
        }, (err, cuponExistente) => {
        if(err) {
            return res.status(500).send({message: err.message + " primer error interno"});
        }
        if(cuponExistente) {
            return res.status(409).send({message: 'Ya existe un cupon con ese Codigo'});
        }

        const cupon = new Cupon({
            codigo:req.body.codigo,
            descuento:req.body.descuento,
            validoDesde: req.body.validoDesde,
            validoHasta: req.body.validoHasta
            
        });
        cupon.save((err) => {
            if(err) {
                return res.status(500).send({message: err.message + " segundo error interno"});
            }
            res.send(cupon);
        });
    });
});

router.post('/validar', (req, res) => {

    let codigo = req.body.codigo;
    let idCliente = req.body.idCliente;
    let nowDate = new Date().setHours(0,0,0,0);

    Cupon.findOne({codigo: codigo}, (err, cuponExistente) =>{

        if(err)
            return res.status(500).send({message: err.message});
        
        if(!cuponExistente)
            return res.status(200).send({code: '01',message: 'Cupon invalido'});

        Cliente.findById(idCliente, (err, cliente) =>{
            if(err)
                return res.status(500).send({code: err.message});
            
            if(!cliente)
                return res.status(500).send({message:"Cliente invalido"});
            
            for (const pedido of cliente.pedidos) {
                if(pedido.cupon != undefined && pedido.cupon.codigo == cuponExistente.codigo)
                    return res.status(200).send({ code: '02', message: 'Cupon ya reclamado'});            
            }

            cuponExistente.validoDesde.setHours(0,0,0,0);
            cuponExistente.validoHasta.setHours(0,0,0,0);

            if(nowDate >= cuponExistente.validoDesde && nowDate <= cuponExistente.validoHasta)
                return res.status(200).send({ code: '00', cupon: cuponExistente});
            else
                return res.status(200).send({ code: '03', message: 'Cupon expirado'});
        });
    });

});

router.delete('/:id', (req, res) => {
    Cupon.findById(req.params.id, (err, cupon) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!cupon) {
            return res.status(500).send({message: "Error en cupon"});
        }
        cupon.remove(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.status(200).send({message: "Cupon eliminado exitosamente"});
        });
    });
});

module.exports = router;