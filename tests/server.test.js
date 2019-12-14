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
        });

        dbFind = jest.spyOn(db.teamDB,"find");
        dbFind.mockImplementation((query, callback)=>{
            callback(null, teams);
        });

        it("Sould return all the teams that are stored in our database", () =>{
            return request(app).get("/api/v1/teams").then((response)=>{
                expect(response.status).toBe(200);
                expect(response.body).toBeArrayOfSize(2);
                expect(dbFind).toBecalledWith({}, expect.any(Function));
            });
        });
    });
});