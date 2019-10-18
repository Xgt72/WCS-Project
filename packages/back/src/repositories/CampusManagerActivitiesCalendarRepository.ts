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
            .findOne(campusManagerId);
    }

    getCampusManagerActivityCalendarById(id: number) {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .createQueryBuilder("cmac")
            .where("cmac.id = :id", { id: id })
            .getOne();
    }

    saveCampusManagerActivity(campusManagerActivity: CampusManagerActivitiesCalendar) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).save(campusManagerActivity);
    }

    deleteCampusManagerActivity(campusManagerActivity: CampusManagerActivitiesCalendar) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).remove(campusManagerActivity);
    }
}