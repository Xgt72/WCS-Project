import "reflect-metadata";
import { Player } from "../src/entities/Player";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { server } from "../src/app";
import { indicatorsTemplates } from "../src/models/Templates";
import { getWithToken, postWithToken, deleteWithToken } from "./requestFunctions";

let connection: Connection = null;
let playerToken: string = null;

describe('Player', () => {

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
        "should save one player",
        async (done) => {
            const player = new Player("Sharky", "sharky@gmail.fr", "123456");
            const response = await postWithToken("/savePlayer", player, playerToken);
            expect(response.status).toBe(200);
            expect(response.body.playerName).toEqual(player.playerName);
            done();
        }
    );


    test(
        "should return at least one player",
        async (done) => {
            const response = await getWithToken("/getAllPlayers", playerToken);
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return player by ID",
        async (done) => {
            let player = new Player("ObiWan", "lightforce@gmail.fr", "luke");
            let response = await postWithToken("/savePlayer", player, playerToken);
            player = response.body;
            response = await getWithToken("/getPlayerById/" + player.id, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(player);
            done();
        }
    );

    test(
        "should return player by email",
        async (done) => {
            let player = new Player("Dark Vader", "darkforce@gmail.fr", "sith");
            let response = await postWithToken("/savePlayer", player, playerToken);
            player = response.body;
            response = await postWithToken("/getPlayerByEmail", {email: player.email}, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(player);
            done();
        }
    );

    test(
        "should update one player",
        async (done) => {
            const player = new Player("wilderTester", "wilder@gmail.fr", "the wild code school");
            let response = await postWithToken("/updatePlayer", { id: 1, ...player }, playerToken);
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ id: 1, ...player });
            done();
        }
    );

    test(
        "should delete one indicator",
        async (done) => {
            let response = await deleteWithToken("/deletePlayer/2", playerToken);
            expect(response.status).toEqual(200);
            done();
        }
    );
});