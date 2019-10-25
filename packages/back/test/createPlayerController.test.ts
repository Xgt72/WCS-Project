import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { indicatorsTemplates } from "../src/models/Templates";

let connection: Connection = null;

describe('Create a new player', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create the indicators templates
        let response = await post("/saveAllIndicators", indicatorsTemplates);

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should create a new player with his indicators",
        async (done) => {
            let response = await post("/createPlayer", { player_name: "Sharky" });
            expect(response.status).toEqual(200);
            expect(response.body.player.playerName).toEqual("Sharky");
            expect(parseInt(response.body.indicators.length)).toEqual(5);

            done();
        }
    );

});

export function post(url: string, body: any) {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}