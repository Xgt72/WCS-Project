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
import * as buyBuildingController from "./controllers/BuyBuildingController";
import * as teacherActivitiesCalendarController from "./controllers/TeacherActivitiesCalendarController";
import * as playerCampusManagerController from "./controllers/PlayerCampusManagerController";
import * as campusManagerActivitiesCalendarController from "./controllers/CampusManagerActivitiesCalendarController";
import * as activityController from "./controllers/ActivityController";
import * as hireTeacherController from "./controllers/HireTeacherController";
import * as hireCampusManagerController from "./controllers/HireCampusManagerController";
import * as campusManagerCalendarController from "./controllers/CampusManagerCalendarController";

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
app.post("/saveAllIndicators", indicatorController.saveAllIndicators);
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
 * Player routes.
 */
app.get("/getAllPlayers", playerController.getAllPlayers);
app.get("/getPlayerById", playerController.getPlayerById);
app.post("/savePlayer", playerController.savePlayer);
app.post("/updatePlayer", playerController.updatePlayer);
app.delete("/deletePlayer", playerController.deletePlayer);

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
 * Teacher Activities Calendar routes.
 */
app.get("/getAllTeachersActivitiesCalendar", teacherActivitiesCalendarController.getAllTeachersActivitiesCalendar);
app.get("/getTeacherActivityCalendarById", teacherActivitiesCalendarController.getTeacherActivityCalendarById);
app.get("/getTeacherActivitiesCalendarByTeacherId", teacherActivitiesCalendarController.getTeacherActivitiesCalendarByTeacherId);
app.post("/saveTeacherActivity", teacherActivitiesCalendarController.saveTeacherActivity);
app.post("/updateTeacherActivityCalendar", teacherActivitiesCalendarController.updateTeacherActivityCalendar);
app.delete("/deleteTeacherAcitvityCalendar", teacherActivitiesCalendarController.deleteTeacherAcitvityCalendar);

/**
 * Player Campus Manager routes.
 */
app.get("/getAllPlayersCampusManagers", playerCampusManagerController.getAllPlayersCampusManagers);
app.get("/getOnePlayerCampusManagers", playerCampusManagerController.getOnePlayerCampusManagers);
app.get("/getPlayerCampusManagerById", playerCampusManagerController.getPlayerCampusManagerById);
app.post("/savePlayerCampusManager", playerCampusManagerController.savePlayerCampusManager);
app.post("/updatePlayerCampusManager", playerCampusManagerController.updatePlayerCampusManager);
app.delete("/deletePlayerCampusManager", playerCampusManagerController.deletePlayerCampusManager);

/**
 * Campus ManagerActivities Calendar routes.
 */
app.get("/getAllCampusManagersActivitiesCalendar", campusManagerActivitiesCalendarController.getAllCampusManagersActivitiesCalendar);
app.get("/getCampusManagerActivityCalendarById", campusManagerActivitiesCalendarController.getCampusManagerActivityCalendarById);
app.get("/getCampusManagerActivitiesCalendarByCampusManagerId", campusManagerActivitiesCalendarController.getCampusManagerActivitiesCalendarByCampusManagerId);
app.get("/getActivityByCampusManagerIdByDayByPeriod", campusManagerActivitiesCalendarController.getActivitiesByCampusManagerIdAndByDayByPeriod);
app.post("/saveCampusManagerActivity", campusManagerActivitiesCalendarController.saveCampusManagerActivity);
app.post("/saveMultipleActivitiesCampusManager", campusManagerActivitiesCalendarController.saveMultipleActivitiesCampusManager);
app.post("/updateCampusManagerActivityCalendar", campusManagerActivitiesCalendarController.updateCampusManagerActivityCalendar);
app.delete("/deleteCampusManagerAcitvityCalendar", campusManagerActivitiesCalendarController.deleteCampusManagerAcitvityCalendar);

/**
 * Activity routes.
 */
app.get("/getAllActivities", activityController.getAllActivities);
app.get("/getActivityById", activityController.getActivityById);
app.post("/saveActivity", activityController.saveActivity);
app.post("/saveAllActivities", activityController.saveAllActivities);
app.post("/updateActivity", activityController.updateActivity);
app.delete("/deleteActivity", activityController.deleteActivity);

/**
 * Cycle route.
 */
app.get("/doCycle", cycleController.doCycle);

/**
 * Buy a building route.
 */
app.post("/buyBuilding", buyBuildingController.buyBuilding);

/**
 * Hire a teacher route.
 */
app.post("/hireTeacher", hireTeacherController.hireTeacher);

/**
 * Hire a campus manager route.
 */
app.post("/hireCampusManager", hireCampusManagerController.hireCampusManager);

/**
 * Campus manager calendar route.
 */
app.post("/addActivitiesInCampusManagerCalendar", campusManagerCalendarController.addActivitiesInCampusManagerCalendar);

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