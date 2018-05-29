const mongoose = require('mongoose');
const DomicilioSchema = require('./Domicilio');
const tarjetaSchema = require('./Tarjeta');
const cuponModel = require('./Cupon');

const PedidoSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true
    },
    sucursal_entrega: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sucursal'
    },
    domicilio_entrega:{
        type: DomicilioSchema
    },
    videojuegos: {
        cantidad: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        },
        videojuego: {
            type: Object,
            required: true
        }
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
            type: tarjetaSchema,
            required: true
        }
    },
    total:{
        type: Number,
        required: true
    },
    totalEnvio:{
        type: Number,
        required: true
    },
    cupon:{
        type: cuponModel.schema,
        required: true
    }
});

module.exports = PedidoSchema;