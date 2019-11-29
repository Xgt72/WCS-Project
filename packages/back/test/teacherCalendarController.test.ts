import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { TeacherActivitiesCalendar } from "../src/entities/TeacherActivitiesCalendar";
import { teacherActivitiesTemplates, indicatorsTemplates } from "../src/models/Templates";
import { postWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerId: number = 0;
let teacherId: number = 0;
let playerToken: string = null;

describe('Teacher calendar', () => {

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

        // hire one teacher for the player
        response = await postWithToken("/hireTeacher", { player_id: playerId, teacherName: "Zelda" }, playerToken);
        teacherId = response.body.teacher.id;

        // create activities template
        response = await postWithToken("/saveAllActivities", teacherActivitiesTemplates, playerToken);

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
            let activitiesCalendar = [
                new TeacherActivitiesCalendar(teacherId, 1, true, false, 1),
                new TeacherActivitiesCalendar(teacherId, 2, false, true, 1),
                new TeacherActivitiesCalendar(teacherId, 3, true, false, 2)
            ];

            let response = await postWithToken(
                "/addActivitiesInTeacherCalendar",
                {
                    teacher_id: teacherId,
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