import { Request, Response } from "express";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { PlayerBuildingsRepository } from "../repositories/PlayerBuildingsRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";
let playerBuildingsRepo = new PlayerBuildingsRepository();
let mutatorRepository = new MutatorRepository();

export let getAllPlayersBuildings = async (req: Request, res: Response) => {
    try {
        let playersBuildings = await playerBuildingsRepo.getAllPlayersBuildings();
        res.send(playersBuildings);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getOnePlayerBuildings = async (req: Request, res: Response) => {
    try {
        let playerBuildings = await playerBuildingsRepo.getOnePlayerBuildings(req.body.player_id);
        res.send(playerBuildings);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getPlayerBuildingById = async (req: Request, res: Response) => {
    try {
        let playerBuilding = await playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        res.send(playerBuilding);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let getAllBuildingTemplates = async (req: Request, res: Response) => {
    try {
        let buildingTemplates = await playerBuildingsRepo.getAllBuildingTemplates();
        res.send(buildingTemplates);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let savePlayerBuilding = async (req: Request, res: Response) => {
    try {
        let playerBuilding = new PlayerBuilding(req.body.player_id, req.body.name, req.body.price, req.body.isTemplate);
        let mutators = req.body.mutators || [];

        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            playerBuilding.mutators = mutators;
        }

        let result = await playerBuildingsRepo.savePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let deletePlayerBuilding = async (req: Request, res: Response) => {
    try {
        let playerBuilding = await playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        let result = await playerBuildingsRepo.deletePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let updatePlayerBuilding = async (req: Request, res: Response) => {
    try {
        let playerBuilding = await playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        if (req.body.name != null) {
            playerBuilding.name = req.body.name;
        }
        if (req.body.player_id != null) {
            playerBuilding.player_id = req.body.player_id;
        }
        if (req.body.price != null) {
            playerBuilding.price = req.body.price;
        }
        if (req.body.mutators != null) {
            if (req.body.mutators.length > 0) {
                for (let i = 0; i < req.body.mutators.length; i++) {
                    req.body.mutators[i] = await mutatorRepository.saveMutator(req.body.mutators[i]);
                }
                playerBuilding.mutators = req.body.mutators;
            }
        }
        let result = await playerBuildingsRepo.savePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}