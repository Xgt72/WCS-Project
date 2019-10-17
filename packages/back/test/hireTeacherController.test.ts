import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Indicator } from "../src/entities/Indicator";
import { Player } from "../src/entities/Player";
import { PlayerTeacher } from "../src/entities/PlayerTeacher";

let connection: Connection = null;
let playerId: number = null;
let budgetIndicatorId: number = null;

describe('Hire a teacher', () => {

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
            done();
        }
    );

    test(
        "should add indicators reputation and budget",
        async (done) => {
            let reputationIndicator = new Indicator("reputation", playerId, 30);
            let response = await post("/saveIndicator", reputationIndicator);
            expect(response.status).toEqual(200);

            let budgetIndicator = new Indicator("budget", playerId, 5000);
            response = await post("/saveIndicator", budgetIndicator);
            budgetIndicatorId = response.body.id;
            expect(response.status).toEqual(200);
            done();
        }
    );

    test("should hire a teacher for a player",
    async (done) => {
        let response = await post("/hireTeacher", {playerId: playerId, teacherName: "Xavier"});
        expect(response.status).toEqual(200);
        done();
    });

    test("should not hire a teacher for a player because the budget is not enought",
    async (done) => {
        let updatedIndicator = await post("/updateIndicator", {id: budgetIndicatorId, value: 100});
        expect(updatedIndicator.status).toEqual(200);
        let response = await post("/hireTeacher", {playerId: playerId, teacherName: "Xavier"});
        expect(response.status).toEqual(200);
        expect(response.body).toEqual("You can not hire one more teacher or you do not have the necessary budget.");
        done();
    });

    test("should not hire a teacher for a player because he have already 2 teachers",
    async (done) => {
        let updatedIndicator = await post("/updateIndicator", {id: budgetIndicatorId, value: 1000});
        expect(updatedIndicator.status).toEqual(200);

        let response = await post("/hireTeacher", {playerId: playerId, teacherName: "Nicolas"});
        expect(response.status).toEqual(200);
        
        response = await post("/hireTeacher", {playerId: playerId, teacherName: "Victor"});
        expect(response.status).toEqual(200);
        expect(response.body).toEqual("You can not hire one more teacher or you do not have the necessary budget.");
        done();
    });
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