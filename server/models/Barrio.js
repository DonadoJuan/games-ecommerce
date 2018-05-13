const mongoose = require('mongoose');

const barrioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
}, {collection: 'barrios'});

module.exports = mongoose.model('Barrio', barrioSchema);