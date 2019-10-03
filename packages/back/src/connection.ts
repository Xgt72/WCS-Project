import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

let singleConnection: Connection = null;
let toggle: boolean = false;

const config: any = {
    "dev": null,
    "test": {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "Xgt72@web-dev!",
        "database": "wcs_game",
        "synchronize": true,
        "logging": false,
        "entities": [
            "src/entities/*.ts"
        ],
        "cli": {
            "entitiesDir": ["src/entities"]
        }
    }
};

export async function getSingletonConnection(mode: string = "dev") {

    if (toggle)
        return;

    toggle = true;

    let options: any = (config[mode] != undefined) ? config[mode] : null;

    console.log("*************** " + mode + " mode **********************");
    console.log("try to connect to DB with options: ", options);

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

