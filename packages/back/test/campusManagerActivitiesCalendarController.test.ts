import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { Mutator } from "../src/entities/Mutator";
let connection: Connection = null;
let campusManagerActivityCalendarId: number = null;

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
        "should save one activity in campus manager calendar",
        async (done) => {
            const campusManagerActivity = new CampusManagerActivitiesCalendar(1, 1, false, true, 1);
            campusManagerActivity.mutators = [
                new Mutator("incReputation", 1, 5),
                new Mutator("decBudget", 2, -100)
            ];
            const response = await post("/saveCampusManagerActivity", campusManagerActivity);
            campusManagerActivityCalendarId = response.body.id;
            expect(response.status).toBe(200);
            expect(response.body.campus_manager_id).toEqual(1);
            expect(response.body.activity_id).toEqual(1);
            expect(response.body.morning).toEqual(false);
            expect(response.body.afternoon).toEqual(true);
            expect(response.body.day).toEqual(1);
            expect(parseInt(response.body.mutators.length)).toBeGreaterThan(1);
            done();
        }
    );

    test(
        "should return at least one campus manager activity calendar",
        async (done) => {
            let response = await get("/getAllCampusManagersActivitiesCalendar", {});
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return campus manager activity calendar by ID",
        async (done) => {
            let response = await get("/getCampusManagerActivityCalendarById", {id: campusManagerActivityCalendarId});
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(campusManagerActivityCalendarId);
            done();
        }
    );

    test(
        "should return campus manager activities calendar by campus manager ID",
        async (done) => {
            let response = await get("/getCampusManagerActivitiesCalendarByCampusManagerId", {campusManagerId: 1});
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should update a campus manager activity calendar",
        async (done) => {
            let campusManagerActivityCalendar = new CampusManagerActivitiesCalendar(2, 1, true, false, 2);
            let response = await post("/updateCampusManagerActivityCalendar", {id: 1, ...campusManagerActivityCalendar});
            expect(response.status).toEqual(200);
            expect(response.body.day).toEqual(2);
            expect(response.body.afternoon).toEqual(false);
            expect(response.body.morning).toEqual(true);
            done();
        }
    );

    test(
        "should delete one campus manager activity calendar",
        async (done) => {
            let response = await deleteCampusManagerActivity("/deleteCampusManagerAcitvityCalendar", {id: 1});
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

export function deleteCampusManagerActivity(url: string, body: any) {
    const httpRequest = request(app).delete(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}