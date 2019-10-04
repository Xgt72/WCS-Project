import "reflect-metadata";
import request from 'supertest';
import { Mutator } from "../src/entities/Mutator";
import { Connection } from "typeorm";
import { getSingletonConnection } from "../src/connection";
import {app, server} from "../src/app";
let connection:Connection = null;


describe('Mutator', () => {

    beforeAll(async (done) => {
        connection = await getSingletonConnection("test");
        done();
    });

    afterAll( async(done) => {
        connection.close();
        server.close();
        done();
    });

    test(
        "should save one mutator",
        async (done) => {
            const mut =  new Mutator("multiply", 1, 5);
            const response = await post("/saveMutator",mut);
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
            const response = await get("/getAllMutators", {});
            expect(parseInt(response.body.length)).toBeGreaterThan(0);
            done();
        }
    );

    test(
        "should return mutator by ID",
        async (done) => {
            let mut =  new Mutator("substract", 3, 500);
            let response = await post("/saveMutator",mut);
            mut = response.body;
            response = await get("/getMutatorsById", {id: mut.id});
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mut);
            done();
        }
    );
    
    test(
        "should update one mutator",
        async (done) => {
            const mut = new Mutator("mutatorTest", 3, 1000);
            let response = await post("/updateMutator", {id: 1, ...mut});
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({id: 1, ...mut});
            done();
        }
    );

    test(
        "should delete one mutator",
        async (done) => {
            let response = await deleteMutator("/deleteMutator", {id: 2});
            expect(response.status).toEqual(200);
            done();
        }
    );
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

export function deleteMutator(url: string, body: any) {
    const httpRequest = request(app).delete(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    return httpRequest;
}