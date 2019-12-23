const app = require('../server.js');
const db = require('../db.js');
const request = require('supertest');

describe("Hello world tests", ()=>{

    it("Should do a stupid test", ()=>{
        const a = 5;
        const b = 3;
        const sum = a + b;

        expect(sum).toBe(8);
    });
});

describe("Teams API", ()=>{

    describe("GET /teams", ()=>{
        beforeAll(()=>{
            const teams = [

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

            dbFind = jest.spyOn(db.teamDB,"find");
            dbFind.mockImplementation((query, callback)=>{
                callback(null, teams);
            });
        });

        it("Sould return all the teams that are stored in our database", () =>{
            return request(app).get("/api/v1/teams").then((response)=>{
                expect(response.statusCode).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBeCalledWith({}, expect.any(Function));
            });
        });
    });


    describe("POST /teams", () =>{

        const team = {
            "team_id": 1,
            "name": "Inserted team",
            "code": null,
            "logo": "https://media.api-football.com/teams/541.png",
            "country": "Spain",
            "founded": 1902,
            "venue_name": "Estadio Santiago Bernabéu",
            "venue_surface": "grass",
            "venue_address": "Avenida de Concha Espina 1, Chamartín",
            "venue_city": "Madrid",
            "venue_capacity": 85454
        };
        let dbInsert;

        beforeEach(() =>{
            dbInsert = jest.spyOn(db.teamDB,"insert");
        });

        it("Should add a new team is everything is fine", ()=>{

            dbInsert.mockImplementation((t, callback)=>{
                callback(false,t);
            });
            return request(app).post("/api/v1/teams").send(team).then((response)=>{
                expect(response.statusCode).toBe(201);
                expect(dbInsert).toBeCalledWith(team, expect.any(Function));
            });
        });

        it("Shoud return 500 if there is some problem with the DB", ()=>{

            dbInsert.mockImplementation((t, callback)=>{
                callback(true,null);
            });
            return request(app).post("/api/v1/teams").send(team).then((response)=>{
                expect(response.statusCode).toBe(500);
                expect(dbInsert).toBeCalledWith(team, expect.any(Function));
            });

        });

    });

});

describe("Players API", () => {
    describe("GET /players", () => {
        beforeAll(() => {
            const players = [
                { "uuid": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 }, "_id": "DPQwdkT8XS58fDWH" },
                { "uuid": 2, "player_name": "Sergio", "firstname": "Ramos", "lastname": "Rodriguez", "position": "Attacker", "nationality": "Spain", "value": 7000000, "team_id": 31, "goals": { "total": 48, "assists": 51 }, "cards": { "yellow": 21, "red": 12 }, "_id": "DPQwdkTG4JJUFO9E" }
            ]

            dbFind = jest.spyOn(db.playerDB, "find");
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
        var dbInsert;
        var player = player = { "uuid": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 } };

        beforeEach(() => {
            dbInsert = jest.spyOn(db.playerDB, "insert");
        });

        it("POST /players 201", () => {
            dbInsert.mockImplementation((playerQueryInsert, callback) => {
                callback(false);
            });

            return request(app).post("/api/v1/players").send(player).then((response) => {
                expect(response.status).toBe(201);
                expect(dbInsert).toBeCalledWith(player, expect.any(Function));
            });
        });

        it("POST /players 500", () => {
            dbInsert.mockImplementation((playerQueryInsert, callback) => {
                callback(true);
            });

            return request(app).post("/api/v1/players").send(player).then((response) => {
                expect(response.status).toBe(500);
            });
        });
    });

    describe("GET /player", () => {
        beforeAll(() => {
            const player = { "uuid": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 }, "_id": "DPQwdkT8XS58fDWH" }

            dbFind = jest.spyOn(db.playerDB, "find");
            dbFind.mockImplementation((query, callback) => {
                callback(null, player);
            });

        });

        it("GET /player 200", () => {
            return request(app).get("/api/v1/player").then((response) => {
                expect(response.status).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("json"));
                expect(dbFind).toBeCalledWith({ uuid: player.uuid }, expect.any(Function));
            });
        });

        it("GET /player 400", () => {
            return request(app).get("/api/v1/player").then((response) => {
                expect(response.status).toBe(400);
                expect(dbFind).toBeCalledWith({ uuid: null }, expect.any(Function));
            });
        });
    });

    describe("PUT /player", () => {
        beforeAll(() => {
            const player = { "uuid": 1, "player_name": "K. Mbappé", "firstname": "Kylian", "lastname": "Mbappé Lottin", "position": "Attacker", "nationality": "France", "value": 600000, "team_id": 85, "goals": { "total": 33, "assists": 7 }, "cards": { "yellow": 5, "red": 1 } };
            dbUpdate = jest.spyOn(db.playerDB, "update");

            dbUpdate.mockImplementation((filter, object, callback) => {
                callback(null, player);
            });
        });

        it("PUT /player 200", () => {
            return request(app).put("/api/v1/player").send(player).then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toEqual(expect.stringContaining("json"));
                expect(Array.isArray(response.body)).toBe(false);
                expect(dbUpdate).toBeCalledWith({uuid: player.id}, player, expect.any(Function));
            });
        });
    });
});