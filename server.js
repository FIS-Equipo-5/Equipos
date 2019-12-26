var express = require('express');
var bodyParser = require('body-parser');

/*APIKEY*/
const passport = require('passport');
require('./authentication/apikey/passport');

const Player = require('./playersAPI/model/players');
/*Creamos variables para la ejecución de la API teams*/
var teamsAPI = require('./teamsAPI/v1/index');
/*Creamos variables para la ejecución de la API teams*/
var playersAPI = require('./playersAPI/v1/index');

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

/*Ejecución de teamsAPI*/
teamsAPI.register(app, passport);

/*Ejecución de playersAPI*/
playersAPI.register(app, Player);

/*Exportamos el servidor*/
module.exports = app;