import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";
import { Indicator } from "../src/entities/Indicator";
import { activitiesTemplate } from "../src/models/Templates";

let connection: Connection = null;
let playerId: number = 0;
let teacherId: number = 0;
let budgetId: number = 0;

describe('Teacher calendar', () => {

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
        response = await post("/hireTeacher", { player_id: playerId, teacherName: "Zelda" });
        teacherId = response.body.teacher.id;

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
        "should add activities to the teacher calendar",
        async (done) => {
            let activities = [
                new TeacherActivitiesCalendar(teacherId, 1, true, false, 1),
                new TeacherActivitiesCalendar(teacherId, 2, false, true, 1),
                new TeacherActivitiesCalendar(teacherId, 3, true, false, 2)
            ];

            let response = await post(
                "/addActivitiesInTeacherCalendar",
                {
                    teacher_id: teacherId,
                    activities: activities
                }
            );
            expect(response.status).toEqual(200);

            done();
        }
    );

    test(
        "should update activities in the teacher calendar",
        async (done) => {
            let activities = [
                new TeacherActivitiesCalendar(teacherId, 1, false, true, 1),
                new TeacherActivitiesCalendar(teacherId, 2, true, false, 1),
                new TeacherActivitiesCalendar(teacherId, 3, false, true, 2)
            ];

            let response = await post(
                "/addActivitiesInTeacherCalendar",
                {
                    teacher_id: teacherId,
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