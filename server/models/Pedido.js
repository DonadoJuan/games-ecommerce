const mongoose = require('mongoose');
const DomicilioSchema = require('./Domicilio');
const tarjetaSchema = require('./Tarjeta');
const cuponModel = require('./Cupon');

const JuegoPedidoSchema = mongoose.Schema({
    cantidad: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: false
    },
    videojuego: {
        type: Object,
        required: true
    }
});

const PedidoSchema = mongoose.Schema({
    fecha: {
        type: Date,
        required: true
    },
    sucursal_entrega: {
        type: Object,
        required: true
    },
    domicilio_entrega:{
        type: DomicilioSchema
    },
    videojuegos: {
        type: [JuegoPedidoSchema],
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    medio_pago:{

        medio: {
            type: String,
            required: true
        },
        tarjeta: {
            type: tarjetaSchema
        }
    },
    total:{
        type: Number,
        required: true
    },
    costoEnvio:{
        type: Number,
        required: true
    },
    cupon:{
        type: cuponModel.schema
    }
});

module.exports = PedidoSchema;