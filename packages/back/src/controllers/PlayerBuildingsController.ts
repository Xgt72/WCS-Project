import { Request, Response } from "express";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { PlayerBuildingsRepository } from "../repositories/PlayerBuildingsRepository";
let playerBuildingsRepo = new PlayerBuildingsRepository();

export let getAllPlayersBuildings = async (req: Request, res: Response) => {
    try {
        let playersBuildings = await playerBuildingsRepo.getAllPlayersBuildings();
        res.send(playersBuildings);
    }
    catch(e) {
        res.json(e);
    }
}

export let getOnePlayerBuildings = async (req: Request, res: Response) => {
    try {
        let playerBuildings = await playerBuildingsRepo.getOnePlayerBuildings(req.body.player_id);
        res.send(playerBuildings);
    }
    catch(e) {
        res.json(e);
    }
}

export let getPlayerBuildingById = async (req: Request, res: Response) => {
    try {
        let playerBuilding = await playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        res.send(playerBuilding);
    }
    catch(e) {
        res.json(e);
    }
}

export let savePlayerBuilding = async (req: Request, res: Response) => {
    try {
        let playerBuilding = new PlayerBuilding(req.body.player_id, req.body.name, req.body.price);
        let result = await playerBuildingsRepo.savePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
}

export let deletePlayerBuilding = async (req: Request, res: Response) => {
    try {
        let playerBuilding = await playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        let result = await playerBuildingsRepo.deletePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
}

export let updatePlayerBuilding = async (req: Request, res: Response) => {
    try {
        let playerBuilding = await playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        if(req.body.name != null) {
            playerBuilding.name = req.body.name;
        }
        if(req.body.player_id != null) {
            playerBuilding.player_id = req.body.player_id;
        }
        if(req.body.price != null) {
            playerBuilding.price = req.body.price;
        }
        let result = await playerBuildingsRepo.savePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
}