import { Request, Response } from "express";
import { Indicator } from "../entities/Indicator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { PlayerBuildingsRepository } from "../repositories/PlayerBuildingsRepository";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { Mutator } from "../entities/Mutator";
import { PlayerTeacherRepository } from "../repositories/PlayerTeacherRepository";
import { PlayerTeacher } from "../entities/PlayerTeacher";
import { PlayerCampusManagerRepository } from "../repositories/PlayerCampusManagerRepository";
import { PlayerCampusManager } from "../entities/PlayerCampusManager";
import { CampusManagerActivitiesCalendarRepository } from "../repositories/CampusManagerActivitiesCalendarRepository";
import { Activity } from "../entities/Activity";
import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { ActivityRepository } from "../repositories/ActivityRepository";
import { TeacherActivitiesCalendarRepository } from "../repositories/TeacherActivitiesCalendarRepository";
import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { CYCLES_PER_FORMATION } from "../constants/index";

let indicatorRepo = new IndicatorRepository();
let buildingRepo = new PlayerBuildingsRepository();
let teacherRepo = new PlayerTeacherRepository();
let teacherActivitiesRepo = new TeacherActivitiesCalendarRepository();
let campusManagerRepo = new PlayerCampusManagerRepository();
let campusManagerActivitiesRepo = new CampusManagerActivitiesCalendarRepository();
let activityRepo = new ActivityRepository();
let playerRepo = new PlayerRepository();


