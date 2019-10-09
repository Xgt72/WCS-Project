import "reflect-metadata";
import request from 'supertest';
import { PlayerBuilding } from "../src/entities/PlayerBuilding";
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
let connection: Connection = null;


describe('Player Building', () => {

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
        "should save one player building",
        async (done) => {
            const pBuilding = new PlayerBuilding(1, "classroom", 1000);
            pBuilding.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 1, -100)
            ];
            const response = await post("/savePlayerBuilding", pBuilding);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(pBuilding.player_id);
            expect(response.body.name).toEqual(pBuilding.name);
            expect(response.body.price).toEqual(pBuilding.price);
            done();
        }
    );

    test(
        "should save two building template",
        async (done) => {
            const buildingOne = new PlayerBuilding(1, "classroom", 1000, true);
            buildingOne.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 1, -100)
            ];
            let response = await post("/savePlayerBuilding", buildingOne);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(buildingOne.player_id);
            expect(response.body.name).toEqual(buildingOne.name);
            expect(response.body.price).toEqual(buildingOne.price);
            expect(response.body.isTemplate).toEqual(buildingOne.isTemplate);

            const buidlingTwo = new PlayerBuilding(1, "parking", 500, true);
            buidlingTwo.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 1, -100)
            ];
            response = await post("/savePlayerBuilding", buidlingTwo);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(buidlingTwo.player_id);
            expect(response.body.name).toEqual(buidlingTwo.name);
            expect(response.body.price).toEqual(buidlingTwo.price);
            expect(response.body.isTemplate).toEqual(buidlingTwo.isTemplate);
            done();
        }
    );

    test(
        "should return at least one player building",
        async (done) => {
            const response = await get("/getAllPlayersBuildings", {});
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return one player building",
        async (done) => {
            let pBuilding = new PlayerBuilding(2, "cafeteria", 500);
            pBuilding.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 1, -100)
            ];
            let response = await post("/savePlayerBuilding", pBuilding);
            pBuilding = response.body;
            response = await get("/getPlayerBuildingById", { id: pBuilding.id });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(pBuilding);
            done();
        }
    );

    test(
        "should return player buildings by player ID",
        async (done) => {
            let pBuilding = new PlayerBuilding(2, "classroom", 1000);
            pBuilding.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 2, -100)
            ];
            let response = await post("/savePlayerBuilding", pBuilding);
            pBuilding = response.body;
            response = await get("/getOnePlayerBuildings", { player_id: pBuilding.player_id });
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return all building templates",
        async (done) => {
            let response = await get("/getAllBuildingTemplates", {});
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(1);
            done();
        }
    );

    test(
        "should update one player building",
        async (done) => {
            const pBuilding = new PlayerBuilding(2, "flatsharing", 580);
            pBuilding.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 2, -100)
            ];
            let response = await post("/updatePlayerBuilding", { id: 1, ...pBuilding });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ id: 1, ...pBuilding });
            done();
        }
    );

    test(
        "should delete one player building",
        async (done) => {
            let response = await deletePlayerBuilding("/deletePlayerBuilding", { id: 2 });
            expect(response.status).toEqual(200);
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

export function deletePlayerBuilding(url: string, body: any) {
    const httpRequest = request(app).delete(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}