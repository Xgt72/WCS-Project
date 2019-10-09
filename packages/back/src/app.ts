import "reflect-metadata";
import express from "express";
import * as bodyParser from "body-parser";


/**
 * Controllers (route handlers).
 */
import { getSingletonConnection } from "./connection";
import * as indicatorController from "./controllers/IndicatorController";
import * as mutatorController from "./controllers/MutatorController";
import * as playerBuildingsController from "./controllers/PlayerBuildingsController";
import * as playerTeacherController from "./controllers/PlayerTeacherController";
import * as playerController from "./controllers/PlayerController";
import * as cycleController from "./controllers/CycleController";

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
 * Indicator routes.
 */
app.get("/getAllIndicators", indicatorController.getAllIndicators);
app.get("/getIndicatorsByPlayerId", indicatorController.getIndicatorsByPlayerId);
app.get("/getIndicatorById", indicatorController.getIndicatorById);
app.post("/saveIndicator", indicatorController.saveIndicator);
app.post("/updateIndicator", indicatorController.updateIndicator);
app.delete("/deleteIndicator", indicatorController.deleteIndicator);

/**
 * Mutator routes.
 */
app.get("/getAllMutators", mutatorController.getAllMutators);
app.get("/getMutatorsById", mutatorController.getMutatorsById);
app.post("/saveMutator", mutatorController.saveMutator);
app.post("/updateMutator", mutatorController.updateMutator);
app.delete("/deleteMutator", mutatorController.deleteMutator);

/**
 * PlayerBuildings routes.
 */
app.get("/getAllPlayersBuildings", playerBuildingsController.getAllPlayersBuildings);
app.get("/getOnePlayerBuildings", playerBuildingsController.getOnePlayerBuildings);
app.get("/getPlayerBuildingById", playerBuildingsController.getPlayerBuildingById);
app.get("/getAllBuildingTemplates", playerBuildingsController.getAllBuildingTemplates);
app.post("/savePlayerBuilding", playerBuildingsController.savePlayerBuilding);
app.post("/updatePlayerBuilding", playerBuildingsController.updatePlayerBuilding);
app.delete("/deletePlayerBuilding", playerBuildingsController.deletePlayerBuilding);

/**
 * PlayerTeacher routes.
 */
app.get("/getAllPlayersTeachers", playerTeacherController.getAllPlayersTeachers);
app.get("/getOnePlayerTeachers", playerTeacherController.getOnePlayerTeachers);
app.get("/getPlayerTeacherById", playerTeacherController.getPlayerTeacherById);
app.post("/savePlayerTeacher", playerTeacherController.savePlayerTeacher);
app.post("/updatePlayerTeacher", playerTeacherController.updatePlayerTeacher);
app.delete("/deletePlayerTeacher", playerTeacherController.deletePlayerTeacher);

/**
 * Player routes.
 */
app.get("/getAllPlayers", playerController.getAllPlayers);
app.get("/getPlayerById", playerController.getPlayerById);
app.post("/savePlayer", playerController.savePlayer);
app.post("/updatePlayer", playerController.updatePlayer);
app.delete("/deletePlayer", playerController.deletePlayer);

/**
 * Cycle routes.
 */
app.get("/doCycle", cycleController.doCycle);

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