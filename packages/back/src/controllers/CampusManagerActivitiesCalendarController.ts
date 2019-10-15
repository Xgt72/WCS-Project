import { Request, Response } from "express";
import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { MutatorRepository } from "../repositories/MutatorRepository";
import { CampusManagerActivitiesCalendarRepository } from "../repositories/CampusManagerActivitiesCalendarRepository";
let campusManagerActivitiesCalendarRepo = new CampusManagerActivitiesCalendarRepository();
let mutatorRepository = new MutatorRepository();

export let getAllCampusManagersActivitiesCalendar = async (req: Request, res: Response) => {
    try {
        let campusManagersActivitiesCalendar = await campusManagerActivitiesCalendarRepo.getAllCampusManagersActivitiesCalendar();
        res.send(campusManagersActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getCampusManagerActivityCalendarById = async (req: Request, res: Response) => {
    try {
        let campusManagerActivityCalendar = await campusManagerActivitiesCalendarRepo.getCampusManagerActivityCalendarById(req.body.id);
        res.send(campusManagerActivityCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getCampusManagerActivitiesCalendarByCampusManagerId = async (req: Request, res: Response) => {
    try {
        let campusManagerActivitiesCalendar = await campusManagerActivitiesCalendarRepo.getCampusManagerActivitiesCalendarByCampusManagerId(req.body.campusManagerId);
        res.send(campusManagerActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveCampusManagerActivity = async (req: Request, res: Response) => {
    try {
        let campusManagerActivitiesCalendar = new CampusManagerActivitiesCalendar(req.body.campus_manager_id, req.body.activity_id, req.body.morning, req.body.afternoon, req.body.day);
        let mutators = req.body.mutators || [];

        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            campusManagerActivitiesCalendar.mutators = mutators;
        }

        let result = await campusManagerActivitiesCalendarRepo.saveCampusManagerActivity(campusManagerActivitiesCalendar);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let updateCampusManagerActivityCalendar = async (req: Request, res: Response) => {
    try {
        let campusManagerActivityToUpdate = await campusManagerActivitiesCalendarRepo.getCampusManagerActivityCalendarById(req.body.id);
        if (req.body.teacher_id != null) {
            campusManagerActivityToUpdate.campus_manager_id = req.body.teacher_id;
        }
        if (req.body.activity_id != null) {
            campusManagerActivityToUpdate.activity_id = req.body.activity_id;
        }
        if (req.body.morning != null) {
            campusManagerActivityToUpdate.morning = req.body.morning;
        }
        if (req.body.afternoon != null) {
            campusManagerActivityToUpdate.afternoon = req.body.afternoon;
        }
        if (req.body.day != null) {
            campusManagerActivityToUpdate.day = req.body.day;
        }
        if (req.body.mutators != null) {
            campusManagerActivityToUpdate.mutators = req.body.mutators;
        }
        let response = await campusManagerActivitiesCalendarRepo.saveCampusManagerActivity(campusManagerActivityToUpdate);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let deleteCampusManagerAcitvityCalendar = async (req: Request, res: Response) => {
    try {
        let campusManagerActivityCalendar = await campusManagerActivitiesCalendarRepo.getCampusManagerActivityCalendarById(req.body.id);
        let response = await campusManagerActivitiesCalendarRepo.deleteCampusManagerActivity(campusManagerActivityCalendar);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}