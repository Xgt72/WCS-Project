import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";
import { CampusManagerActivitiesCalendar } from "../src/entities/CampusManagerActivitiesCalendar";
import { classroomTemplate, parkingTemplate, campusManagerActivitiesTemplates, teacherActivitiesTemplates, indicatorsTemplates } from "../src/models/Templates";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";
import { getWithToken, postWithToken } from "./requestFunctions";

let connection: Connection = null;
let testerId: number = 0;
let reputationId: number = 0;
let budgetId: number = 0;
let campusManagerId: number = 0;
let teacherId: number = 0;
let playerToken: string = null;

describe('doCycle', () => {
    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        process.env.TOKEN_SECRET = "ghtyuririigjjhlmmqqkkdddgfzrapmmknv";

        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates, );

        // create the player
        response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });
        testerId = response.body.player.id;

        // login the player
        let loginResponse = await postWithToken("/api/player/login", { email: "sharky@gmail.fr", password: "123456" });
        playerToken = loginResponse.header['auth-token'];

        // get reputation indicator of the player
        response = await getWithToken("/getAllIndicatorsByPlayerIdAndName/" + testerId + "/" + REPUTATION, playerToken);
        reputationId = response.body.id;

        // get budget indicator of the player
        response = await getWithToken("/getAllIndicatorsByPlayerIdAndName/" + testerId + "/" + BUDGET, playerToken);
        budgetId = response.body.id;

        // create 2 building templates
        response = await postWithToken("/savePlayerBuilding", classroomTemplate, playerToken);
        response = await postWithToken("/savePlayerBuilding", parkingTemplate, playerToken);

        // buy 2 buildings for the player Tester
        response = await postWithToken("/buyBuilding", { player_id: testerId, building_template_id: 1 }, playerToken);
        response = await postWithToken("/buyBuilding", { player_id: testerId, building_template_id: 2 }, playerToken);

        // hire one teacher and one campus manager for the player Tester
        response = await postWithToken("/hireTeacher", { player_id: testerId, teacherName: "Onizuka" }, playerToken);
        teacherId = response.body.teacher.id;

        response = await postWithToken("/hireCampusManager", { player_id: testerId, campusManagerName: "Link" }, playerToken);
        campusManagerId = response.body.campusManager.id;

        // create activities template
        response = await postWithToken("/saveAllActivities", campusManagerActivitiesTemplates, playerToken);
        response = await postWithToken("/saveAllActivities", teacherActivitiesTemplates, playerToken);

        // add activities into the teacher calendar
        let teacherActivities = [
            new TeacherActivitiesCalendar(teacherId, 8, true, false, 1),
            new TeacherActivitiesCalendar(teacherId, 9, false, true, 2),
            new TeacherActivitiesCalendar(teacherId, 10, true, false, 2)
        ];
        response = await postWithToken(
            "/addActivitiesInTeacherCalendar",
            {
                teacher_id: teacherId,
                activities: teacherActivities
            },
            playerToken
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
        response = await postWithToken(
            "/addActivitiesInCampusManagerCalendar",
            {
                campus_manager_id: campusManagerId,
                activities: campusManagerActivities
            },
            playerToken
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
            let response = await getWithToken("/doCycle/" + testerId, playerToken);
            expect(response.status).toEqual(200);
            expect(parseFloat((response.body[0].value).toFixed(1))).toEqual(46.9);
            expect(parseInt(response.body[1].value)).toEqual(1650);

            response = await getWithToken("/getPlayerById/" + testerId, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.cyclesNumber).toEqual(1);

            done();
        }
    );

    test(
        "should do 10 cycles",
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
            for (let i = 0; i < 10; i++) {
                let response = await postWithToken(
                    "/addActivitiesInCampusManagerCalendar",
                    {
                        campus_manager_id: campusManagerId,
                        activities: campusManagerActivities
                    },
                    playerToken
                );

                response = await getWithToken("/doCycle/" + testerId, playerToken);
            }

            let response = await getWithToken("/getPlayerById/" + testerId, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.cyclesNumber).toEqual(11);

            done();
        }
    );

    test(
        "should do 10 more cycles",
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
            for (let i = 0; i < 9; i++) {
                let response = await postWithToken(
                    "/addActivitiesInCampusManagerCalendar",
                    {
                        campus_manager_id: campusManagerId,
                        activities: campusManagerActivities
                    },
                    playerToken
                );

                response = await getWithToken("/doCycle/" + testerId, playerToken);
            }

            let response = await getWithToken("/getPlayerById/" + testerId, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.cyclesNumber).toEqual(20);

            response = await postWithToken(
                "/addActivitiesInCampusManagerCalendar",
                {
                    campus_manager_id: campusManagerId,
                    activities: campusManagerActivities
                },
                playerToken
            );

            response = await getWithToken("/doCycle/" + testerId, playerToken);
            expect(response.status).toEqual(200);
            expect(parseFloat((response.body[0].value).toFixed(1))).toEqual(350.9);
            expect(parseInt(response.body[1].value)).toEqual(-35350);
            expect(response.body[2].value).toBeGreaterThan(0);
            expect(response.body[3].value).toBeGreaterThan(0);
            
            response = await getWithToken("/getPlayerById/" + testerId, playerToken);
            expect(response.body.cyclesNumber).toEqual(1);

            done();
        }
    );
});