import "reflect-metadata";
import { PlayerTeacher } from "../src/entities/PlayerTeacher";
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { REPUTATION, BUDGET } from "../src/constants";
import { indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let lastId = 1;
let playerToken: string = null;

describe('Player Teacher', () => {

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

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should save one player teacher",
        async (done) => {
            const pTeacher = new PlayerTeacher(1, "Nicolas", 900);
            pTeacher.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            const response = await postWithToken("/savePlayerTeacher", pTeacher, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(pTeacher.player_id);
            expect(response.body.name).toEqual(pTeacher.name);
            expect(response.body.price).toEqual(pTeacher.price);
            done();
        }
    );

    test(
        "should return at least one player teacher",
        async (done) => {
            const response = await getWithToken("/getAllPlayersTeachers", playerToken);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return one player teacher",
        async (done) => {
            let pTeacher = new PlayerTeacher(2, "Victor", 900);
            pTeacher.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            let response = await postWithToken("/savePlayerTeacher", pTeacher, playerToken);
            pTeacher = response.body;
            response = await getWithToken("/getPlayerTeacherById/" + pTeacher.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(pTeacher);
            done();
        }
    );

    test(
        "should return player teachers by player ID",
        async (done) => {
            let pTeacher = new PlayerTeacher(1, "Xavier", 550);
            pTeacher.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];

            let response = await postWithToken("/savePlayerTeacher", pTeacher, playerToken);
            pTeacher = response.body;
            lastId = pTeacher.id;
            response = await getWithToken("/getOnePlayerTeachers/" + pTeacher.player_id, playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should update one player teacher",
        async (done) => {
            const pTeacher = new PlayerTeacher(4, "Jean", 280);
            
            let response = await postWithToken("/updatePlayerTeacher", { id: 1, ...pTeacher }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.player_id).toEqual(pTeacher.player_id);
            expect(response.body.name).toEqual(pTeacher.name);
            expect(response.body.price).toEqual(pTeacher.price);
            done();
        }
    );

    test(
        "should delete one player teacher",
        async (done) => {
            let response = await deleteWithToken("/deletePlayerTeacher/" + lastId, playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});