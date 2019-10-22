import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { Indicator } from "../src/entities/Indicator";
import { activitiesTemplate } from "../src/models/Templates";

let connection: Connection = null;
let playerId: number = 0;
let campusManagerId: number = 0;
let budgetId: number = 0;

describe('Campus manager calendar', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create one player
        let player = new Player("Sharky");
        let response = await post("/savePlayer", player);
        playerId = response.body.id;
        console.log("Player ID: ", playerId);

        // creation of 2 indicators
        let reputationIndicator = new Indicator("reputation", playerId, 30);
        response = await post("/saveIndicator", reputationIndicator);

        let budgetIndicator = new Indicator("budget", playerId, 5000);
        response = await post("/saveIndicator", budgetIndicator);
        budgetId = response.body.id;

        // hire one campus manager for the player
        response = await post("/hireCampusManager", { playerId: playerId, campusManagerName: "Link" });
        campusManagerId = response.body.campusManager.id;
        console.log("Campus manager ID: ", campusManagerId);

        // create activities template
        response = await post("/saveAllActivities", activitiesTemplate);

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
            let activities = [
                new CampusManagerActivitiesCalendar(campusManagerId, 1, true, false, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 2, false, true, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 3, true, false, 2)
            ];

            let response = await post(
                "/addActivitiesInCampusManagerCalendar",
                {
                    campus_manager_id: campusManagerId,
                    activities: activities
                }
            );
            expect(response.status).toEqual(200);

            done();
        }
    );

    test(
        "shoul update activities in the campus manager calendar",
        async (done) => {
            let activities = [
                new CampusManagerActivitiesCalendar(campusManagerId, 1, false, true, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 2, true, false, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 3, false, true, 2)
            ];

            let response = await post(
                "/addActivitiesInCampusManagerCalendar",
                {
                    campus_manager_id: campusManagerId,
                    activities: activities
                }
            );
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