import "reflect-metadata";
import request from "supertest";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import { app, server } from "../src/app";
import { Player } from "../src/entities/Player";
import { Indicator } from "../src/entities/Indicator";
import { classroomTemplate, parkingTemplate } from "../src/models/Templates";

let connection: Connection = null;
let playerId: number = 0;
let budgetId: number = 0;

describe('buy a building', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");

        let player = new Player("Sharky");
        let response = await post("/savePlayer", player);
        playerId = response.body.id;

        let reputationIndicator = new Indicator("reputation", playerId, 30);
        response = await post("/saveIndicator", reputationIndicator);

        let budgetIndicator = new Indicator("budget", playerId, 5000);
        response = await post("/saveIndicator", budgetIndicator);
        budgetId = response.body.id;

        response = await post("/savePlayerBuilding", classroomTemplate);
        response = await post("/savePlayerBuilding", parkingTemplate);

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
            let response = await post("/buyBuilding", { player_id: playerId, building_template_id: 2 });
            
            expect(response.status).toEqual(200);
            expect(response.body.budget.value).toEqual(4700);
            expect(response.body.building.player_id).toEqual(playerId);
            
            done();
        }
    );

   

    test(
        "should not buy a building for a player because the budget is not enought",
        async (done) => {
            let updatedIndicator = await post("/updateIndicator", { id: budgetId, value: 100 });
            expect(updatedIndicator.status).toEqual(200);
            
            let response = await post("/buyBuilding", { player_id: playerId, building_template_id: 1 });
            expect(response.status).toEqual(200);
            expect(response.body).toEqual("You can't buy this building, you don't have the necessary budget.");

            done();
        }
    );

        test(
            "should not buy a building for a player because he already have this type of building",
            async (done) => {
                let updatedIndicator = await post("/updateIndicator", { id: budgetId, value: 2000 });
                expect(updatedIndicator.status).toEqual(200);

                let response = await post("/buyBuilding", { player_id: playerId, building_template_id: 2 });
                expect(response.status).toEqual(200);
                expect(response.body).toEqual("You already have this building.");

                done();
            }
        )

});

export function get(url: string, body: any) {
    const httpRequest = request(app).get(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}

export function post(url: string, body: any) {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}