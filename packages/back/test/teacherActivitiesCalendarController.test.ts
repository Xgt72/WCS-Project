import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";
import { campusManagerActivitiesTemplates, teacherActivitiesTemplates, indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let teacherActivityCalendarId: number = null;
let playerToken: string = null;

describe('Teacher Calendar', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        process.env.TOKEN_SECRET = "ghtyuririigjjhlmmqqkkdddgfzrapmmknv";

        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates);

        // create the player
        response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });

        // login the player
        let loginResponse = await postWithToken("/api/player/login", { email: "sharky@gmail.fr", password: "123456" });
        playerToken = loginResponse.header['auth-token'];

        // create activities template
        response = await postWithToken("/saveAllActivities", campusManagerActivitiesTemplates, playerToken);
        response = await postWithToken("/saveAllActivities", teacherActivitiesTemplates, playerToken);

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

            const response = await postWithToken("/saveTeacherActivity", teacherActivity, playerToken);
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

            const response = await postWithToken(
                "/saveMultipleActivitiesTeacher",
                { teacher_id: 1, activities: [activityOne, activityTwo] },
                playerToken
            );

            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toEqual(2);

            done();
        }
    );

    test(
        "should return a morning activity",
        async (done) => {
            const response = await getWithToken("/getActivityByTeacherIdByDayByPeriod/1/1/morning", playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.morning).toEqual(true);

            done();
        }
    );

    test(
        "should return an afternoon activity",
        async (done) => {
            const response = await getWithToken("/getActivityByTeacherIdByDayByPeriod/1/1/afternoon", playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.afternoon).toEqual(true);

            done();
        }
    );

    test(
        "should return at least one teacher activity calendar",
        async (done) => {
            let response = await getWithToken("/getAllTeachersActivitiesCalendar", playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return teacher activity calendar by ID",
        async (done) => {
            let response = await getWithToken("/getTeacherActivityCalendarById/" + teacherActivityCalendarId, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(teacherActivityCalendarId);
            done();
        }
    );

    test(
        "should return teacher activities calendar by teacher ID",
        async (done) => {
            let response = await getWithToken("/getTeacherActivitiesCalendarByTeacherId/1", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should update a teacher activity calendar",
        async (done) => {
            let teacherActivityCalendar = new TeacherActivitiesCalendar(2, 1, true, false, 2);
            let response = await postWithToken("/updateTeacherActivityCalendar", { id: 1, ...teacherActivityCalendar }, playerToken);
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
            let response = await deleteWithToken("/deleteTeacherActivityCalendar/1", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});