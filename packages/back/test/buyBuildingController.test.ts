import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { classroomTemplate, parkingTemplate, indicatorsTemplates } from "../src/models/Templates";
import { postWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerId: number = 0;
let budgetId: number = 0;
let playerToken: string = null;

describe('buy a building', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        process.env.TOKEN_SECRET = "ghtyuririigjjhlmmqqkkdddgfzrapmmknv";

        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates, );
        // create the player
        response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });
        playerId = response.body.player.id;
        budgetId = response.body.indicators[1].id;
        // login the player
        let loginResponse = await postWithToken("/api/player/login", { email: "sharky@gmail.fr", password: "123456" });
        playerToken = loginResponse.header['auth-token'];

        response = await postWithToken("/savePlayerBuilding", classroomTemplate, playerToken);
        response = await postWithToken("/savePlayerBuilding", parkingTemplate, playerToken);

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });



    test(
        "should buy a parking by Sharky",
        async (done) => {
            let response = await postWithToken("/buyBuilding", { player_id: playerId, building_template_id: 2 }, playerToken);
            
            expect(response.status).toEqual(200);
            expect(response.body.budget.value).toEqual(4800);
            expect(response.body.building.player_id).toEqual(playerId);
            
            done();
        }
    );

   

    test(
        "should not buy a building for a player because the budget is not enought",
        async (done) => {
            let updatedIndicator = await postWithToken("/updateIndicator", { id: budgetId, value: 100 }, playerToken);
            expect(updatedIndicator.status).toEqual(200);
            
            let response = await postWithToken("/buyBuilding", { player_id: playerId, building_template_id: 1 }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual("You can't buy this building, you don't have the necessary budget.");

            done();
        }
    );

        test(
            "should not buy a building for a player because he already have this type of building",
            async (done) => {
                let updatedIndicator = await postWithToken("/updateIndicator", { id: budgetId, value: 2000 }, playerToken);
                expect(updatedIndicator.status).toEqual(200);

                let response = await postWithToken("/buyBuilding", { player_id: playerId, building_template_id: 2 }, playerToken);
                expect(response.status).toEqual(200);
                expect(response.body).toEqual("You already have this building.");

                done();
            }
        );
});