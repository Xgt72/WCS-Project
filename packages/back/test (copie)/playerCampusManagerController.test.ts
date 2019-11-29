import "reflect-metadata";
import request from 'supertest';
import { PlayerCampusManager } from "../src/entities/PlayerCampusManager";
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { REPUTATION, BUDGET } from "../src/constants";


let connection: Connection = null;
let lastId = 1;

describe('Player Campus Manager', () => {

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
        "should save one player campus manager",
        async (done) => {
            const pCampusManager = new PlayerCampusManager(1, "Maxime", 900);
            pCampusManager.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];

            const response = await post("/savePlayerCampusManager", pCampusManager);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(pCampusManager.player_id);
            expect(response.body.name).toEqual(pCampusManager.name);
            expect(response.body.price).toEqual(pCampusManager.price);
            done();
        }
    );

    test(
        "should return at least one player campus manager",
        async (done) => {
            const response = await get("/getAllPlayersCampusManagers");
            expect(response.status).toBe(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return one player campus manager",
        async (done) => {
            let pCampusManager = new PlayerCampusManager(2, "Leila", 900);
            pCampusManager.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];

            let response = await post("/savePlayerCampusManager", pCampusManager);
            pCampusManager = response.body;
            response = await get("/getPlayerCampusManagerById/" + pCampusManager.id);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(pCampusManager);
            done();
        }
    );

    test(
        "should return player campus managers by player ID",
        async (done) => {
            let pCampusManager = new PlayerCampusManager(1, "Obiwan", 550);
            pCampusManager.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];

            let response = await post("/savePlayerCampusManager", pCampusManager);
            pCampusManager = response.body;
            lastId = pCampusManager.id;
            response = await get("/getOnePlayerCampusManagers/" + pCampusManager.player_id);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should update one player campus manager",
        async (done) => {
            const pCampusManager = new PlayerCampusManager(4, "Luke", 280);

            let response = await post("/updatePlayerCampusManager", { id: 1, ...pCampusManager });
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.player_id).toEqual(pCampusManager.player_id);
            expect(response.body.name).toEqual(pCampusManager.name);
            expect(response.body.price).toEqual(pCampusManager.price);;
            done();
        }
    );

    test(
        "should delete one player campus manager",
        async (done) => {
            let response = await deletePlayerCampusManager("/deletePlayerCampusManager/" + lastId);
            expect(response.status).toEqual(200);
            done();
        }
    );
});

export function get(url: string) {
    const httpRequest = request(app).get(url);
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

export function deletePlayerCampusManager(url: string) {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}