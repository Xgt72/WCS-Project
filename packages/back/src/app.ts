import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";


/**
 * Controllers (route handlers).
 */
import * as studentController from "./controllers/StudentController";
import * as indicatorController from "./controllers/IndicatorController";
import { getSingletonConnection } from "./connection";

/**
 * Create Express server.
 */

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);




/**
 * Primary app routes.
 */
// app.get("/getAllStudents", studentController.getAllStudents);
// app.post("/saveStudent", studentController.saveStudent);
// app.delete("/deleteStudent", studentController.deleteStudent);
app.get("/getAllIndicators", indicatorController.getAllIndicators);
app.get("/getIndicatorsByPlayerId", indicatorController.getIndicatorsByPlayerId);
app.get("/getIndicatorById", indicatorController.getIndicatorById);
app.post("/saveIndicator", indicatorController.saveIndicator);
app.delete("/deleteIndicator", indicatorController.deleteIndicator);
app.post("/updateIndicator", indicatorController.updateIndicator);



/**
 * Start Express server.
 */
export const server = app.listen(app.get("port"), (err: any) => {
    if (err) {
        console.error(`ERROR: ${err.message}`);
    }
    
    console.log(`Listening on port ${app.get("port")}`);
    getSingletonConnection();

});