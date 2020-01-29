import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { verifyToken } from "./jwtToken/verifyToken";

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
import * as buyBuildingController from "./controllers/BuyBuildingController";
import * as teacherActivitiesCalendarController from "./controllers/TeacherActivitiesCalendarController";
import * as playerCampusManagerController from "./controllers/PlayerCampusManagerController";
import * as campusManagerActivitiesCalendarController from "./controllers/CampusManagerActivitiesCalendarController";
import * as activityController from "./controllers/ActivityController";
import * as hireTeacherController from "./controllers/HireTeacherController";
import * as hireCampusManagerController from "./controllers/HireCampusManagerController";
import * as campusManagerCalendarController from "./controllers/CampusManagerCalendarController";
import * as teacherCalendarController from "./controllers/TeacherCalendarController";
import * as createPlayerController from "./controllers/CreatePlayerController";
import * as loginController from "./controllers/loginController";

/**
 * Create Express server.
 */

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    exposedHeaders: ['auth-token'],
}));

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);

/**
 * Indicator routes.
 */
app.get("/getAllIndicators", [verifyToken], indicatorController.getAllIndicators);
app.get("/getIndicatorsByPlayerId/:id", [verifyToken], indicatorController.getIndicatorsByPlayerId);
app.get("/getIndicatorById/:id", [verifyToken], indicatorController.getIndicatorById);
app.get("/getAllIndicatorsByPlayerIdAndName/:id/:name", indicatorController.getAllIndicatorsByPlayerIdAndName);
app.post("/saveIndicator", [verifyToken], indicatorController.saveIndicator);
// app.post("/saveAllIndicators", [verifyToken], indicatorController.saveAllIndicators);
app.post("/saveAllIndicators", indicatorController.saveAllIndicators);
app.post("/updateIndicator", [verifyToken], indicatorController.updateIndicator);
app.delete("/deleteIndicator/:id", [verifyToken], indicatorController.deleteIndicator);

/**
 * Mutator routes.
 */
app.get("/getAllMutators", [verifyToken], mutatorController.getAllMutators);
app.get("/getMutatorsById/:id", [verifyToken], mutatorController.getMutatorsById);
app.post("/saveMutator", [verifyToken], mutatorController.saveMutator);
app.post("/updateMutator", [verifyToken], mutatorController.updateMutator);
app.delete("/deleteMutator/:id", [verifyToken], mutatorController.deleteMutator);

/**
 * Player routes.
 */
app.get("/getAllPlayers", [verifyToken], playerController.getAllPlayers);
app.get("/getPlayerById/:id", [verifyToken], playerController.getPlayerById);
app.post("/getPlayerByEmail", [verifyToken], playerController.getPlayerByEmail);
app.post("/savePlayer", [verifyToken], playerController.savePlayer);
app.post("/updatePlayer", [verifyToken], playerController.updatePlayer);
app.delete("/deletePlayer/:id", [verifyToken], playerController.deletePlayer);

/**
 * PlayerBuildings routes.
 */
app.get("/getAllPlayersBuildings", [verifyToken], playerBuildingsController.getAllPlayersBuildings);
app.get("/getOnePlayerBuildings/:id", [verifyToken], playerBuildingsController.getOnePlayerBuildings);
app.get("/getPlayerBuildingById/:id", [verifyToken], playerBuildingsController.getPlayerBuildingById);
app.get("/getAllBuildingTemplates", [verifyToken], playerBuildingsController.getAllBuildingTemplates);
app.post("/savePlayerBuilding", [verifyToken], playerBuildingsController.savePlayerBuilding);
app.post("/updatePlayerBuilding", [verifyToken], playerBuildingsController.updatePlayerBuilding);
app.delete("/deletePlayerBuilding/:id", [verifyToken], playerBuildingsController.deletePlayerBuilding);

/**
 * PlayerTeacher routes.
 */
app.get("/getAllPlayersTeachers", [verifyToken], playerTeacherController.getAllPlayersTeachers);
app.get("/getOnePlayerTeachers/:id", [verifyToken], playerTeacherController.getOnePlayerTeachers);
app.get("/getPlayerTeacherById/:id", [verifyToken], playerTeacherController.getPlayerTeacherById);
app.post("/savePlayerTeacher", [verifyToken], playerTeacherController.savePlayerTeacher);
app.post("/updatePlayerTeacher", [verifyToken], playerTeacherController.updatePlayerTeacher);
app.delete("/deletePlayerTeacher/:id", [verifyToken], playerTeacherController.deletePlayerTeacher);

/**
 * Teacher Activities Calendar routes.
 */
