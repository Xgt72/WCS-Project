import { Request, Response } from "express";
import { Player } from "../entities/Player";
import { PlayerRepository } from "../repositories/PlayerRepository";
let playerRepo = new PlayerRepository();

export let getAllPlayers = async (req: Request, res: Response) => {
    try {
        let players = await playerRepo.getAllPlayers();
        res.send(players);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let getPlayerById = async (req: Request, res: Response) => {
    try {
        let player = await playerRepo.getPlayerById(parseInt(req.params.id));
        res.send(player);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let savePlayer = async (req: Request, res: Response) => {
    try {
        let player = new Player(req.body.playerName);
        let response = await playerRepo.savePlayer(player);
        res.send(response);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let updatePlayer = async (req: Request, res: Response) => {
    try {
        let player = await playerRepo.getPlayerById(req.body.id);
        if (req.body.playerName != null) {
            player.playerName = req.body.playerName;
        }
        let result = await playerRepo.savePlayer(player);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let deletePlayer = async (req: Request, res: Response) => {
    try {
        let player = await playerRepo.getPlayerById(parseInt(req.params.id));
        let result = await playerRepo.deletePlayer(player);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}