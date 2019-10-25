import "reflect-metadata";
import request from 'supertest';
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { Indicator } from "../src/entities/Indicator";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { classroomTemplate, parkingTemplate, campusManagerActivitiesTemplates, teacherActivitiesTemplates, indicatorsTemplates } from "../src/models/Templates";

let connection: Connection = null;
let testerId: number = 0;
let reputationId: number = 0;
let budgetId: number = 0;
let campusManagerId: number = 0;
let teacherId: number = 0;

describe('doCycle', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create the indicators templates
        let response = await post("/saveAllIndicators", indicatorsTemplates);

        // create the player
        response = await post("/createPlayer", { player_name: "Sharky" });
        testerId = response.body.player.id;

        // get reputation indicator of the player
        response = await get("/getAllIndicatorsByPlayerIdAndName", { player_id: testerId, indicator_name: "reputation" });
        reputationId = response.body.id;

        // get budget indicator of the player
        response = await get("/getAllIndicatorsByPlayerIdAndName", { player_id: testerId, indicator_name: "budget" });
        budgetId = response.body.id;

        // create 2 building templates
        response = await post("/savePlayerBuilding", classroomTemplate);
        response = await post("/savePlayerBuilding", parkingTemplate);

        // buy 2 buildings for the player Tester
        response = await post("/buyBuilding", { player_id: testerId, building_template_id: 1 });
        response = await post("/buyBuilding", { player_id: testerId, building_template_id: 2 });

        // hire one teacher and one campus manager for the player Tester
        response = await post("/hireTeacher", { player_id: testerId, teacherName: "Onizuka" });
        teacherId = response.body.teacher.id;

        response = await post("/hireCampusManager", { player_id: testerId, campusManagerName: "Link" });
        campusManagerId = response.body.campusManager.id;

        // create activities template
        response = await post("/saveAllActivities", campusManagerActivitiesTemplates);
        response = await post("/saveAllActivities", teacherActivitiesTemplates);

        // add activities into the teacher calendar
        let teacherActivities = [
            new TeacherActivitiesCalendar(teacherId, 8, true, false, 1),
            new TeacherActivitiesCalendar(teacherId, 9, false, true, 2),
            new TeacherActivitiesCalendar(teacherId, 10, true, false, 2)
        ];
        response = await post(
            "/addActivitiesInTeacherCalendar",
            {
                teacher_id: teacherId,
                activities: teacherActivities
            }
        );

        // add activities into the campus manager calendar
        let campusManagerActivities = [
            new CampusManagerActivitiesCalendar(campusManagerId, 7, true, false, 1),
            new CampusManagerActivitiesCalendar(campusManagerId, 5, false, true, 1),
            new CampusManagerActivitiesCalendar(campusManagerId, 7, true, false, 2),
            new CampusManagerActivitiesCalendar(campusManagerId, 3, false, true, 2),
            new CampusManagerActivitiesCalendar(campusManagerId, 7, true, false, 3),
            new CampusManagerActivitiesCalendar(campusManagerId, 6, false, true, 3),
            new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 4),
            new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 4),
            new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 5),
            new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 5)

        ];
        response = await post(
            "/addActivitiesInCampusManagerCalendar",
            {
                campus_manager_id: campusManagerId,
                activities: campusManagerActivities
            }
        );

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should do a cycle",
        async (done) => {
            let response = await get("/doCycle", { player_id: testerId });
            expect(response.status).toEqual(200);
            expect(parseFloat((response.body[0].value).toFixed(1))).toEqual(46.9);
            expect(parseInt(response.body[1].value)).toEqual(2700);
            done();
        }
    );

    test(
        "should do 20 cycles",
        async (done) => {
            let campusManagerActivities = [
                new CampusManagerActivitiesCalendar(campusManagerId, 7, true, false, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 5, false, true, 1),
                new CampusManagerActivitiesCalendar(campusManagerId, 7, true, false, 2),
                new CampusManagerActivitiesCalendar(campusManagerId, 3, false, true, 2),
                new CampusManagerActivitiesCalendar(campusManagerId, 1, true, false, 3),
                new CampusManagerActivitiesCalendar(campusManagerId, 6, false, true, 3),
                new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 4),
                new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 4),
                new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 5),
                new CampusManagerActivitiesCalendar(campusManagerId, 7, false, true, 5)
    
            ];
            let response = await post(
                "/addActivitiesInCampusManagerCalendar",
                {
                    campus_manager_id: campusManagerId,
                    activities: campusManagerActivities
                }
            );

            response = await get("/doCycle", { player_id: testerId });
            expect(response.status).toEqual(200);
            expect(parseFloat((response.body[0].value).toFixed(1))).toEqual(62.1);
            expect(parseInt(response.body[1].value)).toEqual(1810);
            // expect(response.body).toEqual("coucou");
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