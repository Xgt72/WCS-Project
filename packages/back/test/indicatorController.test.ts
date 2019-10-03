import "reflect-metadata";
import request from 'supertest';
import { Indicator } from "../src/entities/Indicator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import {app, server} from "../src/app";
let connection:Connection = null;


describe('Indicator', () => {

    afterAll( async(done) => {
        connection.close();
        server.close();
        done();
    })

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        done();
    });

    test(
        "should save one indicator",
        async (done) => {
            const ind =  new Indicator("wilder", 4, 1000)
            const response = await post("/saveIndicator",ind);
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(ind.name);
            expect(response.body.player_id).toEqual(ind.player_id);
            expect(response.body.value).toEqual(ind.value);
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