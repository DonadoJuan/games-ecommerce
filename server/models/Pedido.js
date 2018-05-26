const mongoose = require('mongoose');
const DomicilioSchema = require('./Domicilio')

const PedidoSchema = mongoose.Schema({
    fecha: {
        type: String,
        required: true
    },
    sucursal_entrega:{
        type: Object,
    },
    domicilio_entrega:{
        type: DomicilioSchema
    },
    videojuegos: {
        type: Array,
        required: true
    },
    estado:{
        type: String,
        required: true
    }
});

module.exports = PedidoSchema;