const Personal = require('../models/Personal');
const express = require('express');
const router = express.Router({ mergeParams: true });


router.get('/', (req, res) => {
    Personal.find({}, (err, personal) => {
        let personalArr = [];
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(personal) {
            personal.forEach(p => {
                personalArr.push(p);
            });
        }
        res.send(personalArr);
    });
});

router.post('/new', (req, res) => {
    console.log('Llegue al endpoint!!');
    Personal.findOne({
        legajo: req.body.legajo
    }, (err, personalExistente) => {
        if(err) {
            return res.status(500).send({message: err.message + " primer error interno"});
        }
        if(personalExistente) {
            return res.status(409).send({message: 'Ya existe personal con ese legajo'});
        }

        const personal = new Personal({
            nombre:req.body.nombre,
            legajo: req.body.legajo,
            dni: req.body.dni,
            fecha_nacimiento: req.body.fecha_nacimiento,
            email: req.body.email,
            perfil: req.body.perfil,
            sucursal: req.body.sucursal,
            domicilio: req.body.domicilio,
            telefono: req.body.telefono
        });
        personal.save((err) => {
            if(err) {
                return res.status(500).send({message: err.message + " segundo error interno"});
            }
            res.send(personal);
        });
    });
});

router.put('/:id', (req, res) => {
    Personal.findById(req.params.id, (err, personal) => {
        if (err) {
            return res.status(500).send({message: err.message});
        }
        if(!personal) {
            return res.status(400).send({message: "Personal no encontrado"});
        }
        personal.nombre = req.body.nombre;
        personal.legajo = req.body.legajo;
        personal.dni = req.body.dni;
        personal.fecha_nacimiento = req.body.fecha_nacimiento;
        personal.email = req.body.email;
        personal.perfil = req.body.perfil;
        personal.sucursal = req.body.sucursal;
        personal.domicilio = req.body.domicilio;
        personal.telefono = req.body.telefono;

        personal.save(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.send(personal);
        });
    });
});

router.delete('/:id', (req, res) => {
    Personal.findById(req.params.id, (err, personal) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!personal) {
            return res.status(500).send({message: "Personal no encontrado"});
        }
        personal.remove(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.status(200).send({message: "Personal eliminado exitosamente"});
        });
    });
});

module.exports = router;