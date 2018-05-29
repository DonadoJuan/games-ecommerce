const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const PedidoSchema = require('./Pedido');
const DomicilioSchema = require('./Domicilio');
const tarjetaSchema = require('./Tarjeta');

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    faltas: {
        type: Array
    },
    baneos: {
        type: Array
    },
    activo: {
        type: Boolean,
        required: true
    },
    domicilio_entrega: {
        type: [DomicilioSchema]
    },
    tarjetas: {
        type: [tarjetaSchema]
    },
    pedidos: {
        type: [PedidoSchema]
    }


}, {collection: 'clientes'});

clienteSchema.methods.setPassword = function(password){
    this.password = crypto.createHash('sha256').update(password).digest('base64');
};

clienteSchema.methods.validPassword = function(password) {
    var hash =  crypto.createHash('sha256').update(password).digest('base64');
    return this.password === hash;
};

clienteSchema.methods.generateJwt = function() {
    let cliente = this; 
    return jwt.sign({
        payload: cliente,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, "secret");
};

module.exports = mongoose.model('Cliente', clienteSchema);