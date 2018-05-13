var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');
var cors = require('cors');
var api = require('./server/api');

var app = express();

mongoose.connect('mongodb://localhost:27017/padogi');

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected at port 27107');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

const port = process.env.PORT || 3000;
app.set('port', port);

if (process.env.NODE_ENV !== 'dev') {
    app.use('/', express.static(path.join(__dirname, './dist')));
}

//app.use('/', api);
require('./server/api')(app);

if (process.env.NODE_ENV !== 'dev') {
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '/dist/index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



