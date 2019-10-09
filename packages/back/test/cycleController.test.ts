import "reflect-metadata";
import request from 'supertest';
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import {app, server} from "../src/app";
import { Player } from "../src/entities/Player";
import { PlayerBuilding } from "../src/entities/PlayerBuilding";
import { Indicator } from "../src/entities/Indicator";
import { Mutator } from "../src/entities/Mutator";
let connection:Connection = null;
let testerId = 0;
let playerId = 0;
let reputationId = 0;
let budgetId = 0;


describe('doCycle', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        done();
    });

    afterAll( async(done) => {
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
            let response = await post("/savePlayerBuilding", buidlingTemplate);
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should add a buidling template parking",
        async (done) => {
            let buidlingTemplate = new PlayerBuilding(testerId, "parking", 300, true);
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
        "should add a buidling player classroom and a building player parking",
        async (done) => {
            let response = await get("/getAllBuildingTemplates", {});
            let classroom = response.body.filter((building: PlayerBuilding) => building.name == "classroom");
            let parking = response.body.filter((building: PlayerBuilding) => building.name == "parking");
            let classroomPlayer = new PlayerBuilding(playerId, classroom[0].name, classroom[0].price);
            let parkingPlayer = new PlayerBuilding(playerId, parking[0].name, parking[0].price);
            response = await post("/savePlayerBuilding", classroomPlayer);
            expect(response.status).toEqual(200);
            response = await post("/savePlayerBuilding", parkingPlayer);
            expect(response.status).toEqual(200);
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
        "should add mutators incReputation, decReputation, incBudget and decBudget",
        async (done) => {
            let incReputationMutator = new Mutator("incReputation", reputationId, 5);
            let response = await post("/saveMutator", incReputationMutator);
            expect(response.status).toEqual(200);
            console.log("incReputation", response.body);

            let decReputationMutator = new Mutator("decReputation", reputationId, -5);
            response = await post("/saveMutator", decReputationMutator);
            expect(response.status).toEqual(200);
            console.log("decReputation", response.body);

            let incBudgetMutator = new Mutator("incBudget", budgetId, 100);
            response = await post("/saveMutator", incBudgetMutator);
            expect(response.status).toEqual(200);
            console.log("incBudget", response.body);

            let decBudgetMutator = new Mutator("decBudget", budgetId, -100);
            response = await post("/saveMutator", decBudgetMutator);
            expect(response.status).toEqual(200);
            console.log("decBudget", response.body);

            done();
        }
    );
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