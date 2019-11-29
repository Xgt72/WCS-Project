import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { campusManagerActivitiesTemplates, indicatorsTemplates } from "../src/models/Templates";
import { postWithToken } from "./requestFunctions";


let connection: Connection = null;
let playerId: number = 0;
let campusManagerId: number = 0;
let playerToken: string = null;

describe('Campus manager calendar', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        process.env.TOKEN_SECRET = "ghtyuririigjjhlmmqqkkdddgfzrapmmknv";

        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates);

        // create the player
        response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });
        playerId = response.body.player.id;

        // login the player
        let loginResponse = await postWithToken("/api/player/login", { email: "sharky@gmail.fr", password: "123456" });
        playerToken = loginResponse.header['auth-token'];

        // hire one campus manager for the player
        response = await postWithToken("/hireCampusManager", { player_id: playerId, campusManagerName: "Link" }, playerToken);
        campusManagerId = response.body.campusManager.id;

        // create activities template
        response = await postWithToken("/saveAllActivities", campusManagerActivitiesTemplates, playerToken);

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should add activities to the campus manager calendar",
        async (done) => {
            let activitiesCalendar = [
                new CampusManagerActivitiesCalendar(campusManagerId, 1, true, false, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 2, false, true, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 3, true, false, 2)
            ];

            let response = await postWithToken(
                "/addActivitiesInCampusManagerCalendar",
                {
                    campus_manager_id: campusManagerId,
                    activities: activitiesCalendar
                },
                playerToken
            );
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toEqual(3);

            done();
        }
    );
});