import "reflect-metadata";
import request from 'supertest';
import { Indicator } from "../src/entities/Indicator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";


let connection: Connection = null;


describe('Indicator', () => {

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
        "should save one indicator",
        async (done) => {
            const ind = new Indicator("wilder", 4, 1000);
            const response = await post("/saveIndicator", ind);
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(ind.name);
            expect(response.body.player_id).toEqual(ind.player_id);
            expect(response.body.value).toEqual(ind.value);
            done();
        }
    );

    test(
        "should save two indicators",
        async (done) => {
            const indOne = new Indicator(REPUTATION, 4, 1000);
            const indTwo = new Indicator(BUDGET, 5, 20);
            const response = await post("/saveAllIndicators", [indOne, indTwo]);
            expect(response.status).toBe(200);
            expect(parseInt(response.body.length)).toEqual(2);
            done();
        }
    );


    test(
        "should return at least one indicator",
        async (done) => {
            const response = await get("/getAllIndicators", {});
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return indicator by ID",
        async (done) => {
            let ind = new Indicator("wilder", 4, 1000);
            let response = await post("/saveIndicator", ind);
            ind = response.body;
            response = await get("/getIndicatorById", { id: ind.id });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(ind);
            done();
        }
    );

    test(
        "should return player indicators by player ID",
        async (done) => {
            let ind = new Indicator("wilder", 5, 1000);
            let response = await post("/saveIndicator", ind);
            ind = response.body;
            response = await get("/getIndicatorsByPlayerId", { player_id: ind.player_id });
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return indicator by player ID and indicator name",
        async (done) => {
            let response = await get("/getAllIndicatorsByPlayerIdAndName", {player_id: 5, indicator_name: "wilder"});
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual("wilder");
            expect(response.body.player_id).toEqual(5);
            expect(response.body.value).toEqual(1000);
            
            done();
        }
    )

    test(
        "should update one indicator",
        async (done) => {
            const ind = new Indicator("wilderTest", 3, 1000);
            let response = await post("/updateIndicator", { id: 1, ...ind });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ id: 1, ...ind });
            done();
        }
    );

    test(
        "should delete one indicator",
        async (done) => {
            let response = await deleteIndicator("/deleteIndicator", { id: 2 });
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

export function deleteIndicator(url: string, body: any) {
    const httpRequest = request(app).delete(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}