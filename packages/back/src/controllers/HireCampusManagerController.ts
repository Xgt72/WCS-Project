import { Request, Response } from "express";
import { campusManagerTemplate } from "../models/Templates";
import { PlayerCampusManager } from "../entities/PlayerCampusManager";
import { PlayerCampusManagerRepository } from "../repositories/PlayerCampusManagerRepository";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { Mutator } from "../entities/Mutator";
import { MutatorRepository } from "../repositories/MutatorRepository";

let playerCaMaRepository = new PlayerCampusManagerRepository();
let indicatorRepository = new IndicatorRepository();
let mutatorRepository = new MutatorRepository();

export let hireCampusManager = async (req: Request, res: Response) => {
    try {
        // get the number of campus managers for the player 
        let numberOfPlayerCampusManager = await playerCaMaRepository.getOnePlayerCampusManagers(req.body.player_id);

        // get all the player indicators
        let indicators = await indicatorRepository.getAllIndicatorsByPlayerId(req.body.player_id);

        // get the budget indicator
        let budgetIndicator = await indicatorRepository.getAllIndicatorsByPlayerIdAndName(req.body.player_id, "budget");

        // if the player don't have the budget to hire the campus manager, he can not hire a campus manager
        if (budgetIndicator.value - campusManagerTemplate.price < 0) {
            res.json("You can't hire this campus manager, you don't have the necessary budget.");
            return;
        }

        // if the player already have 2 campus manager, he can not hire an other
        if (numberOfPlayerCampusManager.length >= 2) {
            res.json("You already have two campus managers, you can't hire one more.");
            return;
        }

        // creation of the new campus manager
        let campusManager = new PlayerCampusManager(req.body.player_id, req.body.campusManagerName, campusManagerTemplate.price);
        let mutators = Mutator.cloneListWithIndicators(campusManagerTemplate.mutators, indicators);
        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            campusManager.mutators = mutators;
        }
        let playerCampusManager = await playerCaMaRepository.savePlayerCampusManager(campusManager);

        // update of the budget indicator
        budgetIndicator.value -= campusManager.price;
        let updatedIndicator = await indicatorRepository.saveIndicator(budgetIndicator);

        res.send({ campusManager: playerCampusManager, budget: updatedIndicator });
    }
    catch (e) {
        res.status(501).json(e);
    }
}