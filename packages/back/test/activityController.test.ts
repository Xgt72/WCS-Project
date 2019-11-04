import "reflect-metadata";
import request from 'supertest';
import { Activity } from "../src/entities/Activity";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Mutator } from "../src/entities/Mutator";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";


let connection: Connection = null;

describe('Activity', () => {

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
        "should save one activity",
        async (done) => {
            const activity = new Activity("Wild Breakfast", 100, "FFB399");
            activity.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            const response = await post("/saveActivity", activity);
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(activity.name);
            expect(response.body.value).toEqual(activity.value);
            expect(response.body.color).toEqual(activity.color);
            done();
        }
    );

    test(
        "should save many activities",
        async (done) => {
            const activity = new Activity("Wild Breakfast", 100, "FFB399");
            activity.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            const response = await post("/saveAllActivities", [activity, activity, activity, activity]);
            expect(response.status).toBe(200);
            expect(parseInt(response.body.length)).toEqual(4);
            done();
        }
    );


    test(
        "should return at least one activity",
        async (done) => {
            const response = await get("/getAllActivities", {});
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return activity by ID",
        async (done) => {
            let activity = new Activity("Organise RNCP", 200, "FFE205");
            activity.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            let response = await post("/saveActivity", activity);
            activity = response.body;
            response = await get("/getActivityById", { id: activity.id });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(activity);
            done();
        }
    );

    test(
        "should update one activity",
        async (done) => {
            const activity = new Activity("Buy Publicities", 350, "75FF05");
            let response = await post("/updateActivity", { id: 1, ...activity });
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.name).toEqual(activity.name);
            expect(response.body.value).toEqual(activity.value);
            expect(response.body.color).toEqual(activity.color);
            done();
        }
    );

    test(
        "should delete one activity",
        async (done) => {
            let response = await deleteActivity("/deleteActivity", { id: 1 });
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

export function deleteActivity(url: string, body: any) {
    const httpRequest = request(app).delete(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}