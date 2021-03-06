import "reflect-metadata";
import { PlayerCampusManager } from "../src/entities/PlayerCampusManager";
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

describe('Player Campus Manager', () => {

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
        "should save one player campus manager",
        async (done) => {
            const pCampusManager = new PlayerCampusManager(1, "Maxime", 900);
            pCampusManager.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];

            const response = await postWithToken("/savePlayerCampusManager", pCampusManager, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(pCampusManager.player_id);
            expect(response.body.name).toEqual(pCampusManager.name);
            expect(response.body.price).toEqual(pCampusManager.price);
            done();
        }
    );

    test(
        "should return at least one player campus manager",
        async (done) => {
            const response = await getWithToken("/getAllPlayersCampusManagers", playerToken);
            expect(response.status).toBe(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return one player campus manager",
        async (done) => {
            let pCampusManager = new PlayerCampusManager(2, "Leila", 900);
            pCampusManager.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];

            let response = await postWithToken("/savePlayerCampusManager", pCampusManager, playerToken);
            pCampusManager = response.body;
            response = await getWithToken("/getPlayerCampusManagerById/" + pCampusManager.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(pCampusManager);
            done();
        }
    );

    test(
        "should return player campus managers by player ID",
        async (done) => {
            let pCampusManager = new PlayerCampusManager(1, "Obiwan", 550);
            pCampusManager.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];

            let response = await postWithToken("/savePlayerCampusManager", pCampusManager, playerToken);
            pCampusManager = response.body;
            lastId = pCampusManager.id;
            response = await getWithToken("/getOnePlayerCampusManagers/" + pCampusManager.player_id, playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should update one player campus manager",
        async (done) => {
            const pCampusManager = new PlayerCampusManager(4, "Luke", 280);

            let response = await postWithToken("/updatePlayerCampusManager", { id: 1, ...pCampusManager }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.player_id).toEqual(pCampusManager.player_id);
            expect(response.body.name).toEqual(pCampusManager.name);
            expect(response.body.price).toEqual(pCampusManager.price);;
            done();
        }
    );

    test(
        "should delete one player campus manager",
        async (done) => {
            let response = await deleteWithToken("/deletePlayerCampusManager/" + lastId, playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});