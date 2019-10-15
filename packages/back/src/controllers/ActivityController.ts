import { Request, Response } from "express";
import { Activity } from "../entities/Activity";
import { ActivityRepository } from "../repositories/ActivityRepository";
let activityRepo = new ActivityRepository();


export let getAllActivities = async (req: Request, res: Response) => {
    try {
        let activities = await activityRepo.getAllActivities();
        res.send(activities);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let getActivityById = async (req: Request, res: Response) => {
    try {
        let activity = await activityRepo.getActivityById(req.body.id);
        res.send(activity);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let saveActivity = async (req: Request, res: Response) => {
    try {
        let activity = new Activity(req.body.name, req.body.value, req.body.color);
        let result = await activityRepo.saveActivity(activity);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let saveAllActivities = async (req: Request, res: Response) => {
    try {
        let activities: Activity[] = req.body;       
        let result = await activityRepo.saveAllActivities(activities);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let deleteActivity = async (req: Request, res: Response) => {
    try {
        let activity = await activityRepo.getActivityById(req.body.id);
        let result = await activityRepo.deleteActivity(activity);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let updateActivity = async (req: Request, res: Response) => {
    try {
        let activity = await activityRepo.getActivityById(req.body.id);
        if(req.body.name != null) {
            activity.name = req.body.name;
        }
        if(req.body.value != null) {
            activity.value = req.body.value;
        }
        if(req.body.color != null) {
            activity.color = req.body.color;
        }
        let result = await activityRepo.saveActivity(activity);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}