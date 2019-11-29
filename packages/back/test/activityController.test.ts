import "reflect-metadata";
import { Activity } from "../src/entities/Activity";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { Mutator } from "../src/entities/Mutator";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";
import { indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerToken: string = null;

describe('Activity', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        process.env.TOKEN_SECRET = "ghtyuririigjjhlmmqqkkdddgfzrapmmknv";
        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates, );

        // create the player
        response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });

        // login the player
        let loginResponse = await postWithToken("/api/player/login", { email: "sharky@gmail.fr", password: "123456" });
        playerToken = loginResponse.header['auth-token'];

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

            const response = await postWithToken("/saveActivity", activity, playerToken);
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

            const response = await postWithToken("/saveAllActivities", [activity, activity, activity, activity], playerToken);
            expect(response.status).toBe(200);
            expect(parseInt(response.body.length)).toEqual(4);
            done();
        }
    );


    test(
        "should return at least one activity",
        async (done) => {
            const response = await getWithToken("/getAllActivities", playerToken);
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

            let response = await postWithToken("/saveActivity", activity, playerToken);
            activity = response.body;
            response = await getWithToken("/getActivityById/" + activity.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(activity);
            done();
        }
    );

    test(
        "should update one activity",
        async (done) => {
            const activity = new Activity("Buy Advertising", 350, "75FF05");
            let response = await postWithToken("/updateActivity", { id: 1, ...activity }, playerToken);
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
            let response = await deleteWithToken("/deleteActivity/1", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});