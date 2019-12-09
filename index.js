var express = require('express');
var bodyParser = require('body-parser');
var DataStore = require('nedb');

var port = (process.env.PORT || 3000);

console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());


/*Creamos variables para la ejecución de la API teams*/
var teamsAPI = require('./teamsAPI/v1');

/*Creamos variables para la ejecución de la API players*/
var playersAPI = require('./playersAPI/v1');

/*Creamos el fichero donde se almacenarán los equipos*/
var DB_TEAM_FILE_NAME = __dirname + "/teams.json";
var teamDB = new DataStore({ filename: DB_TEAM_FILE_NAME, autoload: true });

/*Creamos el fichero donde se almacenarán los jugadores*/
var DB_PLAYER_FILE_NAME = __dirname + "/players.json";
var playerDB = new DataStore({ filename: DB_PLAYER_FILE_NAME, autoload: true });

/*
var teams = [

    {
        "team_id": 1,
        "name": "Real Madrid",
        "code": null,
        "logo": "https://media.api-football.com/teams/541.png",
        "country": "Spain",
        "founded": 1902,
        "venue_name": "Estadio Santiago Bernabéu",
        "venue_surface": "grass",
        "venue_address": "Avenida de Concha Espina 1, Chamartín",
        "venue_city": "Madrid",
        "venue_capacity": 85454
    },
    {
        "team_id": 2,
        "name": "Real Betis",
        "code": null,
        "logo": "https://media.api-football.com/teams/543.png",
        "country": "Spain",
        "founded": 1902,
        "venue_name": "Benito Villamarín",
        "venue_surface": "grass",
        "venue_address": "Avenida Reina Mercedes",
        "venue_city": "Sevilla",
        "venue_capacity": 63000
    }

];
*/

/*Ejecución de teamsAPI*/
teamsAPI.register(app,teamDB);

/*Ejecución de playersAPI*/
playersAPI.register(app,playerDB, teamDB);

app.listen(port);

console.log("Server ready!");