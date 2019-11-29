import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { campusManagerActivitiesTemplates, teacherActivitiesTemplates, indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let campusManagerActivityCalendarId: number = null;
let playerToken: string = null;

describe('Campus Manager Activities Calendar', () => {

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
        "should save one activity in campus manager calendar",
        async (done) => {
            const campusManagerActivity = new CampusManagerActivitiesCalendar(1, 1, false, true, 2);

            const response = await postWithToken("/saveCampusManagerActivity", campusManagerActivity, playerToken);
            campusManagerActivityCalendarId = response.body.id;
            expect(response.status).toBe(200);
            expect(response.body.campus_manager_id).toEqual(1);
            expect(response.body.activity_id).toEqual(1);
            expect(response.body.morning).toEqual(false);
            expect(response.body.afternoon).toEqual(true);
            expect(response.body.day).toEqual(2);

            done();
        }
    );

    test(
        "should save two activities in campus manager calendar",
        async (done) => {
            const activityOne = new CampusManagerActivitiesCalendar(1, 1, true, false, 1);
            const activityTwo = new CampusManagerActivitiesCalendar(1, 1, false, true, 1);

            const response = await postWithToken(
                "/saveMultipleActivitiesCampusManager",
                { campus_manager_id: 1, activities: [activityOne, activityTwo] },
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
            const response = await getWithToken("/getActivityByCampusManagerIdByDayByPeriod/1/1/morning", playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.morning).toEqual(true);

            done();
        }
    );

    test(
        "should return an afternoon activity",
        async (done) => {
            const response = await getWithToken("/getActivityByCampusManagerIdByDayByPeriod/1/1/afternoon", playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.afternoon).toEqual(true);

            done();
        }
    );

    test(
        "should return at least one campus manager activity calendar",
        async (done) => {
            let response = await getWithToken("/getAllCampusManagersActivitiesCalendar", playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return campus manager activity calendar by ID",
        async (done) => {
            let response = await getWithToken("/getCampusManagerActivityCalendarById/" + campusManagerActivityCalendarId, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(campusManagerActivityCalendarId);
            done();
        }
    );

    test(
        "should return campus manager activities calendar by campus manager ID",
        async (done) => {
            let response = await getWithToken("/getCampusManagerActivitiesCalendarByCampusManagerId/1", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );

    test(
        "should update a campus manager activity calendar",
        async (done) => {
            let campusManagerActivityCalendar = new CampusManagerActivitiesCalendar(2, 1, true, false, 2);
            let response = await postWithToken(
                "/updateCampusManagerActivityCalendar",
                { id: 1, ...campusManagerActivityCalendar },
                playerToken
            );
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
            let response = await deleteWithToken("/deleteCampusManagerActivityCalendar/1", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});