var db = require('./db.js');
var express = require('express');
var bodyParser = require('body-parser');

/*Creamos variables para la ejecución de la API teams*/
var teamsAPI = require('./teamsAPI/v1');
/*Creamos variables para la ejecución de la API players*/
var playersAPI = require('./playersAPI/v1');

var app = express();
app.use(bodyParser.json());

/*Ejecución de teamsAPI*/
teamsAPI.register(app, db.teamDB);

/*Ejecución de playersAPI*/
playersAPI.register(app,db.playerDB,db.teamDB);

/*Exportamos el servidor*/
module.exports = app;