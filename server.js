var express = require('express');
var bodyParser = require('body-parser');
/*Creamos variables para la ejecución de la API teams*/
var teamsAPI = require('./teamsAPI/v1/index.js');
/*Creamos variables para la ejecución de la API players*/
var playersAPI = require('./playersAPI/v1/index.js');

var app = express();
app.use(bodyParser.json());

/*Ejecución de teamsAPI*/
teamsAPI.register(app);

/*Ejecución de playersAPI*/
playersAPI.register(app);

/*Exportamos el servidor*/
module.exports = app;