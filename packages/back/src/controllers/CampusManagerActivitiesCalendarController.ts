import { Request, Response } from "express";
import { CampusManagerActivitiesCalendar } from "../entities/CampusManagerActivitiesCalendar";
import { CampusManagerActivitiesCalendarRepository } from "../repositories/CampusManagerActivitiesCalendarRepository";

let campusManagerActivitiesCalendarRepo = new CampusManagerActivitiesCalendarRepository();

export let getAllCampusManagersActivitiesCalendar = async (req: Request, res: Response) => {
    try {
        let campusManagersActivitiesCalendar = await campusManagerActivitiesCalendarRepo
            .getAllCampusManagersActivitiesCalendar();
        res.send(campusManagersActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getCampusManagerActivityCalendarById = async (req: Request, res: Response) => {
    try {
        let campusManagerActivityCalendar = await campusManagerActivitiesCalendarRepo
            .getCampusManagerActivityCalendarById(parseInt(req.params.id));
        res.send(campusManagerActivityCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getCampusManagerActivitiesCalendarByCampusManagerId = async (req: Request, res: Response) => {
    try {
        let campusManagerActivitiesCalendar = await campusManagerActivitiesCalendarRepo
            .getCampusManagerActivitiesCalendarByCampusManagerId(parseInt(req.params.id));
        res.send(campusManagerActivitiesCalendar);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getActivitiesByCampusManagerIdAndByDayByPeriod = async (req: Request, res: Response) => {
    try {
        let activities: CampusManagerActivitiesCalendar = undefined;
        if (req.params.period == "morning") {
            activities = await campusManagerActivitiesCalendarRepo
                .getActivityByCampusManagerIdByDayByMorning(parseInt(req.params.id), parseInt(req.params.day));
        } else if (req.params.period == "afternoon") {
            activities = await campusManagerActivitiesCalendarRepo
                .getActivityByCampusManagerIdByDayByAfternoon(parseInt(req.params.id), parseInt(req.params.day));
        }
        res.send(activities);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveCampusManagerActivity = async (req: Request, res: Response) => {
    try {
        let campusManagerActivitiesCalendar = new CampusManagerActivitiesCalendar(
            req.body.campus_manager_id,
            req.body.activity_id,
            req.body.morning,
            req.body.afternoon,
            req.body.day
        );
        let result = await campusManagerActivitiesCalendarRepo
            .saveCampusManagerActivity(campusManagerActivitiesCalendar);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveMultipleActivitiesCampusManager = async (req: Request, res: Response) => {
    try {
        let activities: CampusManagerActivitiesCalendar[] = [];
        req.body.activities.forEach((activity: any) => {
            activities.push(new CampusManagerActivitiesCalendar(
                req.body.campus_manager_id,
                activity.activity_id,
                activity.morning,
                activity.afternoon,
                activity.day
            ));
        });

        let result = await campusManagerActivitiesCalendarRepo
            .saveMultipleActivitiesCampusManager(activities);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let updateCampusManagerActivityCalendar = async (req: Request, res: Response) => {
    try {
        let campusManagerActivityToUpdate = await campusManagerActivitiesCalendarRepo
            .getCampusManagerActivityCalendarById(req.body.id);
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
        let response = await campusManagerActivitiesCalendarRepo
            .saveCampusManagerActivity(campusManagerActivityToUpdate);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let deleteCampusManagerAcitvityCalendar = async (req: Request, res: Response) => {
    try {
        let campusManagerActivityCalendar = await campusManagerActivitiesCalendarRepo
            .getCampusManagerActivityCalendarById(parseInt(req.params.id));
        let response = await campusManagerActivitiesCalendarRepo
            .deleteCampusManagerActivity(campusManagerActivityCalendar);
        res.send(response);
    }
    catch (e) {
        res.status(501).json(e);
    }
}