export let doCycle = async (req: Request, res: Response) => {
    try {
        // get all indicators of the player
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(req.body.player_id);
        // console.log("1-indicators: ", indicators);

        // save the number of future students
        const futureStudents = indicators[3].value;

        // get all the buildings of the player
        let buildings = await buildingRepo.getOnePlayerBuildings(req.body.player_id);
        // console.log("2-buildings: ", buildings, buildings[0].mutators, buildings[1].mutators);

        // update all the indicators of the player from buildings mutators
        buildings.map(
            (currentBuilding: PlayerBuilding) => {

                if (currentBuilding.isTemplate)
                    return;

                currentBuilding.mutators.map(
                    (currentMutator: Mutator) => {
                        indicators.map(
                            (currentIndicator: Indicator) => {
                                if (currentIndicator.id == currentMutator.indicator_id) {
                                    currentIndicator.value += currentMutator.value;
                                }
                            }
                        );
                    }
                );
            }
        );
        // console.log("3-indicators: ", indicators);

        // get all the teachers of the player
        let teachers = await teacherRepo.getOnePlayerTeachers(req.body.player_id);
        // console.log("4-teachers: ", teachers, teachers[0].mutators);

        // update all the indicators of the player from teacher mutators
        teachers.map(
            (currentTeacher: PlayerTeacher) => {
                currentTeacher.mutators.map(
                    (currentMutator: Mutator) => {
                        indicators.map(
                            (currentIndicator: Indicator) => {
                                if (currentIndicator.id == currentMutator.indicator_id) {
                                    currentIndicator.value += currentMutator.value;
                                }
                            }
                        );
                    }
                );
            }
        );
        // console.log("5-indicators: ", indicators);

        // get all the campus managers of the player
        let campusManagers = await campusManagerRepo.getOnePlayerCampusManagers(req.body.player_id);
        // console.log("6-campus manager: ", campusManagers, campusManagers[0].mutators);

        // update all the indicators of the player from campus manager mutators
        campusManagers.map(
            (currentCampusManager: PlayerCampusManager) => {
                currentCampusManager.mutators.map(
                    (currentMutator: Mutator) => {
                        indicators.map(
                            (currentIndicator: Indicator) => {
                                if (currentIndicator.id == currentMutator.indicator_id) {
                                    currentIndicator.value += currentMutator.value;
                                }
                            }
                        );
                    }
                );
            }
        );
        // console.log("7-indicators: ", indicators);

        // get all the teachers activities calendar of the player
        let allTeachersActivities = [];

        for (let i = 0; i < teachers.length; i++) {
            let teacherActivities = await teacherActivitiesRepo.getTeacherActivitiesCalendarByTeacherId(teachers[i].id);
            allTeachersActivities.push(teacherActivities);
        }

        // // for test
        // for (let i = 0; i < allTeachersActivities[0].length; i++) {
        //     let activtyTest = await activityRepo.getActivityById(allTeachersActivities[0][i].activity_id);
        //     console.log("8-teacher activities: ", allTeachersActivities[0][i], activtyTest.mutators);

        // }

        // update all the indicators of the player from teachers activities calendar mutators
        for (let i = 0; i < allTeachersActivities.length; i++) {
            let currentTeacherCalendar: TeacherActivitiesCalendar[] = allTeachersActivities[i];

            for (let j = 0; j < currentTeacherCalendar.length; j++) {
                let currentPeriod: TeacherActivitiesCalendar = currentTeacherCalendar[j];

                let currentActivity: Activity = await activityRepo.getActivityById(currentPeriod.activity_id);

                currentActivity.mutators.map(
                    (currentMutator: Mutator) => {
                        indicators.map(
                            (currentIndicator: Indicator) => {
                                if (currentIndicator.id == currentMutator.indicator_id) {
                                    currentIndicator.value += currentMutator.value;
                                }
                            }
                        );
                    }
                );
            }
        }
        // console.log("9-indicators: ", indicators);

        // delete the player teachers calendars and all the activities
        for (let i = 0; i < teachers.length; i++) {
            let calendar = await teacherActivitiesRepo.getTeacherActivitiesCalendarByTeacherId(teachers[i].id);
            for (let j = 0; j < calendar.length; j++) {
                let activity = await activityRepo.getActivityById(calendar[j].activity_id);
                let response = await activityRepo.deleteActivity(activity);
            }
            for (let k = 0; k < calendar.length; k++) {
                let response = await teacherActivitiesRepo.deleteTeacherActivity(calendar[k]);
            }
        }

        // get all the campus managers acticities calendar of the player
        let allCampusManagersActivities = [];

        for (let i = 0; i < campusManagers.length; i++) {
            let campusManagerActivities = await campusManagerActivitiesRepo.getCampusManagerActivitiesCalendarByCampusManagerId(campusManagers[i].id);
            allCampusManagersActivities.push(campusManagerActivities);
        }

        // // for test
        // for (let i = 0; i < allCampusManagersActivities[0].length; i++) {
        //     let activtyTest = await activityRepo.getActivityById(allCampusManagersActivities[0][i].activity_id);
        //     console.log("10-campus manager activities: ", allCampusManagersActivities[0][i], activtyTest.mutators);

        // }

        // update all the indicators of the player from campus managers activities calendar mutators
        for (let i = 0; i < allCampusManagersActivities.length; i++) {
            let currentCampusManagerCalendar: CampusManagerActivitiesCalendar[] = allCampusManagersActivities[i];

            for (let j = 0; j < currentCampusManagerCalendar.length; j++) {
                let currentPeriod: CampusManagerActivitiesCalendar = currentCampusManagerCalendar[j];

                let currentActivity: Activity = await activityRepo.getActivityById(currentPeriod.activity_id);
                // console.log("11-activity: ", currentActivity);
                currentActivity.mutators.map(
                    (currentMutator: Mutator) => {
                        indicators.map(
                            (currentIndicator: Indicator) => {
                                if (currentIndicator.id == currentMutator.indicator_id) {
                                    currentIndicator.value += currentMutator.value;
                                }
                            }
                        );
                    }
                );
            }
        }
        // console.log("12-indicators: ", indicators);

        // delete the player campus managers calendars and all the activities
        for (let i = 0; i < campusManagers.length; i++) {
            let calendar = await campusManagerActivitiesRepo.getCampusManagerActivitiesCalendarByCampusManagerId(campusManagers[i].id);
            for (let j = 0; j < calendar.length; j++) {
                let activity = await activityRepo.getActivityById(calendar[j].activity_id);
                let response = await activityRepo.deleteActivity(activity);
            }
            for (let k = 0; k < calendar.length; k++) {
                let response = await campusManagerActivitiesRepo.deleteCampusManagerActivity(calendar[k]);
            }
        }

        /*
        update the cycles number of the player, limit to 20,
        when the player did 20 cycles, update the value of actual_students_number indicator to be equal to future_students_number indicator,
        reset the value of future_students_number indicator.
         */
        let player = await playerRepo.getPlayerById(req.body.player_id);
        if (player.cyclesNumber < CYCLES_PER_FORMATION) {
            player.cyclesNumber++;
        } else if (player.cyclesNumber >= CYCLES_PER_FORMATION) {
            player.cyclesNumber = 1;
            indicators[2].value = Number(futureStudents.toFixed(0));
            indicators[3].value -= futureStudents;
        }

        let response = await playerRepo.savePlayer(player);

        // save all the new values of the indicators
        await indicatorRepo.saveAllIndicators(indicators);

        res.send(indicators);
    }
    catch (e) {
        res.status(501).json(e);
    }
}
