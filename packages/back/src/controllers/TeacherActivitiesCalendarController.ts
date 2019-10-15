import { Request, Response } from "express";
import { TeacherActivitiesCalendar } from "../entities/TeacherActivitiesCalendar";
import { MutatorRepository } from "../repositories/MutatorRepository";
import { TeacherActivitiesCalendarRepository } from "../repositories/TeacherActivitiesCalendarRepository";
let teacherActivitiesCalendarRepo = new TeacherActivitiesCalendarRepository();
let mutatorRepository = new MutatorRepository();

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
        let teacherActivityCalendar = await teacherActivitiesCalendarRepo.getTeacherActivityCalendarById(req.body.id);
        res.send(teacherActivityCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getTeacherActivitiesCalendarByTeacherId = async (req: Request, res: Response) => {
    try {
        let teacherActivitiesCalendar = await teacherActivitiesCalendarRepo.getTeacherActivitiesCalendarByTeacherId(req.body.teacherId);
        res.send(teacherActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveTeacherActivity = async (req: Request, res: Response) => {
    try {
        let teachersActivitiesCalendar = new TeacherActivitiesCalendar(req.body.teacher_id, req.body.activity_id, req.body.morning, req.body.afternoon, req.body.day);
        let mutators = req.body.mutators || [];

        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            teachersActivitiesCalendar.mutators = mutators;
        }

        let result = await teacherActivitiesCalendarRepo.saveTeacherActivity(teachersActivitiesCalendar);
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
        if (req.body.mutators != null) {
            teacherActivityToUpdate.mutators = req.body.mutators;
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
        let teacherActivityCalendar = await teacherActivitiesCalendarRepo.getTeacherActivityCalendarById(req.body.id);
        let response = await teacherActivitiesCalendarRepo.deleteTeacherActivity(teacherActivityCalendar);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}