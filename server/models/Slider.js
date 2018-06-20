const mongoose = require('mongoose');

const sliderSchema = mongoose.Schema({
    
    titulo: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        required: true
    },
}, {collection: 'slider'});

module.exports = mongoose.model('Slider', sliderSchema);