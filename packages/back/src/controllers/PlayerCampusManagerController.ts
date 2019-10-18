import { Request, Response } from "express";
import { PlayerCampusManager } from "../entities/PlayerCampusManager";
import { PlayerCampusManagerRepository } from "../repositories/PlayerCampusManagerRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";
import bodyParser = require("body-parser");

let playerCampusManagerRepo = new PlayerCampusManagerRepository();
let mutatorRepository = new MutatorRepository();

export let getAllPlayersCampusManagers = async (req: Request, res: Response) => {
    try {
        let playersCampusManagers = await playerCampusManagerRepo.getAllPlayersCampusManagers();
        res.send(playersCampusManagers);
    }
    catch(e) {
        res.status(501).json(e);
    }
 }

 export let getOnePlayerCampusManagers = async (req: Request, res: Response) => {
     try {
         let playerCampusManagers = await playerCampusManagerRepo.getOnePlayerCampusManagers(req.body.player_id);
         res.send(playerCampusManagers);
     }
     catch(e) {
         res.status(501).json(e);
     }
 }

 export let getPlayerCampusManagerById = async (req: Request, res: Response) => {
     try {
        let playerCampusManager = await playerCampusManagerRepo.getPlayerCampusManagerById(req.body.id);
     res.send(playerCampusManager); 
     }
     catch(e) {
         res.status(501).json(e);
     }   
 }

 export let savePlayerCampusManager = async (req: Request, res: Response) => {
     try {
         let playerCampusManager = new PlayerCampusManager(req.body.player_id, req.body.name, req.body.price);

         let mutators = req.body.mutators || [];

         if (mutators.length > 0) {
             for (let i = 0; i < mutators.length; i++) {
                 mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
             }
             playerCampusManager.mutators = mutators;
         }

         let result = await playerCampusManagerRepo.savePlayerCampusManager(playerCampusManager);
         res.send(result);
     }
     catch(e) {
         res.status(501).json(e);
     }
 }

 export let deletePlayerCampusManager = async (req: Request, res: Response) => {
     try {
         let playerCampusManager = await playerCampusManagerRepo.getPlayerCampusManagerById(req.body.id);
         let result = await playerCampusManagerRepo.deletePlayerCampusManager(playerCampusManager);
         res.send(result);
     }
     catch(e) {
         res.status(501).json(e);
     }
 }

 export let updatePlayerCampusManager = async (req: Request, res: Response) => {
     try {
        let playerCampusManager = await playerCampusManagerRepo.getPlayerCampusManagerById(req.body.id);
        if(req.body.player_id != null) {
            playerCampusManager.player_id = req.body.player_id;
        }
        if(req.body.name != null) {
            playerCampusManager.name = req.body.name;
        }
        if(req.body.price != null) {
            playerCampusManager.price = req.body.price;
        }
        if (req.body.mutators != null) {
            if (req.body.mutators.length > 0) {
                for (let i = 0; i < req.body.mutators.length; i++) {
                    req.body.mutators[i] = await mutatorRepository.saveMutator(req.body.mutators[i]);
                }
                playerCampusManager.mutators = req.body.mutators;
            }
        }
        let result = await playerCampusManagerRepo.savePlayerCampusManager(playerCampusManager);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
 }