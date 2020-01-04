const Team = require('../teamsAPI/model/teams');
const Player = require('../playersAPI/model/players');

const intialTeams = [
    {
        "team_id": 1,
        "name": "Real Betis",
        "code": "111",
        "logo": "https://media.api-football.com/teams/543.png",
        "country": "Spain",
        "founded": 1909,
        "venue_name": "Estadio Benito Villamarín",
        "venue_surface": "grass",
        "venue_address": "Avenida de Concha Espina 1, Chamartín",
        "venue_city": "Sevilla",
        "venue_capacity": 63000,
        "budget": 15965000,
        "value": 123456789
    },
    {
        "team_id": 2,
        "name": "Real Madrid",
        "code": "222",
        "logo": "https://media.api-football.com/teams/541.png",
        "country": "Spain",
        "founded": 1909,
        "venue_name": "Estadio Santiago Bernabéu",
        "venue_surface": "grass",
        "venue_address": "Avenida de Concha Espina 1, Chamartín",
        "venue_city": "Madrid",
        "venue_capacity": 89000,
        "budget": 999999999,
        "value": 999999999
    },
    {
        "team_id": 3,
        "name": "Atlético de Madrid",
        "code": "333",
        "logo": "https://media.api-football.com/teams/545.png",
        "country": "Spain",
        "founded": 1909,
        "venue_name": "Wanda Metropolitano",
        "venue_surface": "grass",
        "venue_address": "Avenida de Concha Espina 1, Chamartín",
        "venue_city": "Madrid",
        "venue_capacity": 89000,
        "budget": 999999999,
        "value": 999999999
    }
];
const initialPlayers = [
    {
        "player_name": "Joaquín",
        "firstname": "Sánchez",
        "lastname": "Rodríguez",
        "position": "Delantero",
        "nationality": "Español",
        "value": 8000000,
        "team_id": 1,
        "goals": {
            "total": 22,
            "assists": 6 
        },
        "cards": {
            "yellow": 3,
            "red": 1
        }
    },
    {
        "player_name": "Karim",
        "firstname": "Mostafa",
        "lastname": "Benzema",
        "position": "Delantero",
        "nationality": "Francés",
        "value": 8000000,
        "team_id": 2,
        "goals": {
            "total": 22,
            "assists": 6 
        },
        "cards": {
            "yellow": 3,
            "red": 1
        }
    },
    {
        "player_name": "Diego",
        "firstname": "da Silva",
        "lastname": "Costa",
        "position": "Delantero",
        "nationality": "Español",
        "value": 8000000,
        "team_id": 3,
        "goals": {
            "total": 22,
            "assists": 6 
        },
        "cards": {
            "yellow": 3,
            "red": 1
        }
    }
];

const loadInitialData = function(){
    Team.insertMany(intialTeams,{},(err, teams)=>{
        if(err){
            console.log(Date() + " error loading initial teams: " + err);
        }else{
            console.log("Loaded " + teams.length + " initial teams");
        }
    });
    Player.insertMany(initialPlayers, {}, (err, players)=>{
        if(err){
            console.log(Date() + " error loading initial players: " + err);
        }else{
            console.log("Loaded " + players.length + " initial players");
        }
    });
}

module.exports = loadInitialData;