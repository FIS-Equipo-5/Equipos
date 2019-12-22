var teamsAPI={};
var BASE_API_PATH="/api/v1";

teamsAPI.register = function(app, teamDB){

// GET - /teams 
app.get(BASE_API_PATH + "/teams", (req,res)=>{
    console.log(Date()+" - GET /teams");
    teamDB.find({},(err,teams)=>{
        if(err){
            console.log(Date()+" - "+err);
            res.sendStatus(500);
        }else{
            res.statusCode=200;
            res.send(teams.map((team)=>{
                delete team._id;
                return team;
            }));
        }
    });    
});

//POST - /teams
app.post(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" POST /teams");
    var team = req.body;
    teamDB.insert(team,(err,newTeam)=>{
        if(err){
            console.log(Date() + " - " + err);
            res.sendStatus(500);
        }else{
            res.statusCode=201;
            delete newTeam._id
            res.send(newTeam);
        }
    });
});


//DELETE - /teams
app.delete(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" DELETE /teams");
    teamDB.remove({}, { multi: true }, function (err, numRemoved) {
        if(err){
            console.log(Date()+" - "+err);
            res.sendStatus(500);
        }else{
            res.sendStatus(204);
        }
    });
});


//GET - /teams/{team_name}
app.get(BASE_API_PATH + "/teams/:team_name", (req,res)=>{
    var teamName = req.params.team_name;
    console.log(Date()+" GET /teams/"+teamName);
    teamDB.findOne({name: teamName},(err,team)=>{
        if(err){
            console.log(Date()+" - "+ err);
            res.sendStatus(500);
        }else{
            delete team._id;
            res.send(team);
        }
    });
});

//PUT /teams/{team_name}
app.put(BASE_API_PATH + "/teams/:team_name", (req,res)=>{
    var teamName = req.params.team_name;
    var newTeam = req.body;
    console.log(Date()+" PUT /team/" +teamName);
    teamDB.update({name: teamName},newTeam, (err, numUpdated)=>{
        if(err){
            console.log(Date()+" - "+ err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });

});


//DELETE /teams/{team_name}
app.delete(BASE_API_PATH+"/teams/:team_name", (req,res)=>{
    var teamName = req.params.team_name;
    teamDB.remove({name: teamName}, {}, (err, numRemoved)=>{
        if(err){
            console.log(Date()+" - "+ err);
            res.sendStatus(500);
        }else{
            res.sendStatus(204);
        }
    });
});


}

/*Expotamos la API de equipos*/
module.exports = teamsAPI;