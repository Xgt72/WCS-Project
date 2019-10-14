import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { PlayerBuilding } from "../src/entities/PlayerBuilding";
import { Indicator } from "../src/entities/Indicator";
import { Mutator } from "../src/entities/Mutator";
let connection: Connection = null;
let playerId: number = null;
let reputationId: number = null;
let budgetId: number = null;

describe('buy a building', () => {

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
        "should create a player Sharky",
        async (done) => {
            let player = new Player("Sharky");
            let response = await post("/savePlayer", player);
            expect(response.status).toEqual(200);
            playerId = response.body.id;
            expect(response.body.playerName).toEqual(player.playerName);
            done();
        }
    );

    test(
        "should add indicators reputation and budget",
        async (done) => {
            let reputationIndicator = new Indicator("reputation", playerId, 30);
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
        "should add a buidling template classroom and parking",
        async (done) => {
            let buidlingTemplateClass = new PlayerBuilding(0, "classroom", 500, true);
            buidlingTemplateClass.mutators = [
                new Mutator("incReputation", reputationId, 5),
                new Mutator("decBudget", budgetId, -100)
            ];
            let response = await post("/savePlayerBuilding", buidlingTemplateClass);
            expect(response.status).toEqual(200);

            let buidlingTemplatePark = new PlayerBuilding(0, "parking", 300, true);
            buidlingTemplatePark.mutators = [
                new Mutator("incReputation", reputationId, 2),
                new Mutator("decBudget", budgetId, -50)
            ];
            response = await post("/savePlayerBuilding", buidlingTemplatePark);
            expect(response.status).toEqual(200);

            done();
        }
    );

    test(
        "should buy a classroom by Sharky",
        async (done) => {
            let response = await post("/buyBuilding", {playerId: playerId, bTemplateName: "classroom"});
            expect(response.status).toEqual(200);
            expect(response.body.budget.value).toEqual(4500);
            expect(response.body.building.player_id).toEqual(playerId);
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