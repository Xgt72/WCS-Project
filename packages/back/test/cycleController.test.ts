import "reflect-metadata";
import request from 'supertest';
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { Indicator } from "../src/entities/Indicator";
import { classroomTemplate, parkingTemplate, activitiesTemplate } from "../src/models/Templates";

let connection: Connection = null;
let testerId: number = 0;
let reputationId: number = 0;
let budgetId: number = 0;

describe('doCycle', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create a Tester player
        let player = new Player("Tester");
        let response = await post("/savePlayer", player);
        testerId = response.body.id;

        // create reputation and budget indicators for the player Tester
        let reputationIndicator = new Indicator("reputation", testerId, 50);
        response = await post("/saveIndicator", reputationIndicator);
        reputationId = response.body.id;
    
        let budgetIndicator = new Indicator("budget", testerId, 5000);
        response = await post("/saveIndicator", budgetIndicator);
        budgetId = response.body.id;

        // create 2 building templates
        response = await post("/savePlayerBuilding", classroomTemplate);
        response = await post("/savePlayerBuilding", parkingTemplate);

        // buy 2 buildings for the player Tester
        response = await post("/buyBuilding", { player_id: testerId, building_template_id: 1 });
        response = await post("/buyBuilding", { player_id: testerId, building_template_id: 2 });

        // hire one teacher and one campus manager for the player Tester
        response = await post("/hireTeacher", { player_id: testerId,  teacherName: "Onizuka"});
        response = await post("/hireCampusManager", { player_id: testerId,  campusManagerName: "Link"});

        // create activities template
        response = await post("/saveAllActivities", activitiesTemplate);

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
            expect(parseInt(response.body[0].value)).toEqual(62);
            expect(parseInt(response.body[1].value)).toEqual(3750);
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