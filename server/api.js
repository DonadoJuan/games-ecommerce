//var express = require('express');
//var router = express.Router();

const Barrio = require('./models/Barrio');
const Domicilio = require('./models/Domicilio');
const Personal = require('./models/Personal');
const Sucursal = require('./models/Sucursal');
const Videojuego = require('./models/Videojuego');

module.exports = function(app) {
    app.get('/api/', (req, res) => {
        res.send('api works!');
    });

    app.get('/api/sucursales/ubicacion', (req, res) => {
        console.log('endpoint sucursales');
        Sucursal.find({}, {_id: 1, ubicacion: 1}, (err, sucursales) => {
            let sucursalesArr = [];
            if (err) {
                console.log('primer error. Error interno');
                return res.status(500).send({message: err.message});
            }
            if(sucursales) {
                console.log('Aca ni entro, no?');
                sucursales.forEach(sucursal => {
                    console.log('sucursal: ', sucursal);
                    sucursalesArr.push(sucursal);
                });
            }
            console.log('sucursales: ' + sucursales);
            res.send(sucursalesArr);
        });
    });

    app.get('/api/barrios', (req, res) => {
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
            res.send(barriosArr);
        });
    });

    app.post('/api/personal/new', (req, res) => {
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
}

//module.exports = router;