import "reflect-metadata";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { indicatorsTemplates } from "../src/models/Templates";
import { postWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerToken: string = null;

describe('Create a new player', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        // create the indicators templates
        let response = await postWithToken("/saveAllIndicators", indicatorsTemplates, );

        done();
    });

    afterAll(async (done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should create a new player with his indicators",
        async (done) => {
            let response = await postWithToken("/api/createPlayer", { player_name: "Sharky", email: "sharky@gmail.fr", password: "123456" });
            expect(response.status).toEqual(200);
            expect(response.body.player.playerName).toEqual("Sharky");
            expect(parseInt(response.body.indicators.length)).toEqual(5);

            done();
        }
    );

});