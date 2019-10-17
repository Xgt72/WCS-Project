import "reflect-metadata";
import request from 'supertest';
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { Indicator } from "../src/entities/Indicator";
import { classroomTemplate, parkingTemplate } from "../src/models/Templates";

let connection: Connection = null;
let testerId: number = 0;
let reputationId: number = 0;
let budgetId: number = 0;

describe('doCycle', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        let player = new Player("Tester");
        let response = await post("/savePlayer", player);
        testerId = response.body.id;

        let reputationIndicator = new Indicator("reputation", testerId, 50);
        response = await post("/saveIndicator", reputationIndicator);
        reputationId = response.body.id;
    
        let budgetIndicator = new Indicator("budget", testerId, 5000);
        response = await post("/saveIndicator", budgetIndicator);
        budgetId = response.body.id;

        response = await post("/savePlayerBuilding", classroomTemplate);
        response = await post("/savePlayerBuilding", parkingTemplate);

        response = await post("/buyBuilding", { player_id: testerId, building_template_id: 1 });
        response = await post("/buyBuilding", { player_id: testerId, building_template_id: 2 });

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should do a cycle",
        async (done) => {
            let response = await get("/doCycle", { player_id: testerId });
            expect(response.status).toEqual(200);
            expect(parseInt(response.body[0].value)).toEqual(57);
            expect(parseInt(response.body[1].value)).toEqual(4050);
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