import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { getManager } from "typeorm";

export class CampusManagerActivitiesCalendarRepository {
    getAllCampusManagersActivitiesCalendar() {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .createQueryBuilder("cmac")
            .innerJoinAndSelect("cmac.mutators", "mutator")
            .getMany();
    }

    getCampusManagerActivitiesCalendarByCampusManagerId(campusManagerId: number) {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .createQueryBuilder("cmac")
            .innerJoinAndSelect("cmac.mutators", "mutator")
            .where("cmac.campus_manager_id = :id", {id: campusManagerId})
            .getMany();
    }

    getCampusManagerActivityCalendarById(id: number) {
        return getManager()
            .getRepository(CampusManagerActivitiesCalendar)
            .createQueryBuilder("cmac")
            .innerJoinAndSelect("cmac.mutators", "mutator")
            .where("cmac.id = :id", {id: id})
            .getOne();
    }

    saveCampusManagerActivity(campusManagerActivity: CampusManagerActivitiesCalendar) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).save(campusManagerActivity);
    }

    deleteCampusManagerActivity(campusManagerActivity: CampusManagerActivitiesCalendar) {
        return getManager().getRepository(CampusManagerActivitiesCalendar).remove(campusManagerActivity);
    }
}