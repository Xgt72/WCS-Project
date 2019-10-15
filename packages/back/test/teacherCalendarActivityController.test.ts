import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";
import { Mutator } from "../src/entities/Mutator";
let connection: Connection = null;

describe('Teacher Calendar', () => {

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
        "should save one activity in teacher calendar",
        async (done) => {
            const teacherActivity = new TeacherActivitiesCalendar(1, 1, false, true, 1);
            teacherActivity.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 1, -100)
            ];
            const response = await post("/saveTeacherActivity", teacherActivity);
            expect(response.status).toBe(200);
            // expect(response.body).toEqual("coucou");
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

export function deleteTeacherActivity(url: string, body: any) {
    const httpRequest = request(app).delete(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}