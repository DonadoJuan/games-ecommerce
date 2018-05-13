const mongoose = require('mongoose');

const domicilioSchema = mongoose.Schema({
    calle: {
        type: String,
        required: true
    },
    altura: {
        type: Number,
        required: true
    },
    barrio: {
        type: Object,
        required: true
    },
    codigo_postal: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Domicilio', domicilioSchema);