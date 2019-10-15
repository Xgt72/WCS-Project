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