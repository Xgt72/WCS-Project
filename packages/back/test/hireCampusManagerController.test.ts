import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Indicator } from "../src/entities/Indicator";
import { Player } from "../src/entities/Player";
import { indicatorsTemplates } from "../src/models/Templates";
import { REPUTATION, BUDGET, STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";



let connection: Connection = null;
let playerId: number = 0;
let budgetIndicatorId: number = 0;

describe('Hire a campus manager', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create the indicators templates
        let response = await post("/saveAllIndicators", indicatorsTemplates);

        // create the player
        response = await post("/createPlayer", { player_name: "Sharky" });
        playerId = response.body.player.id;

        // get reputation indicator of the player
        response = await get("/getAllIndicatorsByPlayerIdAndName", { player_id: playerId, indicator_name: REPUTATION });

        // get budget indicator of the player
        response = await get("/getAllIndicatorsByPlayerIdAndName", { player_id: playerId, indicator_name: BUDGET });
        budgetIndicatorId = response.body.id;

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });


    test("should hire a campus manager for a player",
        async (done) => {
            let response = await post("/hireCampusManager", { player_id: playerId, campusManagerName: "Maxime" });
            expect(response.status).toEqual(200);
            done();
        });

    test("should not hire a campus manager for a player because the budget is not enought",
        async (done) => {
            let updatedIndicator = await post("/updateIndicator", { id: budgetIndicatorId, value: 100 });
            expect(updatedIndicator.status).toEqual(200);

            let response = await post("/hireCampusManager", { player_id: playerId, campusManagerName: "Julien" });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual("You can't hire this campus manager, you don't have the necessary budget.");
            done();
        });

    test("should not hire a campus manager for a player because he have already 2 campus managers",
        async (done) => {
            let updatedIndicator = await post("/updateIndicator", { id: budgetIndicatorId, value: 1000 });
            expect(updatedIndicator.status).toEqual(200);

            let response = await post("/hireCampusManager", { player_id: playerId, campusManagerName: "Marylou" });
            expect(response.status).toEqual(200);

            response = await post("/hireCampusManager", { player_id: playerId, campusManagerName: "Cécile" });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual("You already have two campus managers, you can't hire one more.");
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