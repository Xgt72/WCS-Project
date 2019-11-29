import "reflect-metadata";
import request from 'supertest';
import { Player } from "../src/entities/Player";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
let connection: Connection = null;

describe('Player', () => {

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
        "should save one player",
        async (done) => {
            const player = new Player("Sharky", "sharky@gmail.fr", "123456");
            const response = await post("/savePlayer", player);
            expect(response.status).toBe(200);
            expect(response.body.playerName).toEqual(player.playerName);
            done();
        }
    );


    test(
        "should return at least one player",
        async (done) => {
            const response = await get("/getAllPlayers");
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return player by ID",
        async (done) => {
            let player = new Player("ObiWan", "lightforce@gmail.fr", "luke");
            let response = await post("/savePlayer", player);
            player = response.body;
            response = await get("/getPlayerById/" + player.id);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(player);
            done();
        }
    );

    test(
        "should return player by email",
        async (done) => {
            let player = new Player("Dark Vader", "darkforce@gmail.fr", "sith");
            let response = await post("/savePlayer", player);
            player = response.body;
            response = await post("/getPlayerByEmail", {email: player.email});
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(player);
            done();
        }
    );

    test(
        "should update one player",
        async (done) => {
            const player = new Player("wilderTester", "wilder@gmail.fr", "the wild code school");
            let response = await post("/updatePlayer", { id: 1, ...player });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ id: 1, ...player });
            done();
        }
    );

    test(
        "should delete one indicator",
        async (done) => {
            let response = await deletePlayer("/deletePlayer/2");
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

export function deletePlayer(url: string) {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}