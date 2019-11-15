import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";

let connection: Connection = null;
let teacherActivityCalendarId: number = null;

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

            const response = await post("/saveTeacherActivity", teacherActivity);
            teacherActivityCalendarId = response.body.id;
            expect(response.status).toBe(200);
            expect(response.body.teacher_id).toEqual(1);
            expect(response.body.activity_id).toEqual(1);
            expect(response.body.morning).toEqual(false);
            expect(response.body.afternoon).toEqual(true);
            expect(response.body.day).toEqual(1);

            done();
        }
    );

    test(
        "should save two activities in campus manager calendar",
        async (done) => {
            const activityOne = new TeacherActivitiesCalendar(1, 1, true, false, 1);
            const activityTwo = new TeacherActivitiesCalendar(1, 1, false, true, 1);

            const response = await post(
                "/saveMultipleActivitiesTeacher",
                { teacher_id: 1, activities: [activityOne, activityTwo] }
            );

            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toEqual(2);

            done();
        }
    );

    test(
        "should return a morning activity",
        async (done) => {
            const response = await get("/getActivityByTeacherIdByDayByPeriod/1/1/morning");
            expect(response.status).toEqual(200);
            expect(response.body.morning).toEqual(true);

            done();
        }
    );

    test(
        "should return an afternoon activity",
        async (done) => {
            const response = await get("/getActivityByTeacherIdByDayByPeriod/1/1/afternoon");
            expect(response.status).toEqual(200);
            expect(response.body.afternoon).toEqual(true);

            done();
        }
    );

    test(
        "should return at least one teacher activity calendar",
        async (done) => {
            let response = await get("/getAllTeachersActivitiesCalendar");
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return teacher activity calendar by ID",
        async (done) => {
            let response = await get("/getTeacherActivityCalendarById/" + teacherActivityCalendarId);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(teacherActivityCalendarId);
            done();
        }
    );

    test(
        "should return teacher activities calendar by teacher ID",
        async (done) => {
            let response = await get("/getTeacherActivitiesCalendarByTeacherId/1");
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should update a teacher activity calendar",
        async (done) => {
            let teacherActivityCalendar = new TeacherActivitiesCalendar(2, 1, true, false, 2);
            let response = await post("/updateTeacherActivityCalendar", {id: 1, ...teacherActivityCalendar});
            expect(response.status).toEqual(200);
            expect(response.body.day).toEqual(2);
            expect(response.body.afternoon).toEqual(false);
            expect(response.body.morning).toEqual(true);
            done();
        }
    );

    test(
        "should delete one teacher activity calendar",
        async (done) => {
            let response = await deleteTeacherActivity("/deleteTeacherAcitvityCalendar/1");
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

export function deleteTeacherActivity(url: string) {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}