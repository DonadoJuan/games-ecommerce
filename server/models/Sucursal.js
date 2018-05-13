const mongoose = require('mongoose');

const sucursalSchema = mongoose.Schema({
    ubicacion: {
        type: Object,
        required: true
    },
    videojuegos: {
        type: Array,
        required: true
    }
}, {collection: 'sucursales'});

module.exports = mongoose.model('Sucursal', sucursalSchema);