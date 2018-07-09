const Cliente = require('../models/Cliente');
const Sucursal = require('../models/Sucursal');
const _ = require('lodash');
const async = require('async');
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
        cliente.telefono = req.body.telefono;
        
        if(req.body.pedidos)
            cliente.pedidos = req.body.pedidos; 

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

    let id_cliente = req.body.id_cliente;
    let nuevoPedido = req.body.nuevoPedido;
    let stock_global = [];
    let sucursales = [];
    let cliente = {};

    async.parallel({
        stock_global: (cb) =>{ 
            Sucursal.aggregate([
                {"$unwind":"$videojuegos"},
                {"$group":{"_id":{codigo: "$videojuegos.codigo"},"stock":{$sum: "$videojuegos.stock" }}},
                {"$project":{_id:0, codigo:"$_id.codigo", stock:1}}
            ],cb)
        },
        sucursales: (cb) =>{ Sucursal.find({}, cb)},
        cliente: (cb)=>{Cliente.findById(id_cliente,cb)}
    }, (err, data) =>{
        if(err)
            return res.status(500).send({message: err.message});

        stock_global = data.stock_global,
        sucursales = data.sucursales,
        cliente = data.cliente  
        procesarPedido();
    });

    function procesarPedido () {
        
        let stockValido = true;

        for (const vj of nuevoPedido.videojuegos) {
            if(vj.idSucursal){
                if(!descontarStockSucursal(vj, vj.videojuego.idSucursal)){
                    stockValido = false;
                    return res.status(200).send({code: '01',message: "stock insuficiente"});
                }
            }else{
                if(!descontarStockGlobal(vj)){
                    stockValido = false;
                    return res.status(200).send({code: '01',message: "stock insuficiente"});
                }
            }
        }

        if(!stockValido)
            return;

        if(nuevoPedido.medio_pago.medio == 'efectivo')
            nuevoPedido.estado = "Reservado";
        else
            nuevoPedido.estado = "Pendiente";
        
        if(nuevoPedido.medio_pago.tarjeta && !nuevoPedido.medio_pago.tarjeta._id )
            cliente.tarjetas.push(nuevoPedido.medio_pago.tarjeta);

        if(nuevoPedido.domicilio_entrega && !nuevoPedido.domicilio_entrega._id )
            cliente.domicilio_entrega.push(nuevoPedido.domicilio_entrega);

        nuevoPedido.fecha = new Date();

        cliente.pedidos.push(nuevoPedido);
        sucursales.forEach(suc => {
            suc.markModified('videojuegos');
        });
        async.parallel([
            (cb) =>{ cliente.save(cb) },
            (cb) =>{ sucursales[0].save(cb) },
            (cb) =>{ sucursales[1].save(cb) },
            (cb) =>{ sucursales[2].save(cb) },
        ], (err, data) =>{
            if(err)
                return res.status(500).send({message: err.message});

            res.status(200).send({code: '00',message: "Alta de pedido exitosa", token: cliente.generateJwt()});
        });
    }

    function descontarStockSucursal(vj, idSuc) {
        let sucOferta = _.find(sucursales,{'_id': idSuc});
        let vjSuc = _.find(sucOferta.videojuegos,{'codigo': vj.codigo});

        if(vjSuc.stock < vj.cantidad)
            return false;
        
        vjSuc.stock = vjSuc.stock - vj.cantidad;
        return true;
    }

    function descontarStockGlobal(vj){
        let vjStock = _.find(stock_global,{'codigo': vj.videojuego.codigo});
        let stockParaRestar = vj.cantidad;
        
        if(vjStock.stock < stockParaRestar)
            return false;
        
        for (const suc of sucursales) {
            let vjSuc = _.find(suc.videojuegos,{'codigo': vj.videojuego.codigo});
            if(stockParaRestar - vjSuc.stock > 0){
                vjSuc.stock = 0;
                stockParaRestar -= vjSuc.stock;
            }else{
                vjSuc.stock -= stockParaRestar;
                break;
            }
        }

        return true;
    }

});
router.delete('/:id', (req, res) => {
    Cliente.findById(req.params.id, (err, cliente) => {
        if(err) {
            return res.status(500).send({message: err.message});
        }
        if(!cliente) {
            return res.status(500).send({message: "Cliente no encontrado"});
        }
        cliente.remove(err => {
            if(err) {
                return res.status(500).send({message: err.message});
            }
            res.status(200).send({message: "Cliente eliminado exitosamente"});
        });
    });
});

module.exports = router;