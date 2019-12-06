var teamsAPI={};
var BASE_API_PATH="/api/v1";

module.exports = teamsAPI;

teamsAPI.register = function(app, teams){

    // GET - /teams 
app.get(BASE_API_PATH + "/teams", (req,res)=>{
    console.log(Date()+" - GET /teams");
    res.statusCode = 200;
    res.send(teams);
    
});

//POST - /teams
app.post(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" POST /teams");
    var team = req.body;
    teams.push(team);
    res.sendStatus(201);
});

//DELETE - /teams
app.delete(BASE_API_PATH+"/teams", (req,res)=>{
    console.log(Date()+" DELETE /teams");
    teams = [];
    res.statusCode=204;
    res.send(teams);
});

//PUT - /teams

}