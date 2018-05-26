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
        type: String,
        required: true
    },
    codigo_postal: {
        type: Number,
        required: true
    }
});

module.exports = domicilioSchema;