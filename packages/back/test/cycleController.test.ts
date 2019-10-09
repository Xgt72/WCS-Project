import "reflect-metadata";
import request from 'supertest';
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { PlayerBuilding } from "../src/entities/PlayerBuilding";
import { Indicator } from "../src/entities/Indicator";
import { Mutator } from "../src/entities/Mutator";
let connection: Connection = null;
let testerId = 0;
let playerId = 0;
let reputationId = 0;
let budgetId = 0;
let classroomPlayer: any = null;
let parkingPlayer: any = null;


describe('doCycle', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should create player Tester",
        async (done) => {
            let player = new Player("Tester");
            let response = await post("/savePlayer", player);
            expect(response.status).toEqual(200);
            testerId = response.body.id;
            expect(response.body.playerName).toEqual(player.playerName);
            done();
        }
    );

    test(
        "should add a buidling template classroom",
        async (done) => {
            let buidlingTemplate = new PlayerBuilding(testerId, "classroom", 500, true);
            buidlingTemplate.mutators = [
                new Mutator("incReputation", reputationId, 5),
                new Mutator("decBudget", budgetId, -100)
            ];
            let response = await post("/savePlayerBuilding", buidlingTemplate);
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should add a buidling template parking",
        async (done) => {
            let buidlingTemplate = new PlayerBuilding(testerId, "parking", 300, true);
            buidlingTemplate.mutators = [
                new Mutator("incReputation", reputationId, 2),
                new Mutator("decBudget", budgetId, -50)
            ];
            let response = await post("/savePlayerBuilding", buidlingTemplate);
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should create player Sharky",
        async (done) => {
            let player = new Player("Sharky");
            let response = await post("/savePlayer", player);
            playerId = response.body.id;
            expect(response.status).toEqual(200);
            expect(response.body.playerName).toEqual(player.playerName);
            done();
        }
    );

    test(
        "should add indicators reputation and budget",
        async (done) => {
            let reputationIndicator = new Indicator("reputation", playerId, 50);
            let response = await post("/saveIndicator", reputationIndicator);
            expect(response.status).toEqual(200);
            reputationId = response.body.id;

            let budgetIndicator = new Indicator("budget", playerId, 5000);
            response = await post("/saveIndicator", budgetIndicator);
            expect(response.status).toEqual(200);
            budgetId = response.body.id;

            done();
        }
    );

    test(
        "should add a buidling player classroom and a building player parking",
        async (done) => {
            let response = await get("/getAllBuildingTemplates", {});
            let classroom = response.body.filter((building: PlayerBuilding) => building.name == "classroom");
            classroomPlayer = new PlayerBuilding(playerId, classroom[0].name, classroom[0].price);
            classroomPlayer.mutators = classroom[0].mutators;
            classroomPlayer.mutators[0].indicator_id = reputationId;
            classroomPlayer.mutators[1].indicator_id = budgetId;

            let parking = response.body.filter((building: PlayerBuilding) => building.name == "parking");
            parkingPlayer = new PlayerBuilding(playerId, parking[0].name, parking[0].price);
            parkingPlayer.mutators = parking[0].mutators;
            parkingPlayer.mutators[0].indicator_id = reputationId;
            parkingPlayer.mutators[1].indicator_id = budgetId;

            response = await post("/savePlayerBuilding", classroomPlayer);
            classroomPlayer = response.body;
            expect(response.status).toEqual(200);

            response = await post("/savePlayerBuilding", parkingPlayer);
            expect(response.status).toEqual(200);
            parkingPlayer = response.body;

            done();
        }
    );

    test(
        "should do a cycle",
        async (done) => {
            let response = await get("/doCycle", { player_id: playerId });
            expect(response.status).toEqual(200);
            expect(parseInt(response.body[0].value)).toEqual(57);
            expect(parseInt(response.body[1].value)).toEqual(4850);
            done();
        }
    )
});

export function get(url: string, body: any) {
    const httpRequest = request(app).get(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}

export function post(url: string, body: any) {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}