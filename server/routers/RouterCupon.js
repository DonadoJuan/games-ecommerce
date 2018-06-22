const Cupon = require('../models/Cupon');
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