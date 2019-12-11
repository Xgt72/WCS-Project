import "reflect-metadata";
import request from 'supertest';
import { PlayerTeacher } from "../src/entities/PlayerTeacher";
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { REPUTATION, BUDGET } from "../src/constants";

let connection: Connection = null;
let lastId = 1;

describe('Player Teacher', () => {

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
        "should save one player teacher",
        async (done) => {
            const pTeacher = new PlayerTeacher(1, "Nicolas", 900);
            pTeacher.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            const response = await post("/savePlayerTeacher", pTeacher);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(pTeacher.player_id);
            expect(response.body.name).toEqual(pTeacher.name);
            expect(response.body.price).toEqual(pTeacher.price);
            done();
        }
    );

    test(
        "should return at least one player teacher",
        async (done) => {
            const response = await get("/getAllPlayersTeachers");
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return one player teacher",
        async (done) => {
            let pTeacher = new PlayerTeacher(2, "Victor", 900);
            pTeacher.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            let response = await post("/savePlayerTeacher", pTeacher);
            pTeacher = response.body;
            response = await get("/getPlayerTeacherById/" + pTeacher.id);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(pTeacher);
            done();
        }
    );

    test(
        "should return player teachers by player ID",
        async (done) => {
            let pTeacher = new PlayerTeacher(1, "Xavier", 550);
            pTeacher.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            let response = await post("/savePlayerTeacher", pTeacher);
            pTeacher = response.body;
            lastId = pTeacher.id;
            response = await get("/getOnePlayerTeachers/" + pTeacher.player_id);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should update one player teacher",
        async (done) => {
            const pTeacher = new PlayerTeacher(4, "Jean", 280);
            
            let response = await post("/updatePlayerTeacher", { id: 1, ...pTeacher });
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.player_id).toEqual(pTeacher.player_id);
            expect(response.body.name).toEqual(pTeacher.name);
            expect(response.body.price).toEqual(pTeacher.price);
            done();
        }
    );

    test(
        "should delete one player teacher",
        async (done) => {
            let response = await deletePlayerTeacher("/deletePlayerTeacher/" + lastId);
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

export function deletePlayerTeacher(url: string) {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}