app.get("/getAllTeachersActivitiesCalendar", [verifyToken], teacherActivitiesCalendarController.getAllTeachersActivitiesCalendar);
app.get("/getTeacherActivityCalendarById/:id", [verifyToken], teacherActivitiesCalendarController.getTeacherActivityCalendarById);
app.get("/getTeacherActivitiesCalendarByTeacherId/:id", [verifyToken], teacherActivitiesCalendarController.getTeacherActivitiesCalendarByTeacherId);
app.get("/getActivityByTeacherIdByDayByPeriod/:id/:day/:period", [verifyToken], teacherActivitiesCalendarController.getActivitiesByTeacherIdAndByDayByPeriod);
app.post("/saveTeacherActivity", [verifyToken], teacherActivitiesCalendarController.saveTeacherActivity);
app.post("/saveMultipleActivitiesTeacher", [verifyToken], teacherActivitiesCalendarController.saveMultipleActivitiesTeacher);
app.post("/updateTeacherActivityCalendar", [verifyToken], teacherActivitiesCalendarController.updateTeacherActivityCalendar);
app.delete("/deleteTeacherActivityCalendar/:id", [verifyToken], teacherActivitiesCalendarController.deleteTeacherAcitvityCalendar);

/**
 * Player Campus Manager routes.
 */
app.get("/getAllPlayersCampusManagers", [verifyToken], playerCampusManagerController.getAllPlayersCampusManagers);
app.get("/getOnePlayerCampusManagers/:id", [verifyToken], playerCampusManagerController.getOnePlayerCampusManagers);
app.get("/getPlayerCampusManagerById/:id", [verifyToken], playerCampusManagerController.getPlayerCampusManagerById);
app.post("/savePlayerCampusManager", [verifyToken], playerCampusManagerController.savePlayerCampusManager);
app.post("/updatePlayerCampusManager", [verifyToken], playerCampusManagerController.updatePlayerCampusManager);
app.delete("/deletePlayerCampusManager/:id", [verifyToken], playerCampusManagerController.deletePlayerCampusManager);

/**
 * Campus Manager Activities Calendar routes.
 */
app.get(
    "/getAllCampusManagersActivitiesCalendar",
     [verifyToken],
    campusManagerActivitiesCalendarController.getAllCampusManagersActivitiesCalendar
);
app.get(
    "/getCampusManagerActivityCalendarById/:id",
     [verifyToken],
    campusManagerActivitiesCalendarController.getCampusManagerActivityCalendarById
);
app.get(
    "/getCampusManagerActivitiesCalendarByCampusManagerId/:id",
     [verifyToken],
    campusManagerActivitiesCalendarController.getCampusManagerActivitiesCalendarByCampusManagerId
);
app.get(
    "/getActivityByCampusManagerIdByDayByPeriod/:id/:day/:period",
     [verifyToken],
    campusManagerActivitiesCalendarController.getActivitiesByCampusManagerIdAndByDayByPeriod
);
app.post(
    "/saveCampusManagerActivity",
     [verifyToken],
    campusManagerActivitiesCalendarController.saveCampusManagerActivity
);
app.post(
    "/saveMultipleActivitiesCampusManager",
     [verifyToken],
    campusManagerActivitiesCalendarController.saveMultipleActivitiesCampusManager
);
app.post(
    "/updateCampusManagerActivityCalendar",
     [verifyToken],
    campusManagerActivitiesCalendarController.updateCampusManagerActivityCalendar
);
app.delete(
    "/deleteCampusManagerActivityCalendar/:id",
     [verifyToken],
    campusManagerActivitiesCalendarController.deleteCampusManagerActivityCalendar
);

/**
 * Activity routes.
 */
app.get("/getAllActivities", activityController.getAllActivities);
app.get("/getActivityById/:id", [verifyToken], activityController.getActivityById);
app.post("/saveActivity", [verifyToken], activityController.saveActivity);
app.post("/saveAllActivities", [verifyToken], activityController.saveAllActivities);
app.post("/updateActivity", [verifyToken], activityController.updateActivity);
app.delete("/deleteActivity/:id", [verifyToken], activityController.deleteActivity);

/**
 * Cycle route.
 */
app.get("/doCycle/:player_id", [verifyToken], cycleController.doCycle);

/**
 * Create a player route.
 */
app.post("/api/createPlayer", createPlayerController.createPlayer);

/**
 * Buy a building route.
 */
app.post("/buyBuilding", [verifyToken], buyBuildingController.buyBuilding);

/**
 * Hire a teacher route.
 */
app.post("/hireTeacher", [verifyToken], hireTeacherController.hireTeacher);

/**
 * Hire a campus manager route.
 */
app.post("/hireCampusManager", [verifyToken], hireCampusManagerController.hireCampusManager);

/**
 * Campus manager calendar route.
 */
app.post("/addActivitiesInCampusManagerCalendar", [verifyToken], campusManagerCalendarController.addActivitiesInCampusManagerCalendar);

/**
 * Teacher calendar route.
 */
app.post("/addActivitiesInTeacherCalendar", [verifyToken], teacherCalendarController.addActivitiesInTeacherCalendar);

/**
 * Login route
 */
app.post("/api/player/login", loginController.playerLogin);

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