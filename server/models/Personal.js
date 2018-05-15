const mongoose = require('mongoose');

const personalSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    legajo: {
        type: Number,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        required: true
    },
    sucursal: {
        type: Object,
        required: true
    },
    domicilio: {
        type: Object,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    }
}, {collection: 'personal'});

module.exports = mongoose.model('Personal', personalSchema);