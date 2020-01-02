const Team = require('../teamsAPI/model/teams');
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