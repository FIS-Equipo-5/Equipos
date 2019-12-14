const app = require('../server.js');
const db = require('../db.js');
const request = require('supertest');


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
});