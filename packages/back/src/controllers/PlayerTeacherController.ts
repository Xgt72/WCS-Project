import { Request, Response } from "express";
import { PlayerTeacher } from "../entities/PlayerTeacher";
import { PlayerTeacherRepository } from "../repositories/PlayerTeacherRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";

let playerTeacherRepo = new PlayerTeacherRepository();
let mutatorRepository = new MutatorRepository();

export let getAllPlayersTeachers = async (req: Request, res: Response) => {
    try {
        let playersTeachers = await playerTeacherRepo.getAllPlayersTeachers();
        res.send(playersTeachers);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getOnePlayerTeachers = async (req: Request, res: Response) => {
    try {
        let playerTeachers = await playerTeacherRepo.getOnePlayerTeachers(req.body.player_id);
        res.send(playerTeachers);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getPlayerTeacherById = async (req: Request, res: Response) => {
    try {
        let playerTeacher = await playerTeacherRepo.getPlayerTeacherById(req.body.id);
        res.send(playerTeacher);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let savePlayerTeacher = async (req: Request, res: Response) => {
    try {
        let playerTeacher = new PlayerTeacher(req.body.player_id, req.body.name, req.body.price);

        let mutators = req.body.mutators || [];

        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }
            playerTeacher.mutators = mutators;
        }

        let result = await playerTeacherRepo.savePlayerTeacher(playerTeacher);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let deletePlayerTeacher = async (req: Request, res: Response) => {
    try {
        let playerTeacher = await playerTeacherRepo.getPlayerTeacherById(req.body.id);
        let result = await playerTeacherRepo.deletePlayerTeacher(playerTeacher);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let updatePlayerTeacher = async (req: Request, res: Response) => {
    try {
        let playerTeacher = await playerTeacherRepo.getPlayerTeacherById(req.body.id);
        if (req.body.player_id != null) {
            playerTeacher.player_id = req.body.player_id;
        }
        if (req.body.name != null) {
            playerTeacher.name = req.body.name;
        }
        if (req.body.price != null) {
            playerTeacher.price = req.body.price;
        }
        if (req.body.mutators != null) {
            if (req.body.mutators.length > 0) {
                for (let i = 0; i < req.body.mutators.length; i++) {
                    req.body.mutators[i] = await mutatorRepository.saveMutator(req.body.mutators[i]);
                }
                playerTeacher.mutators = req.body.mutators;
            }
        }
        let result = await playerTeacherRepo.savePlayerTeacher(playerTeacher);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}