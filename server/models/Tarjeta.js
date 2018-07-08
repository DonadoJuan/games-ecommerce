const mongoose = require('mongoose');
const DomicilioSchema = require('./Domicilio')

const tarjetaSchema = mongoose.Schema({
    tipoTarjeta: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true,
    },
    domicilio_facturacion: {
        type: DomicilioSchema,
        required: false
    } 

});

module.exports = tarjetaSchema;