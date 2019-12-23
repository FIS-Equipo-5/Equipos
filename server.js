var express = require('express');
var bodyParser = require('body-parser');

const Player = require('./playersAPI/model/players');
/*Creamos variables para la ejecución de la API teams*/
var teamsAPI = require('./teamsAPI/v1/teams');

var app = express();
app.use(bodyParser.json());

/*Ejecución de teamsAPI*/
teamsAPI.register(app);

/*Ejecución de playersAPI*/
playersAPI.register(app, Player);

/*Exportamos el servidor*/
module.exports = app;