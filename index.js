var express = require('express');
var bodyParser = require('body-parser');

var port = (process.env.PORT || 3000);

console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());
//var BASE_API_PATH="/api/v1";


/*Creamos variables para la ejecución de la API*/
var teamsAPI = require('./teamsAPI/v1');



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

/*Ejecución de teamsAPI*/
teamsAPI.register(app,teams);



app.listen(port);

console.log("Server ready!");