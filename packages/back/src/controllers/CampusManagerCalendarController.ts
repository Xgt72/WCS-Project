import { Request, Response } from "express";
import { CampusManagerActivitiesCalendarRepository } from "../repositories/CampusManagerActivitiesCalendarRepository";
import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { Mutator } from "../entities/Mutator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { PlayerCampusManagerRepository } from "../repositories/PlayerCampusManagerRepository";
import { ActivityRepository } from "../repositories/ActivityRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";
import { REPUTATION, BUDGET, ACTUAL_STUDENTS_NUMBER, FUTURE_STUDENTS_NUMBER, FORECAST_SALES_TURNOVER } from "../constants";


let campusManagerCalendarRepo = new CampusManagerActivitiesCalendarRepository();
let indicatorRepo = new IndicatorRepository();
let playerCampusManagerRepo = new PlayerCampusManagerRepository();
let activityRepo = new ActivityRepository();
let mutatorRepo = new MutatorRepository();

export let addActivitiesInCampusManagerCalendar = async (req: Request, res: Response) => {
    try {
        // get the player id of this campus manager
        let response = await playerCampusManagerRepo.getPlayerCampusManagerById(req.body.campus_manager_id);
        let playerId = response.player_id;

        // get the indicators of this player
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(playerId);

        // activities to add
        let updatedActivities: CampusManagerActivitiesCalendar[] = req.body.activities;

        // Create new activities
        for (let i = 0; i < updatedActivities.length; i++) {
            // console.log("updatedActivities length and i and activity_id: ", updatedActivities.length, i, updatedActivities[i].activity_id);
            let activity = await activityRepo.getActivityById(updatedActivities[i].activity_id);
            activity.id = null;
            // console.log("Activity to create: ", activity);

            switch (activity.name) {
                case "Wild Breakfast":
                    activity.mutators.map(
                        (mutator: Mutator) => {
                            if (mutator.name == "inc" + FUTURE_STUDENTS_NUMBER) {
                                // get random number between 5 and 10, get 75% of this number, get 20% of this number, get 70% of this number
                                let transformation: number = Number(((Math.floor(Math.random() * 5) + 5) * 0.75 * 0.20 * 0.7).toFixed(2));
                                mutator.value = transformation;
                            }
                            return mutator;
                        }
                    )
                    break;
                case "Organise RNCP":
                    activity.mutators.map(
                        (mutator: Mutator) => {
                            if (mutator.name == "inc" + FUTURE_STUDENTS_NUMBER) {
                                // get random number between 10 and 30, get 80% of this number, get 20% of this number, get 70% of this number
                                let transformation: number = Number(((Math.floor(Math.random() * 20) + 10) * 0.8 * 0.20 * 0.7).toFixed(2));
                                mutator.value = transformation;
                            }
                            return mutator;
                        }
                    )
                    break;
                case "Buy Publicities":
                    activity.mutators.map(
                        (mutator: Mutator) => {
                            if (mutator.name == "inc" + FUTURE_STUDENTS_NUMBER) {
                                // get random number between 10 and 25, get 10% of this number, get 20% of this number, get 70% of this number
                                let transformation: number = Number(((Math.floor(Math.random() * 15) + 10) * 0.1 * 0.20 * 0.7).toFixed(2));
                                mutator.value = transformation;
                            }
                            return mutator;
                        }
                    )
                    break;
                case "Wild Aperitif":
                    activity.mutators.map(
                        (mutator: Mutator) => {
                            if (mutator.name == "inc" + FUTURE_STUDENTS_NUMBER) {
                                // get random number between 5 and 10, get 50% of this number, get 20% of this number, get 70% of this number
                                let transformation: number = Number(((Math.floor(Math.random() * 5) + 5) * 0.5 * 0.20 * 0.7).toFixed(2));
                                mutator.value = transformation;
                            }
                            return mutator;
                        }
                    )
                    break;
                case "Networking":
                    activity.mutators.map(
                        (mutator: Mutator) => {
                            if (mutator.name == "inc" + FUTURE_STUDENTS_NUMBER) {
                                // get random number between 10 and 25, get 10% of this number, get 20% of this number, get 70% of this number
                                let transformation: number = Number(((Math.floor(Math.random() * 15) + 10) * 0.1 * 0.20 * 0.7).toFixed(2));
                                mutator.value = transformation;
                            }
                            return mutator;
                        }
                    )
                    break;
                case "Organize a Trade Fair":
                    activity.mutators.map(
                        (mutator: Mutator) => {
                            if (mutator.name == "inc" + FUTURE_STUDENTS_NUMBER) {
                                // get random number between 25 and 50, get 10% of this number, get 20% of this number, get 70% of this number
                                let transformation: number = Number(((Math.floor(Math.random() * 25) + 25) * 0.1 * 0.20 * 0.7).toFixed(2));
                                mutator.value = transformation;
                            }
                            return mutator;
                        }
                    )
                    break;
            }

            let mutators = Mutator.cloneListWithIndicators(activity.mutators, indicators);
            if (mutators.length > 0) {
                for (let i = 0; i < mutators.length; i++) {
                    mutators[i] = await mutatorRepo.saveMutator(mutators[i]);
                }
                activity.mutators = mutators;
            }
            activity = await activityRepo.saveActivity(activity);

            updatedActivities[i].activity_id = activity.id;
        }
        // console.log("Activities: ", updatedActivities);
        // for (let i = 0; i < updatedActivities.length; i++) {
        //     let activityTest = await activityRepo.getActivityById( updatedActivities[i].activity_id);
        //     console.log("Activity Mutators: ", activityTest.mutators);

        // }

        // add the new lines in the calendar
        for (let i = 0; i < updatedActivities.length; i++) {
            if (updatedActivities[i].morning) {
                let morningActivity: CampusManagerActivitiesCalendar = await campusManagerCalendarRepo.getActivityByCampusManagerIdByDayByMorning(
                    req.body.teacher_id, updatedActivities[i].day
                );
                if (morningActivity != null) {
                    updatedActivities[i].id = morningActivity.id;
                }
            } else if (updatedActivities[i].afternoon) {
                let afternoonActivity: CampusManagerActivitiesCalendar = await campusManagerCalendarRepo.getActivityByCampusManagerIdByDayByAfternoon(
                    req.body.teacher_id, updatedActivities[i].day
                );
                if (afternoonActivity != null) {
                    updatedActivities[i].id = afternoonActivity.id;
                }
            }
        }

        let campusManagerCalendar: CampusManagerActivitiesCalendar[] = await campusManagerCalendarRepo.saveMultipleActivitiesCampusManager(updatedActivities);
        res.send(campusManagerCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}