import request from 'supertest';
import { app } from "../src/app";

export function getWithToken(url: string, token: string = "") {
    const httpRequest = request(app).get(url);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    if(token !== "") {
        httpRequest.set('auth-token', token);
    }
    return httpRequest;
}

export function postWithToken(url: string, body: any, token: string = "") {
    const httpRequest = request(app).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    httpRequest.set('Access-Control-Allow-Headers', 'auth-token');
    httpRequest.set('Access-Control-Expose-Headers', 'auth-token');
    if (token !== "") {
        httpRequest.set('auth-token', token);
    }
    return httpRequest;
}

export function deleteWithToken(url: string, token: string = "") {
    const httpRequest = request(app).delete(url);
    httpRequest.set('Accept', 'application/json');
    httpRequest.set('Origin', 'http://localhost:5000');
    if (token !== "") {
        httpRequest.set('auth-token', token);
    }
    return httpRequest;
}