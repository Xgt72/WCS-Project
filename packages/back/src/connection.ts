import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

require('dotenv').config();

let singleConnection: Connection = null;
let toggle: boolean = false;

const config: any = {
    "dev": {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": process.env.PROD_USERNAME,
        "password": process.env.PROD_PASSWORD,
        "database": process.env.PROD_DATABASE,
        "synchronize": true,
        "logging": false,
        "entities": [
           __dirname+"/entities/*.js"
        ],
        "cli": {
           "entitiesDir": [__dirname+"/entities"]
        }
     },
    "test": {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": process.env.TEST_USERNAME,
        "password": process.env.TEST_PASSWORD,
        "database": process.env.TEST_DATABASE,
        "synchronize": true,
        "logging": false,
        "entities": [
            "src/entities/*.ts"
        ],
        "cli": {
            "entitiesDir": ["src/entities"]
        },
        "dropSchema": true
    }
};

export async function getSingletonConnection(mode: string = "dev") {

    if (toggle)
        return;

    toggle = true;

    let options: any = (config[mode] != undefined) ? config[mode] : null;

    console.log("*************** " + mode + " mode **********************");
    // console.log("try to connect to DB with options: ", options);

    return await createConnection(options).then(
        connection => {

            console.log("Connected to DB");
            singleConnection = connection;
            return connection;
        },
        reason => {
            console.log("rejected", reason);
            return null;
        }
    ).catch(error => console.log("TypeORM connection error: ", error));

}

