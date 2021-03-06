import "reflect-metadata";
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";


let connection: Connection = null;
let playerToken: string = null;

describe('Mutator', () => {

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
        "should save one mutator",
        async (done) => {
            const mut = new Mutator("multiply", 1, 5);
            const response = await postWithToken("/saveMutator", mut, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.name).toEqual(mut.name);
            expect(response.body.indicator_id).toEqual(mut.indicator_id);
            expect(response.body.value).toEqual(mut.value);
            done();
        }
    );

    test(
        "should return at least one mutator",
        async (done) => {
            const response = await getWithToken("/getAllMutators", playerToken);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return mutator by ID",
        async (done) => {
            let mut = new Mutator("substract", 3, 500);
            let response = await postWithToken("/saveMutator", mut, playerToken);
            mut = response.body;
            response = await getWithToken("/getMutatorsById/" + mut.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mut);
            done();
        }
    );

    test(
        "should update one mutator",
        async (done) => {
            const mut = new Mutator("mutatorTest", 3, 1000);
            let response = await postWithToken("/updateMutator", { id: 1, ...mut }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ id: 1, ...mut });
            done();
        }
    );

    test(
        "should delete one mutator",
        async (done) => {
            let response = await deleteWithToken("/deleteMutator/2", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});