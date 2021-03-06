import "reflect-metadata";
import { Indicator } from "../src/entities/Indicator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { indicatorsTemplates } from "../src/models/Templates";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerToken: string = null;

describe('Indicator', () => {

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
        "should save one indicator",
        async (done) => {
            const ind = new Indicator("wilder", 4, 1000);
            const response = await postWithToken("/saveIndicator", ind, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(ind.name);
            expect(response.body.player_id).toEqual(ind.player_id);
            expect(response.body.value).toEqual(ind.value);
            done();
        }
    );

    test(
        "should save two indicators",
        async (done) => {
            const indOne = new Indicator(REPUTATION, 4, 1000);
            const indTwo = new Indicator(BUDGET, 5, 20);
            const response = await postWithToken("/saveAllIndicators", [indOne, indTwo], playerToken);
            expect(response.status).toBe(200);
            expect(parseInt(response.body.length)).toEqual(2);
            done();
        }
    );


    test(
        "should return at least one indicator",
        async (done) => {
            const response = await getWithToken("/getAllIndicators", playerToken);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return indicator by ID",
        async (done) => {
            let ind = new Indicator("wilder", 4, 1000);
            let response = await postWithToken("/saveIndicator", ind, playerToken);
            ind = response.body;
            response = await getWithToken("/getIndicatorById/" + ind.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(ind);
            done();
        }
    );

    test(
        "should return player indicators by player ID",
        async (done) => {
            let ind = new Indicator("wilder", 5, 1000);
            let response = await postWithToken("/saveIndicator", ind, playerToken);
            ind = response.body;
            response = await getWithToken("/getIndicatorsByPlayerId/" + ind.player_id, playerToken);
            expect(response.status).toEqual(200);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return indicator by player ID and indicator name",
        async (done) => {
            let response = await getWithToken("/getAllIndicatorsByPlayerIdAndName/5/wilder", playerToken);
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual("wilder");
            expect(response.body.player_id).toEqual(5);
            expect(response.body.value).toEqual(1000);
            
            done();
        }
    )

    test(
        "should update one indicator",
        async (done) => {
            const ind = new Indicator("wilderTest", 3, 1000);
            let response = await postWithToken("/updateIndicator", { id: 1, ...ind }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ id: 1, ...ind });
            done();
        }
    );

    test(
        "should delete one indicator",
        async (done) => {
            let response = await deleteWithToken("/deleteIndicator/2", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});