import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";
import { getManager } from "typeorm";

export class TeacherActivitiesCalendarRepository {
    getAllTeachersActivitiesCalendar() {
        return getManager()
            .getRepository(TeacherActivitiesCalendar)
            .find();
    }

    getTeacherActivitiesCalendarByTeacherId(teacherId: number) {
        return getManager()
            .getRepository(TeacherActivitiesCalendar)
            .createQueryBuilder("tac")
            .where("tac.teacher_id = :id", { id: teacherId })
            .getMany();
    }

    getTeacherActivityCalendarById(id: number) {
        return getManager()
            .getRepository(TeacherActivitiesCalendar)
            .findOne(id);
    }

    getActivityByTeacherIdByDayByMorning(teacherId: number, day: number) {
        return getManager()
        .getRepository(TeacherActivitiesCalendar)
        .createQueryBuilder("tac")
        .where("tac.teacher_id = :id AND tac.day = :day AND tac.morning = true", { id: teacherId, day: day })
        .getOne();
    }

    getActivityByTeacherIdByDayByAfternoon(teacherId: number, day: number) {
        return getManager()
        .getRepository(TeacherActivitiesCalendar)
        .createQueryBuilder("tac")
        .where("tac.teacher_id = :id AND tac.day = :day AND tac.afternoon = true", { id: teacherId, day: day })
        .getOne();
    }

    saveTeacherActivity(teacherActivity: TeacherActivitiesCalendar) {
        return getManager().getRepository(TeacherActivitiesCalendar).save(teacherActivity);
    }

    saveMultipleActivitiesTeacher(teacherActivities: TeacherActivitiesCalendar[]) {
        return getManager().getRepository(TeacherActivitiesCalendar).save(teacherActivities);
    }

    deleteTeacherActivity(teacherActivity: TeacherActivitiesCalendar) {
        return getManager().getRepository(TeacherActivitiesCalendar).remove(teacherActivity);
    }
}