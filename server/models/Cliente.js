const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    telefono: {
        type: Number,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    domicilio_entrega: {
        type: Array,
        required: true
    },
    faltas: {
        type: Array
    },
    baneos: {
        type: Array,
        required: true
    },
    activo: {
        type: Boolean,
        required: true
    }
}, {collection: 'clientes'});

module.exports = mongoose.model('Cliente', clienteSchema);