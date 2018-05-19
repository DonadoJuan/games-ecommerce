var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var cors = require('cors');
var api = require('./api');
var app = express();

//Se conecta a base de datos
mongoose.connect('mongodb://localhost:27017/padogi');

mongoose.connection.on('error', (err) => {
    console.log(err);
});

//Se levanta API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

const port = process.env.PORT || 3000;
app.set('port', port);

if (process.env.NODE_ENV !== 'dev') {
    app.use('/', express.static(path.join(__dirname, './dist')));
}

api(app);

if (process.env.NODE_ENV !== 'dev') {
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
}


mongoose.connection.on('connected', () => {
    console.log('Conectado a mongodb');

    app.listen(port, () => {
        console.log(`API corriendo en puerto ${port}`);
    });
});




