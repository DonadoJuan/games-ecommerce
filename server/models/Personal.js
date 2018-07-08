const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
    },
    password: {
        type: String,
        required: true
    }
}, {collection: 'personal'});

personalSchema.methods.setPassword = function(password){
    this.password = crypto.createHash('sha256').update(password).digest('base64');
};

personalSchema.methods.validPassword = function(password) {
    var hash =  crypto.createHash('sha256').update(password).digest('base64');
    return this.password === hash;
};

personalSchema.methods.generateJwt = function() {
    let personal = this; 
    return jwt.sign({
        payload: personal,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }, "secret");
};

module.exports = mongoose.model('Personal', personalSchema);