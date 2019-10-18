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

let indicatorRepo = new IndicatorRepository();
let buildingRepo = new PlayerBuildingsRepository();
let teacherRepo = new PlayerTeacherRepository();
let campusManagerRepo = new PlayerCampusManagerRepository();
let campusManagerActivitiesRepo = new CampusManagerActivitiesCalendarRepository();

export let doCycle = async (req: Request, res: Response) => {
    try {
        // get all indicators of the player
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(req.body.player_id);

        // get all the buildings of the player
        let buildings = await buildingRepo.getOnePlayerBuildings(req.body.player_id);

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

        // get all the teachers of the player
        let teachers = await teacherRepo.getOnePlayerTeachers(req.body.player_id);

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

        // get all the campus managers of the player
        let campusManagers = await campusManagerRepo.getOnePlayerCampusManagers(req.body.player_id);
        
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

        // get all the teachers activities calendar of the player
        
        // update all the indicators of the player from teachers activities calendar mutators
        
        // get all the campus managers acticities calendar of the player
        let allCampusManagersActivities = [];
        for (let i = 0; i < campusManagers.length; i++) {
            let campusManagerActivities = await campusManagerActivitiesRepo.getCampusManagerActivitiesCalendarByCampusManagerId(campusManagers[i].id);
            allCampusManagersActivities.push(campusManagerActivities);
        }
        console.log("Activities: ", allCampusManagersActivities);
        
        
        // update all the indicators of the player from campus managers activities calendar mutators
        
        
        // save all the new values of the indicators
        console.log("Indicators: ", indicators);
        await indicatorRepo.saveAllIndicators(indicators);

        res.send(indicators);
    }
    catch (e) {
        res.status(501).json(e);
    }
}
