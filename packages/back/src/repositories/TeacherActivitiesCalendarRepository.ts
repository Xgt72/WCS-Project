import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";
import { getManager } from "typeorm";

export class TeacherActivitiesCalendarRepository {
    getAllTeachersActivitiesCalendar() {
        return getManager()
            .getRepository(TeacherActivitiesCalendar)
            .createQueryBuilder("tac")
            .innerJoinAndSelect("tac.mutators", "mutator")
            .getMany();
    }

    getTeacherActivitiesCalendarByTeacherId(teacherId: number) {
        return getManager()
            .getRepository(TeacherActivitiesCalendar)
            .createQueryBuilder("tac")
            .innerJoinAndSelect("tac.mutators", "mutator")
            .where("tac.teacher_id = :id", {id: teacherId})
            .getMany();
    }

    getTeacherActivityCalendarById(id: number) {
        return getManager()
            .getRepository(TeacherActivitiesCalendar)
            .createQueryBuilder("tac")
            .innerJoinAndSelect("tac.mutators", "mutator")
            .where("tac.id = :id", {id: id})
            .getOne();
    }

    saveTeacherActivity(teacherActivity: TeacherActivitiesCalendar) {
        return getManager().getRepository(TeacherActivitiesCalendar).save(teacherActivity);
    }

    deleteTeacherActivity(teacherActivity: TeacherActivitiesCalendar) {
        return getManager().getRepository(TeacherActivitiesCalendar).remove(teacherActivity);
    }
}