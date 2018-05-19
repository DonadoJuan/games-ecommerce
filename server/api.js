const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const RouterSucursal = require('./routers/RouterSucursal');
const RouterBarrio = require('./routers/RouterBarrio');
const RouterPersonal = require('./routers/RouterPersonal');
const RouterCliente = require('./routers/RouterCliente');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

app.use('/api/sucursales', RouterSucursal);
app.use('/api/barrios', RouterBarrio);
app.use('/api/personal', RouterPersonal);
app.use('/api/clientes', RouterCliente);

module.exports = app;


