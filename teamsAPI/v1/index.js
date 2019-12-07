var teamsAPI={};
var BASE_API_PATH="/api/v1";

module.exports = teamsAPI;

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


}