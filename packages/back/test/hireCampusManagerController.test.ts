import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { indicatorsTemplates } from "../src/models/Templates";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../src/constants";
import { getWithToken, postWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerId: number = 0;
let budgetIndicatorId: number = 0;
let playerToken: string = null;

describe('Hire a campus manager', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        process.env.TOKEN_SECRET = "ghtyuririigjjhlmmqqkkdddgfzrapmmknv";

        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates, );

        // create the player
        response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });
        playerId = response.body.player.id;

        // login the player
        let loginResponse = await postWithToken("/api/player/login", { email: "sharky@gmail.fr", password: "123456" });
        playerToken = loginResponse.header['auth-token'];
        

        // get reputation indicator of the player
        response = await getWithToken("/getAllIndicatorsByPlayerIdAndName/" + playerId + "/" + REPUTATION, playerToken);

        // get budget indicator of the player
        response = await getWithToken("/getAllIndicatorsByPlayerIdAndName/" + playerId + "/" + BUDGET, playerToken);
        budgetIndicatorId = response.body.id;

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });


    test("should hire a campus manager for a player",
        async (done) => {
            let response = await postWithToken("/hireCampusManager", { player_id: playerId, campusManagerName: "Maxime" }, playerToken);
            expect(response.status).toEqual(200);
            done();
        });

    test("should not hire a campus manager for a player because the budget is not enought",
        async (done) => {
            let updatedIndicator = await postWithToken("/updateIndicator", { id: budgetIndicatorId, value: 100 }, playerToken);
            expect(updatedIndicator.status).toEqual(200);

            let response = await postWithToken("/hireCampusManager", { player_id: playerId, campusManagerName: "Julien" }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual("You can't hire this campus manager, you don't have the necessary budget.");
            done();
        });

    test("should not hire a campus manager for a player because he have already 2 campus managers",
        async (done) => {
            let updatedIndicator = await postWithToken("/updateIndicator", { id: budgetIndicatorId, value: 1000 }, playerToken);
            expect(updatedIndicator.status).toEqual(200);

            let response = await postWithToken("/hireCampusManager", { player_id: playerId, campusManagerName: "Marylou" }, playerToken);
            expect(response.status).toEqual(200);

            response = await postWithToken("/hireCampusManager", { player_id: playerId, campusManagerName: "Cécile" }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual("You already have two campus managers, you can't hire one more.");
            done();
        });
});