import { Request, Response } from "express";
import { Activity } from "../entities/Activity";
import { ActivityRepository } from "../repositories/ActivityRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";
import { Mutator } from "../entities/Mutator";

let activityRepo = new ActivityRepository();
let mutatorRepository = new MutatorRepository();


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
        let mutators = req.body.mutators || [];

        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            activity.mutators = mutators;
        }

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
    
        activities.map((activity: Activity) => {
            if (activity.mutators != null) {
                activity.mutators.map(async (mutator: Mutator) => {
                    mutator = await mutatorRepository.saveMutator(mutator);
                });
            }
        });

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