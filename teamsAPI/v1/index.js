var teamsAPI={};
var BASE_API_PATH="/api/v1";

module.exports = teamsAPI;

teamsAPI.register = function(app, teamDB){

// GET - /teams 
app.get(BASE_API_PATH + "/teams", (req,res)=>{
    console.log(Date()+" - GET /teams");
    res.statusCode = 200;
    res.send([]);
    
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
            res.send(newTeam);
        }
    });
});

/*
//DELETE - /teams
app.delete(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" DELETE /teams");
    teams = [];
    res.statusCode=204;
    res.send(teams);
});
*/

//PUT - /teams

}