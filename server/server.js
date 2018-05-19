const mongoose = require('mongoose');
const api = require('./api');

mongoose.connect('mongodb://localhost:27017/padogi');

mongoose.connection.on('error', (err) => {
    console.log(err);
});

mongoose.connection.on('connected', () => {
    console.log('Conectado a MongoDB');

    api.listen(3000, () => {
        console.log('API corriendo en puerto 3000');
    });
});




