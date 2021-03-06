import "reflect-metadata";
import { PlayerBuilding } from "../src/entities/PlayerBuilding";
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { REPUTATION, BUDGET } from "../src/constants";
import { indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerToken: string = null;

describe('Player Building', () => {

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
        "should save one player building",
        async (done) => {
            const pBuilding = new PlayerBuilding(1, "classroom", 1000);
            pBuilding.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];
            const response = await postWithToken("/savePlayerBuilding", pBuilding, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(pBuilding.player_id);
            expect(response.body.name).toEqual(pBuilding.name);
            expect(response.body.price).toEqual(pBuilding.price);
            done();
        }
    );

    test(
        "should save two building template",
        async (done) => {
            const buildingOne = new PlayerBuilding(1, "classroom", 1000, true);
            buildingOne.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];
            let response = await postWithToken("/savePlayerBuilding", buildingOne, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(buildingOne.player_id);
            expect(response.body.name).toEqual(buildingOne.name);
            expect(response.body.price).toEqual(buildingOne.price);
            expect(response.body.isTemplate).toEqual(buildingOne.isTemplate);

            const buidlingTwo = new PlayerBuilding(1, "parking", 500, true);
            buidlingTwo.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];
            response = await postWithToken("/savePlayerBuilding", buidlingTwo, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.player_id).toEqual(buidlingTwo.player_id);
            expect(response.body.name).toEqual(buidlingTwo.name);
            expect(response.body.price).toEqual(buidlingTwo.price);
            expect(response.body.isTemplate).toEqual(buidlingTwo.isTemplate);
            done();
        }
    );

    test(
        "should return at least one player building",
        async (done) => {
            const response = await getWithToken("/getAllPlayersBuildings", playerToken);
            expect(parseInt(response.body.length)).toBeGreaterThan(2);
            done();
        }
    );

    test(
        "should return one player building by building ID",
        async (done) => {
            let pBuilding = new PlayerBuilding(2, "cafeteria", 500);
            pBuilding.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 1, -100)
            ];
            let response = await postWithToken("/savePlayerBuilding", pBuilding, playerToken);
            pBuilding = response.body;
            response = await getWithToken("/getPlayerBuildingById/" + pBuilding.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(pBuilding);
            done();
        }
    );

    test(
        "should return player buildings by player ID",
        async (done) => {
            let pBuilding = new PlayerBuilding(2, "classroom", 1000);
            pBuilding.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];
            let response = await postWithToken("/savePlayerBuilding", pBuilding, playerToken);
            pBuilding = response.body;
            response = await getWithToken("/getOnePlayerBuildings/" + pBuilding.player_id, playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toEqual(2);
            done();
        }
    );

    test(
        "should return all building templates",
        async (done) => {
            let response = await getWithToken("/getAllBuildingTemplates", playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(1);
            done();
        }
    );

    test(
        "should update one player building",
        async (done) => {
            const pBuilding = new PlayerBuilding(2, "flatsharing", 580);
            pBuilding.mutators = [
                new Mutator("inc" + REPUTATION, 1, 5),
                new Mutator("dec" + BUDGET, 2, -100)
            ];
            let response = await postWithToken("/updatePlayerBuilding", { id: 1, ...pBuilding }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.id).toEqual(1);
            expect(response.body.player_id).toEqual(pBuilding.player_id);
            expect(response.body.name).toEqual(pBuilding.name);
            expect(response.body.price).toEqual(pBuilding.price);
            done();
        }
    );

    test(
        "should delete one player building",
        async (done) => {
            let response = await deleteWithToken("/deletePlayerBuilding/2", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});