import express from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";

/**
 * Controllers (route handlers).
 */
import * as studentController from "./controllers/StudentController";

/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);

/**
 * Start Express server.
 */
app.listen(app.get("port"), (err: any) => {
    if(err) {
        console.error(`ERROR: ${err.message}`);
    } else {
        console.log(`Listening on port ${app.get("port")}`);
    }
});

/**
 * Primary app routes.
 */
app.get("/getAllStudents", studentController.getAllStudents);
app.post("/saveStudent", studentController.saveStudent);
app.delete("/deleteStudent", studentController.deleteStudent);


/**
 * Create connection to DB using configuration provided in app-config file.
 */
createConnection().then(async connection => {
    console.log("Connected to DB");

}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app;