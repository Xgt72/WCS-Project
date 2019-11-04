import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { Indicator } from "../src/entities/Indicator";
import { campusManagerActivitiesTemplates } from "../src/models/Templates";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";


let connection: Connection = null;
let playerId: number = 0;
let campusManagerId: number = 0;
let reputation: Indicator = null;
let budget: number = 0;

describe('Campus manager calendar', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create one player
        let player = new Player("Sharky");
        let response = await post("/savePlayer", player);
        playerId = response.body.id;

        // creation of 2 indicators
        let reputationIndicator = new Indicator(REPUTATION, playerId, 30);
        response = await post("/saveIndicator", reputationIndicator);
        reputation = response.body;

        let budgetIndicator = new Indicator(BUDGET, playerId, 5000);
        response = await post("/saveIndicator", budgetIndicator);
        budget = response.body.id;

        // hire one campus manager for the player
        response = await post("/hireCampusManager", { player_id: playerId, campusManagerName: "Link" });
        campusManagerId = response.body.campusManager.id;

        // create activities template
        response = await post("/saveAllActivities", campusManagerActivitiesTemplates);

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

            let response = await post(
                "/addActivitiesInCampusManagerCalendar",
                {
                    campus_manager_id: campusManagerId,
                    activities: activitiesCalendar
                }
            );
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toEqual(3);

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