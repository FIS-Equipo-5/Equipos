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