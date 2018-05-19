//var express = require('express');
//var router = express.Router();

const Barrio = require('./models/Barrio');
const Domicilio = require('./models/Domicilio');
const Personal = require('./models/Personal');
const Sucursal = require('./models/Sucursal');
const Videojuego = require('./models/Videojuego');
const Cliente = require('./models/Cliente');

module.exports = function(app) {
    app.get('/api/', (req, res) => {
        res.send('api works!');
    });

    app.get('/api/sucursales/ubicacion', (req, res) => {
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
            res.send(sucursalesArr);
        });
    });

    app.get('/api/sucursales/:id', (req, res) => {
        Sucursal.find({_id: req.params.id}, (err, sucursal) => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            if(!sucursal) {
                return res.status(400).send({message: 'No pudo identificarse a que sucursal pertenece.'});
            }
            res.send(sucursal);
        });
    });

    app.put('/api/stock/:id', (req, res) => {
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
                res.send(sucursal);
            });
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

    app.get('/api/personal', (req, res) => {
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

    app.put('/api/personal/:id', (req, res) => {
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

    app.delete('/api/personal/:id', (req, res) => {
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

    app.get('/api/clientes', (req, res) => {
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

    app.put('/api/clientes/baneo/:id', (req, res) => {
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
}

//module.exports = router;