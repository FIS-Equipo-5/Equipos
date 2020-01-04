const Team = require('../teamsAPI/model/teams');
const Player = require('../playersAPI/model/players');
const mongoose = require('mongoose');
const dbConnect = require('../db');

describe('Teams DB connection', () =>{

    beforeAll(()=>{
        return dbConnect();
    });

    beforeEach((done)=>{
        Team.deleteMany({}, (err) => {
            done();
        });
    });

    it('Writes a team in the DB', (done)=>{
        const team = new Team(
            {
                "team_id": 1312,
                "name": "prueba",
                "code": "777",
                "logo": "https://media.api-football.com/teams/541.png",
                "country": "Spain",
                "founded": 1999,
                "venue_name": "Estadio Benito Villamarín",
                "venue_surface": "polvoraaa",
                "venue_address": "Avenida de Concha Espina 1, Chamartín",
                "venue_city": "Sevilla",
                "venue_capacity": 85454,
                "budget": 14423432,
                "value": 10000000000000000000
            }
        );
        team.save((err,team)=>{
            expect(err).toBeNull();
            Team.find({}, (err,teams)=>{
                expect(err).toBeNull();
                expect(teams).toBeArrayOfSize(1);
                expect(teams[0].name).toEqualCaseInsensitive("prueba");
                done();
            });
        });
    });

    it('Deletes all the teams of the DB', (done)=>{
        const team = new Team(
            {
                "team_id": 1312,
                "name": "prueba",
                "code": "777",
                "logo": "https://media.api-football.com/teams/541.png",
                "country": "Spain",
                "founded": 1999,
                "venue_name": "Estadio Benito Villamarín",
                "venue_surface": "polvoraaa",
                "venue_address": "Avenida de Concha Espina 1, Chamartín",
                "venue_city": "Sevilla",
                "venue_capacity": 85454,
                "budget": 14423432,
                "value": 10000000000000000000
            }
        );
        team.save((err,team)=>{
            expect(err).toBeNull();
            Team.deleteMany({},(err, result)=>{
                expect(err).toBeNull();
                expect(result['deletedCount']).toBe(1);
                Team.find({}, (err, teams)=>{
                    expect(err).toBeNull();
                    expect(teams).toBeArrayOfSize(0);
                    done();
                });
            });
            
        });
    });


    it('Returns the searched team ', (done)=>{
        const team = new Team(
            {
                "team_id": 1312,
                "name": "prueba",
                "code": "777",
                "logo": "https://media.api-football.com/teams/541.png",
                "country": "Spain",
                "founded": 1999,
                "venue_name": "Estadio Benito Villamarín",
                "venue_surface": "polvoraaa",
                "venue_address": "Avenida de Concha Espina 1, Chamartín",
                "venue_city": "Sevilla",
                "venue_capacity": 85454,
                "budget": 14423432,
                "value": 10000000000000000000
            }
        );
        team.save((err,team)=>{
            expect(err).toBeNull();
            Team.findOne({name: team.name}, (err,searchedTeam)=>{
                expect(err).toBeNull();
                expect(searchedTeam.name).toEqualCaseInsensitive("prueba");
                done();
            });
        });
    });


    it('Updates a team ', (done)=>{
        const team = new Team(
            {
                "team_id": 1312,
                "name": "prueba",
                "code": "777",
                "logo": "https://media.api-football.com/teams/541.png",
                "country": "Spain",
                "founded": 1999,
                "venue_name": "Estadio Benito Villamarín",
                "venue_surface": "polvoraaa",
                "venue_address": "Avenida de Concha Espina 1, Chamartín",
                "venue_city": "Sevilla",
                "venue_capacity": 85454,
                "budget": 14423432,
                "value": 10000000000000000000
            }
        );
        
        team.save((err,team)=>{
            expect(err).toBeNull();
            const updatedTeam = team;
            updatedTeam.founded = 1997;
            Team.updateOne({name: team.name}, updatedTeam, (err,result)=>{
                expect(err).toBeNull();
                expect(result['n']).toBe(1);
                Team.findOne({name: team.name}, (err,searchedTeam)=>{
                    expect(err).toBeNull();
                    expect(searchedTeam.founded).toBe(1997);
                    done();
                });
            });
        });
    });

    it('Deletes one team', (done)=>{
        const team = new Team(
            {
                "team_id": 1312,
                "name": "prueba",
                "code": "777",
                "logo": "https://media.api-football.com/teams/541.png",
                "country": "Spain",
                "founded": 1999,
                "venue_name": "Estadio Benito Villamarín",
                "venue_surface": "polvoraaa",
                "venue_address": "Avenida de Concha Espina 1, Chamartín",
                "venue_city": "Sevilla",
                "venue_capacity": 85454,
                "budget": 14423432,
                "value": 10000000000000000000
            }
        );
        team.save((err,team)=>{
            expect(err).toBeNull();
            Team.deleteOne({name: team.name}, (err,result)=>{
                expect(err).toBeNull();
                expect(result['deletedCount']).toBe(1);
                Team.findOne({name: team.name}, (err,searchedTeam)=>{
                    expect(err).toBeNull();
                    expect(searchedTeam).toBeNull();
                    done();
                });
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(()=>{
            mongoose.connection.close(done);
        });
    });

});

describe('Players DB connection', () =>{

    beforeAll(()=>{
        return dbConnect();
    });

    beforeEach((done)=>{
        Player.deleteMany({}, (err) => {
            done();
        });
    });

    it('Writes a player in the DB', (done)=>{
        const player = new Player(
            {
                "player_name": "K. Mbappé", 
                "firstname": "Kylian", 
                "lastname": "Mbappé Lottin", 
                "position": "Attacker", 
                "nationality": "France", 
                "value": 600000, 
                "team_id": 1313, 
                "goals": { 
                    "total": 33, 
                    "assists": 7 
                }, 
                "cards": { 
                    "yellow": 5, 
                    "red": 1 
                } 
            });
        player.save((err,player)=>{
            expect(err).toBeNull();
            Player.find({}, (err,players)=>{
                expect(err).toBeNull();
                expect(players).toBeArrayOfSize(1);
                expect(players[0].player_name).toEqualCaseInsensitive("K. Mbappé");
                done();
            });
        });
    });

    it('Returns the searched player ', (done)=>{
        const player = new Player(
            {
                "player_name": "K. Mbappé", 
                "firstname": "Kylian", 
                "lastname": "Mbappé Lottin", 
                "position": "Attacker", 
                "nationality": "France", 
                "value": 600000, 
                "team_id": 1313, 
                "goals": { 
                    "total": 33, 
                    "assists": 7 
                }, 
                "cards": { 
                    "yellow": 5, 
                    "red": 1 
                } 
            });
        player.save((err, playerSaved)=>{
            expect(err).toBeNull();
            Player.findOne({_id: playerSaved._id}, (err,searchedPlayer)=>{
                expect(err).toBeNull();
                expect(searchedPlayer.player_name).toEqualCaseInsensitive("K. Mbappé");
                done();
            });
        });
    });


    it('Updates a player ', (done)=>{
        const player = new Player(
            {
                "player_name": "K. Mbappé", 
                "firstname": "Kylian", 
                "lastname": "Mbappé Lottin", 
                "position": "Attacker", 
                "nationality": "France", 
                "value": 600000, 
                "team_id": 1313, 
                "goals": { 
                    "total": 33, 
                    "assists": 7 
                }, 
                "cards": { 
                    "yellow": 5, 
                    "red": 1 
                } 
            });
        
        player.save((err, playerSaved)=>{
            expect(err).toBeNull();
            playerSaved.value = 700000;
            Player.updateOne({_id: playerSaved._id}, playerSaved, (err,result)=>{
                expect(err).toBeNull();
                expect(result['n']).toBe(1);
                Player.findOne({_id: player._id}, (err,searchedPlayer)=>{
                    expect(err).toBeNull();
                    expect(searchedPlayer.value).toBe(700000);
                    done();
                });
            });
        });
    });

    it('Deletes one player', (done)=>{
        const player = new Player(
            {
                "player_name": "K. Mbappé", 
                "firstname": "Kylian", 
                "lastname": "Mbappé Lottin", 
                "position": "Attacker", 
                "nationality": "France", 
                "value": 600000, 
                "team_id": 1313, 
                "goals": { 
                    "total": 33, 
                    "assists": 7 
                }, 
                "cards": { 
                    "yellow": 5, 
                    "red": 1 
                } 
            });
        player.save((err, playerSaved)=>{
            expect(err).toBeNull();
            Player.deleteOne({_id: playerSaved._id}, (err, result)=>{
                expect(err).toBeNull();
                expect(result['deletedCount']).toBe(1);
                Player.findOne({_id: playerSaved._id}, (err, searchedPlayer)=>{
                    expect(err).toBeNull();
                    expect(searchedPlayer).toBeNull();
                    done();
                });
            });
        });
    });

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(()=>{
            mongoose.connection.close(done);
        });
    });

});