import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { getManager } from "typeorm";

export class CampusManagerActivitiesCalendarRepository {
    getAllCampusManagersActivitiesCalendar() {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .find();
    }

    getCampusManagerActivitiesCalendarByCampusManagerId(campusManagerId: number) {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .createQueryBuilder("cmac")
            .where("cmac.campus_manager_id = :id", { id: campusManagerId })
            .getMany();
    }

    getCampusManagerActivityCalendarById(id: number) {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .createQueryBuilder("cmac")
            .where("cmac.id = :id", { id: id })
            .getOne();
    }

    getActivityByCampusManagerIdByDayByMorning(campusManagerId: number, day: number) {
        return getManager()
        .getRepository(CampusManagerActivitiesCalendar)
        .createQueryBuilder("cmac")
        .where("cmac.campus_manager_id = :id AND cmac.day = :day AND cmac.morning = true", { id: campusManagerId, day: day })
        .getOne();
    }

    getActivityByCampusManagerIdByDayByAfternoon(campusManagerId: number, day: number) {
        return getManager()
        .getRepository(CampusManagerActivitiesCalendar)
        .createQueryBuilder("cmac")
        .where("cmac.campus_manager_id = :id AND cmac.day = :day AND cmac.afternoon = true", { id: campusManagerId, day: day })
        .getOne();
    }

    saveCampusManagerActivity(campusManagerActivity: CampusManagerActivitiesCalendar) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).save(campusManagerActivity);
    }

    saveMultipleActivitiesCampusManager(campusManagerActivities: CampusManagerActivitiesCalendar[]) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).save(campusManagerActivities);
    }

    deleteCampusManagerActivity(campusManagerActivity: CampusManagerActivitiesCalendar) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).remove(campusManagerActivity);
    }
}