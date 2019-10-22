import { Request, Response } from "express";
import { TeacherActivitiesCalendarRepository } from "../repositories/TeacherActivitiesCalendarRepository";
import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";

let teacherCalendarRepo = new TeacherActivitiesCalendarRepository();

export let addActivitiesInTeacherCalendar = async (req: Request, res: Response) => {
    try {
        let updatedActivities: TeacherActivitiesCalendar[] = req.body.activities;
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

        let updatedTeacherrCalendar: TeacherActivitiesCalendar[] = await teacherCalendarRepo.saveMultipleActivitiesTeacher(updatedActivities);
        res.send(updatedTeacherrCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}