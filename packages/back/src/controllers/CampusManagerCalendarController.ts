import { Request, Response } from "express";
import { CampusManagerActivitiesCalendarRepository } from "../repositories/CampusManagerActivitiesCalendarRepository";
import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";

let campusManagerCalendarRepo = new CampusManagerActivitiesCalendarRepository();

export let addActivitiesInCampusManagerCalendar = async (req: Request, res: Response) => {
    try {
        let updatedActivities: CampusManagerActivitiesCalendar[] = req.body.activities;
        for (let i = 0; i < updatedActivities.length; i++) {
            if (updatedActivities[i].morning) {
                let morningActivity: CampusManagerActivitiesCalendar = await campusManagerCalendarRepo.getActivityByCampusManagerIdByDayByMorning(
                    req.body.campus_manager_id, updatedActivities[i].day
                );
                if (morningActivity != null) {
                    updatedActivities[i].id = morningActivity.id;
                }
            } else if (updatedActivities[i].afternoon) {
                let afternoonActivity: CampusManagerActivitiesCalendar = await campusManagerCalendarRepo.getActivityByCampusManagerIdByDayByAfternoon(
                    req.body.campus_manager_id, updatedActivities[i].day
                );
                if (afternoonActivity != null) {
                    updatedActivities[i].id = afternoonActivity.id;
                }
            }
        }

        let updatedCampusManagerCalendar: CampusManagerActivitiesCalendar[] = await campusManagerCalendarRepo.saveMultipleActivitiesCampusManager(updatedActivities);
        res.send(updatedCampusManagerCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}