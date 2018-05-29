const mongoose = require('mongoose');

const cuponSchema = mongoose.Schema({
    codigo:{
        type: String,
        required: true
    },
    descuento:{
        type: Number,
        required: true
    },
    validoDesde:{
        type: Date,
        required: true
    },
    validoHasta:{
        type: Date,
        required: true
    }
}, {collection: 'Cupones'});

module.exports = mongoose.model('Cupon', cuponSchema);