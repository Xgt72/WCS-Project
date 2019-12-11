import { Request, Response } from "express";
import { TeacherActivitiesCalendarRepository } from "../repositories/TeacherActivitiesCalendarRepository";
import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";
import { Mutator } from "../entities/Mutator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { PlayerTeacherRepository } from "../repositories/PlayerTeacherRepository";
import { ActivityRepository } from "../repositories/ActivityRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";

let teacherCalendarRepo = new TeacherActivitiesCalendarRepository();
let indicatorRepo = new IndicatorRepository();
let playerTeacherRepo = new PlayerTeacherRepository();
let activityRepo = new ActivityRepository();
let mutatorRepo = new MutatorRepository();

export let addActivitiesInTeacherCalendar = async (req: Request, res: Response) => {
    try {
        // get the player id of this teacher
        let response = await playerTeacherRepo.getPlayerTeacherById(req.body.teacher_id);
        let playerId = response.player_id;

        // get the indicators of this player
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(playerId);

        // activities to add
        let updatedActivities: TeacherActivitiesCalendar[] = req.body.activities;

        // Create new activities
        for (let i = 0; i < updatedActivities.length; i++) {
            let activity = await activityRepo.getActivityById(updatedActivities[i].activity_id);
            activity.id = null;
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

        // add the new lines in the calendar
        for (let i = 0; i < updatedActivities.length; i++) {
            if (updatedActivities[i].morning) {
                let morningActivity: TeacherActivitiesCalendar = await teacherCalendarRepo.getActivityByTeacherIdByDayByMorning(
                    req.body.teacher_id, updatedActivities[i].day
                );
                if (morningActivity != null) {
                    updatedActivities[i].id = morningActivity.id;
                }
            } else if (updatedActivities[i].afternoon) {
                let afternoonActivity: TeacherActivitiesCalendar = await teacherCalendarRepo.getActivityByTeacherIdByDayByAfternoon(
                    req.body.teacher_id, updatedActivities[i].day
                );
                if (afternoonActivity != null) {
                    updatedActivities[i].id = afternoonActivity.id;
                }
            }
            
        }

        let teacherCalendar: TeacherActivitiesCalendar[] = await teacherCalendarRepo.saveMultipleActivitiesTeacher(updatedActivities);// the problem is here
        res.send(teacherCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}