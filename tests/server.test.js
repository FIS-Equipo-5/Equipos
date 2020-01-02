const app = require('../server.js');
const Team = require('../teamsAPI/module/teams');
const Player = require('../playersAPI/model/players');
const request = require('supertest');

describe("Teams API", ()=>{

    describe("GET /teams", ()=>{
       
        it("Sould return all the teams that are stored in our database", () =>{
            const teams = [

                new Team(
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
                     }) ,
                 new Team(
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
                 })
             ];
            dbFind = jest.spyOn(Team,"find");
            dbFind.mockImplementation((query, callback)=>{
                callback(null, teams);
            });
            return request(app).get("/api/v1/teams").then((response)=>{
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });
     

    describe("POST /teams", () =>{

        const team = {
            "team_id": 1313,
            "name": "prueba",
            "code": "777",
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1909,
            "venue_name": "Estadio Benito Villamarín",
            "venue_surface": "polvoraaa",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Sevilla",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 10000000000000000000
        };
        let dbCreate;
        let dbFind;

        beforeEach(() =>{
            dbCreate = jest.spyOn(Team,"create");
            dbFind = jest.spyOn(Team, "find");
        });

        it("Should add a new team if everything it's ok", ()=>{
            dbFind.mockImplementation((query, callback)=>{
                emptyArray = new Array();
                callback(null,emptyArray);
            });
            dbCreate.mockImplementation((t, callback)=>{
                callback(false,new Team(t));
            });
            return request(app).post("/api/v1/teams").send(team).then((response)=>{
                expect(dbFind).toBeCalledWith({ $or: [ {team_id: team.team_id }, { name: team.name }, {code: team.code} ] }, expect.any(Function));
                expect(dbCreate).toBeCalledWith(team, expect.any(Function));
                expect(response.statusCode).toBe(201);
            });
        });

        it("Should return an error if the team already exist (same code, name or id)", ()=>{
            dbFind.mockImplementation((query, callback)=>{
                array = [new Team (team)];
                callback(false,array);
            });
            return request(app).post("/api/v1/teams").send(team).then((response)=>{
                expect(dbFind).toBeCalledWith({ $or: [ {team_id: team.team_id }, { name: team.name }, {code: team.code} ] }, expect.any(Function));
                expect(response.statusCode).toBe(400);
            });
        });

        it("Shoud return 500 if there is some problem with the DB - 1", ()=>{
            dbFind.mockImplementation((query, callback)=>{
                callback(true,null);
            });
            return request(app).post("/api/v1/teams").send(team).then((response)=>{
                expect(response.statusCode).toBe(500);
                expect(dbFind).toBeCalledWith({ $or: [ {team_id: team.team_id }, { name: team.name }, {code: team.code} ] }, expect.any(Function));
            });
        });

        it("Shoud return 500 if there is some problem with the DB - 2", ()=>{
            dbFind.mockImplementation((query, callback)=>{
                array = new Array();
                callback(false,array);
            });
            dbCreate.mockImplementation((t, callback)=>{
                callback(true,t);
            });
            return request(app).post("/api/v1/teams").send(team).then((response)=>{
                expect(dbFind).toBeCalledWith({ $or: [ {team_id: team.team_id }, { name: team.name }, {code: team.code} ] }, expect.any(Function));
                expect(dbCreate).toBeCalledWith(team, expect.any(Function));
                expect(response.statusCode).toBe(500);
            });
        });

        it("Shoud return 400 if there is some missing attribute or exceed the number of attributes", ()=>{
            const badTeam = {
                "team_id": 1313,
                "name": "prueba",
                "code": "777",
                "logo": "https://media.api-football.com/teams/541.png",
                "country": "Spain",
                "founded": 1909,
                "venue_name": "Estadio Benito Villamarín",
                "venue_surface": "polvoraaa",
                "venue_address": "Avenida de Concha Espina 1, Chamartín",
                "venue_city": "Sevilla",
                "venue_capacity": 85454,
                "budget": 14423432
                }
            return request(app).post("/api/v1/teams").send(badTeam).then((response)=>{
                expect(response.type).toInclude('json');
                expect(response.statusCode).toBe(400);
                expect(response.body.err).toBe('Atribute value required');

            });
        });

    });

    describe("DELETE /teams", () =>{

        let dbRemove;

        beforeEach(() =>{
            dbRemove = jest.spyOn(Team,"remove");
        });

        it("Should delete all the teams", ()=>{
            dbRemove.mockImplementation((query, callback)=>{
                callback(false,new Object());
            });
            return request(app).delete("/api/v1/teams").then((response)=>{
                expect(dbRemove).toBeCalledWith({}, expect.any(Function));
                expect(response.statusCode).toBe(204);
            });
        });

        it("Shoud return 500 if there is some problem with the DB", ()=>{
            dbRemove.mockImplementation((query, callback)=>{
                callback(true,null);
            });
            return request(app).delete("/api/v1/teams").then((response)=>{
                expect(dbRemove).toBeCalledWith({}, expect.any(Function));
                expect(response.statusCode).toBe(500);
            });
        });

    });

    describe("GET /teams/{team_name}", ()=>{
        let dbFindOne;
        const team = {
            "team_id": 1313,
            "name": "prueba",
            "code": "777",
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1909,
            "venue_name": "Estadio Benito Villamarín",
            "venue_surface": "polvoraaa",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Sevilla",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 10000000000000000000
        };
        beforeEach(() =>{
            dbFindOne = jest.spyOn(Team,"findOne");
        });
        it("Should return the searched team", ()=>{
            dbFindOne.mockImplementation((query, callback)=>{
                callback(false,new Team(team));
            });
            return request(app).get("/api/v1/teams/prueba").then((response)=>{
                expect(response.statusCode).toBe(200);
                expect(dbFindOne).toBeCalledWith({name: team.name}, expect.any(Function));
            });
        });

        it("Should return 404 if the team does not exist", ()=>{
            dbFindOne.mockImplementation((query, callback)=>{
                callback(false,null);
            });
            return request(app).get("/api/v1/teams/prueba").then((response)=>{
                expect(response.statusCode).toBe(404);
                expect(dbFindOne).toBeCalledWith({name: team.name}, expect.any(Function));
            });
        });

        it("Shoud return 500 if there is some problem with the DB", ()=>{
            dbFindOne.mockImplementation((query, callback)=>{
                callback(true,null);
            });
            return request(app).get("/api/v1/teams/prueba").then((response)=>{
                expect(response.statusCode).toBe(500);
                expect(dbFindOne).toBeCalledWith({name: team.name}, expect.any(Function));
            });
        });
    });

    describe("PUT /teams/{team_name}", ()=>{

        const team = {
            "team_id": 1313,
            "name": "prueba",
            "code": "777",
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1909,
            "venue_name": "Estadio Benito Villamarín",
            "venue_surface": "polvoraaa",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Sevilla",
            "venue_capacity": 85454,
            "budget": 14423432,
            "value": 10000000000000000000
        };
        const updatedTeam = {
            "team_id": 1313,
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
        };

        const badUpdatedTeam = {
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
        };

        beforeEach(() =>{
            dbFindOne = jest.spyOn(Team, "findOne");
            dbFindOne.mockImplementation((query, callback)=>{
                callback(false,team);
            });
        });

        it("Should update the team if everything it's ok", ()=>{
            
            dbUpdateOne = jest.spyOn(Team, "updateOne");

            
            dbUpdateOne.mockImplementation((query,updtTeam,callback)=>{
                callback(false,new Object());
            });

            return request(app).put("/api/v1/teams/prueba").send(updatedTeam).then((response)=>{
                expect(response.statusCode).toBe(200);
                expect(dbFindOne).toBeCalledWith({name: team.name}, expect.any(Function));
                expect(dbUpdateOne).toBeCalledWith({name: team.name}, updatedTeam, expect.any(Function));
            });
        });

        it("Should return 400 if the team id, code or name has been modified", ()=>{

            return request(app).put("/api/v1/teams/prueba").send(badUpdatedTeam).then((response)=>{
                expect(response.statusCode).toBe(400);
                expect(dbFindOne).toBeCalledWith({name: team.name}, expect.any(Function));
                expect(response.body.err).toBe("The updated team must have the same id, name and code");
            });
        });
    });

    describe("DELETE /teams/{team_name}", ()=>{

        beforeEach(()=>{
            dbDeleteOne = jest.spyOn(Team, "deleteOne");
        });

        it("Should delete the team if everything it's ok", ()=>{
            dbDeleteOne.mockImplementation((query, callback)=>{
                callback(false, new Object());
            });
            return request(app).delete("/api/v1/teams/prueba").then((response)=>{
                expect(response.statusCode).toBe(204);
                expect(dbDeleteOne).toBeCalledWith({name: "prueba"}, expect.any(Function));
            });
        });

        it("Shoud return 404 the team does not exist", ()=>{
            dbDeleteOne.mockImplementation((query, callback)=>{
                var obj = new Object();
                obj['deletedCount'] = 0;
                callback(false, obj);
            });
            return request(app).delete("/api/v1/teams/prueba").then((response)=>{
                expect(response.statusCode).toBe(404);
                expect(dbDeleteOne).toBeCalledWith({name: "prueba"}, expect.any(Function));
            });
        });

    });


});

describe("Players API", () => {
    describe("GET /players", () => {
        beforeAll(() => {
            const players = [
                { "_id": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 }, "_id": "DPQwdkT8XS58fDWH" },
                { "_id": 2, "player_name": "Sergio", "firstname": "Ramos", "lastname": "Rodriguez", "position": "Attacker", "nationality": "Spain", "value": 7000000, "team_id": 31, "goals": { "total": 48, "assists": 51 }, "cards": { "yellow": 21, "red": 12 }, "_id": "DPQwdkTG4JJUFO9E" }
            ]

            dbFind = jest.spyOn(Player, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, players);
            });

        });

        it("GET /players 200", () => {
            return request(app).get("/api/v1/players").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("json"));
                expect(Array.isArray(response.body)).toBe(true);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });

    describe("POST /players", () => {
        let dbInsert;
        const player = new Player({"_id": "5e0e2b8a85d4450d529ea758", "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 } });

        beforeEach(() => {
            dbInsert = jest.spyOn(Player, "create");
        });

        it("POST /players 201", () => {
            dbInsert.mockImplementation((playerQueryInsert, callback) => {
                callback(false, player);
            });

            return request(app).post("/api/v1/players").send(player).then((response) => {
                expect(response.status).toBe(201);
                expect(dbInsert).toBeCalledWith(player, expect.any(Function));
            });
        });

        it("POST /players 500", () => {
            dbInsert.mockImplementation((playerQueryInsert, callback) => {
                callback(true, null);
            });

            return request(app).post("/api/v1/players").send(player).then((response) => {
                expect(response.status).toBe(500);
            });
        });
    });

    // describe("GET /player", () => {
    //     beforeAll(() => {
    //         const player = { "uuid": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 }, "_id": "DPQwdkT8XS58fDWH" }

    //         dbFind = jest.spyOn(db.playerDB, "find");
    //         dbFind.mockImplementation((query, callback) => {
    //             callback(null, player);
    //         });

    //     });

    //     it("GET /player 200", () => {
    //         return request(app).get("/api/v1/player").then((response) => {
    //             expect(response.status).toBe(200);
    //             expect(response.type).toEqual(expect.stringContaining("json"));
    //             expect(dbFind).toBeCalledWith({ uuid: player.uuid }, expect.any(Function));
    //         });
    //     });

    //     it("GET /player 400", () => {
    //         return request(app).get("/api/v1/player").then((response) => {
    //             expect(response.status).toBe(400);
    //             expect(dbFind).toBeCalledWith({ uuid: null }, expect.any(Function));
    //         });
    //     });
    // });

    // describe("PUT /player", () => {
    //     beforeAll(() => {
    //         const player = { "uuid": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 } };
    //         dbUpdate = jest.spyOn(db.playerDB, "update");

    //         dbUpdate.mockImplementation((filter, object, callback) => {
    //             callback(null, player);
    //         });
    //     });

    //     it("PUT /player 200", () => {
    //         return request(app).put("/api/v1/player").send(player).then((response) => {
    //             expect(response.statusCode).toBe(200);
    //             expect(response.type).toEqual(expect.stringContaining("json"));
    //             expect(Array.isArray(response.body)).toBe(false);
    //             expect(dbUpdate).toBeCalledWith({uuid: player.id}, player, expect.any(Function));
    //         });
    //     });
    // });
});
