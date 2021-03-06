import { Request, Response } from "express";
import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";
import { TeacherActivitiesCalendarRepository } from "../repositories/TeacherActivitiesCalendarRepository";
import { ActivityRepository } from "../repositories/ActivityRepository";


let teacherActivitiesCalendarRepo = new TeacherActivitiesCalendarRepository();
let activityRepo = new ActivityRepository();

export let getAllTeachersActivitiesCalendar = async (req: Request, res: Response) => {
    try {
        let teachersActivitiesCalendar = await teacherActivitiesCalendarRepo.getAllTeachersActivitiesCalendar();
        res.send(teachersActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getTeacherActivityCalendarById = async (req: Request, res: Response) => {
    try {
        let teacherActivityCalendar = await teacherActivitiesCalendarRepo.getTeacherActivityCalendarById(parseInt(req.params.id));
        res.send(teacherActivityCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getTeacherActivitiesCalendarByTeacherId = async (req: Request, res: Response) => {
    try {
        let teacherActivitiesCalendar = await teacherActivitiesCalendarRepo.getTeacherActivitiesCalendarByTeacherId(parseInt(req.params.id));
        res.send(teacherActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getActivitiesByTeacherIdAndByDayByPeriod = async (req: Request, res: Response) => {
    try {
        let activities: TeacherActivitiesCalendar = undefined;
        if (req.params.period == "morning") {
            activities = await teacherActivitiesCalendarRepo.getActivityByTeacherIdByDayByMorning(parseInt(req.params.id), parseInt(req.params.day));
        } else if (req.params.period == "afternoon") {
            activities = await teacherActivitiesCalendarRepo.getActivityByTeacherIdByDayByAfternoon(parseInt(req.params.id), parseInt(req.params.day));
        }
        res.send(activities);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveTeacherActivity = async (req: Request, res: Response) => {
    try {
        let teachersActivitiesCalendar = new TeacherActivitiesCalendar(req.body.teacher_id, req.body.activity_id, req.body.morning, req.body.afternoon, req.body.day);
        let result = await teacherActivitiesCalendarRepo.saveTeacherActivity(teachersActivitiesCalendar);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveMultipleActivitiesTeacher = async (req: Request, res: Response) => {
    try {
        let activities: TeacherActivitiesCalendar[] = [];
        req.body.activities.forEach((activity: any) => {
            activities.push(new TeacherActivitiesCalendar(req.body.teacher_id, activity.activity_id, activity.morning, activity.afternoon, activity.day));
        });

        let result = await teacherActivitiesCalendarRepo.saveMultipleActivitiesTeacher(activities);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let updateTeacherActivityCalendar = async (req: Request, res: Response) => {
    try {
        let teacherActivityToUpdate = await teacherActivitiesCalendarRepo.getTeacherActivityCalendarById(req.body.id);
        if (req.body.teacher_id != null) {
            teacherActivityToUpdate.teacher_id = req.body.teacher_id;
        }
        if (req.body.activity_id != null) {
            teacherActivityToUpdate.activity_id = req.body.activity_id;
        }
        if (req.body.morning != null) {
            teacherActivityToUpdate.morning = req.body.morning;
        }
        if (req.body.afternoon != null) {
            teacherActivityToUpdate.afternoon = req.body.afternoon;
        }
        if (req.body.day != null) {
            teacherActivityToUpdate.day = req.body.day;
        }
        let response = await teacherActivitiesCalendarRepo.saveTeacherActivity(teacherActivityToUpdate);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let deleteTeacherAcitvityCalendar = async (req: Request, res: Response) => {
    try {
        let teacherActivityCalendar = await teacherActivitiesCalendarRepo
            .getTeacherActivityCalendarById(parseInt(req.params.id));
        let activityToDelete = await activityRepo
            .getActivityById(teacherActivityCalendar.activity_id);
        let activityDeleted = await activityRepo
            .deleteActivity(activityToDelete);
        let response = await teacherActivitiesCalendarRepo
            .deleteTeacherActivity(teacherActivityCalendar);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}