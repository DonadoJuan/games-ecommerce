const mongoose = require('mongoose');

const videojuegoSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    titulo_lower: {
        type: String,
        required: true
    },
    codigo: {
        type: String,
        required: true
    },
    genero: {
        type: Array,
        required: true
    },
    plataforma: {
        type: String,
        required: true
    },
    cantidadMinima: {
        type: Number,
        required: true
    },
    cantidadMaxima: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    urlVideo: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descuento: {
        type: Number
    },
    destacado: {
        type: Boolean,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    stock: {
        type: Number
    },
    file: {
        type: Object
    },
    activo: {
        type: Boolean,
        required: true
    }
}, {collection: 'videojuegos'});

module.exports = mongoose.model('Videojuego', videojuegoSchema);