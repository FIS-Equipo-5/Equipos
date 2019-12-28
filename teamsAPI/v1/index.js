const Team = require('../module/teams');
const teamsAPI={};
const BASE_API_PATH="/api/v1";

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
        "venue_capacity": 85454,
        "budget": 34234,
        "value": 453535978
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
        "venue_capacity": 63000,
        "budget": 34234,
        "value": 453535978
    }

];
*/

teamsAPI.register = function(app){

// GET - /teams 
app.get(BASE_API_PATH + "/teams", (req,res)=>{
    console.log(Date()+" - GET /teams");
    Team.find({},(err,teams)=>{
        if(err){
            console.log(Date()+" - "+err);
            res.sendStatus(500);
        }else{
            res.statusCode=200;
            if(teams.length != 0){
                res.send(teams.map((team)=>{
                    return team.cleanup();
                }));    
            }else{
                res.send(teams);
            }
        }
    });    
});

//POST - /teams
app.post(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" POST /teams");
    var team = req.body;
    const message = validateTeam(team);
    if(message === ""){
        Team.find( { $or: [ {team_id: team.team_id }, { name: team.name }, {code: team.code} ] }, (err,teams)=>{
            if(err){
                console.log(Date()+" - "+err);
                res.sendStatus(500); 
            }else if(teams.length === 0){
                Team.create(team,(err,newTeam)=>{
                    if(err){
                        console.log(Date() + " - " + err);
                        res.sendStatus(500);
                    }else{
                        res.statusCode=201;
                        var cleanedTeam = newTeam.cleanup();
                        res.send(cleanedTeam);
                    }
                });
            }else{
                console.log("The team already exist");
                res.status(400).json({err: "There is a team with the same id, name or code"});
            }
        });
    }else{
        res.status(400).json({err: message});
    }
    
});


//DELETE - /teams
app.delete(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" DELETE /teams");
    Team.remove({}, (err, result) =>{
        if(err){
            console.log(Date()+" - "+err);
            res.sendStatus(500);
        }else{
            console.log("Removed all the " + result['deletedCount'] + " teams")
            res.sendStatus(204);
        }
    });    
});


//GET - /teams/{team_name}
app.get(BASE_API_PATH + "/teams/:team_name", (req,res)=>{
    var teamName = req.params.team_name;
    console.log(Date()+" GET /teams/"+teamName);
    Team.findOne({name: teamName},(err,team)=>{
        if(err){
            console.log(Date()+" - "+ err);
            res.sendStatus(500);
        }else if(team === null){
            console.log("Team does not exist");
            res.sendStatus(404);
        }else{
            var requestedTeam = team.cleanup();
            res.status(200).send(requestedTeam);
        }
    });
});


//PUT /teams/{team_name}
app.put(BASE_API_PATH + "/teams/:team_name", (req,res)=>{
    var teamName = req.params.team_name;
    var updatedTeam = req.body;
    console.log(Date()+" PUT /team/" +teamName);

    var message = validateTeam(updatedTeam);
    if(message === ""){
        Team.findOne({name: teamName}, (err,team)=>{
            if(err){
                console.log(Date()+" - "+ err);
                res.sendStatus(500);
            }else if(team!==null && (updatedTeam.team_id !== team.team_id || updatedTeam.name !== team.name || updatedTeam.code != team.code)){
                res.status(400).json({err: "The updated team must have the same id, name and code"});
            }else{
                Team.updateOne({name: teamName},updatedTeam, (err, result)=>{
                    if(err){
                        console.log(Date()+" - "+ err);
                        res.sendStatus(500);
                    }else if(result['n'] === 0){
                        res.sendStatus(404);
                    }else{
                        res.sendStatus(200);
                    }
                });
            }
        });
    }else{
        res.status(400).json({err: message});
    }
});


//DELETE /teams/{team_name}
app.delete(BASE_API_PATH+"/teams/:team_name", (req,res)=>{
    var teamName = req.params.team_name;
    Team.deleteOne({name: teamName}, (err, result)=>{
        if(err){
            console.log(Date()+" - "+ err);
            res.sendStatus(500);
        }else if(result['deletedCount']===0){
            res.sendStatus(404);
        }else{
            res.sendStatus(204);
        }
    });
});


//GET - /teams/team/{team_id} --> Integrations
app.get(BASE_API_PATH + "/teams/team/:team_id", (req,res)=>{
    var teamId = req.params.team_id;
    console.log(Date()+" GET /teams/team/"+teamId);
    Team.findOne({team_id: teamId},(err,team)=>{
        if(err){
            console.log(Date()+" - "+ err);
            res.sendStatus(500);
        }else if(team === null){
            res.sendStatus(404);
        }else{
            var requestedTeam = team.cleanup();
            res.status(200).send(requestedTeam);
        }
    });
});



function validateTeam(team){
    var attributes = [];
    var message = "";
    if(Object.keys(team).length <= 13){
        if(!team.team_id){
            console.log("Atribute id required and not specified!");
            attributes.push("id");
        }if(!team.name){
            console.log("Atribute name required and not specified!");
            attributes.push("name");
        }if(!team.code){
            console.log("Atribute code required and not specified!");
            attributes.push("code");
        }if(!team.logo){
            console.log("Atribute logo required and not specified!");
            attributes.push("logo");
        }if(!team.country){
            console.log("Atribute country required and not specified!");
            attributes.push("country");
        }if(!team.founded){
            console.log("Atribute founded required and not specified!");
            attributes.push("founded");
        }if(!team.venue_name){
            console.log("Atribute venue_name required and not specified!");
            attributes.push("venue_name");
        }if(!team.venue_surface){
            console.log("Atribute venue_surface required and not specified!");
            attributes.push("venue_surfce");
        }if(!team.venue_address){
            console.log("Atribute venue_address required and not specified!");
            attributes.push("venue_address");
        }if(!team.venue_city){
            console.log("Atribute venue_city required and not specified!");
            attributes.push("venue_city");
        }if(!team.venue_capacity){
            console.log("Atribute venue_capacity required and not specified!");
            attributes.push("venue_capacity");
        }if(!team.budget){
            console.log("Atribute budget required and not specified!");
            attributes.push("budget");
        }if(!team.value){
            console.log("Atribute value required and not specified!");
            attributes.push("value");
        }

        if(attributes.length === 1){
            message = "Atribute " + attributes[0] + " required";
        }else if(attributes.length > 1){
            message = "Atributes "
            for(i = 0; i < attributes.length; i++){
                if(i === attributes.length-1){
                    message = message + attributes[i] + " required";
                }else if(i === attributes.length-2){
                    message = message + attributes[i] + " and ";
                }else{
                    message = message + attributes[i] + ", ";
                }
            }
        }

    }else{
        message = "There are more attributes than expected";
    }
    return message;
}

}

/*Expotamos la API de equipos*/
module.exports = teamsAPI;