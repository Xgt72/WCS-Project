import { Request, Response } from "express";
import { PlayerBuildingsRepository } from "../repositories/PlayerBuildingsRepository";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { Mutator } from "../entities/Mutator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { MutatorRepository } from "../repositories/MutatorRepository";
let buildingRepo = new PlayerBuildingsRepository();
let indicatorRepo = new IndicatorRepository();
let mutatorRepository = new MutatorRepository();

export let buyBuilding = async (req: Request, res: Response) => {
    try {
        // get all indicators for the player
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerIdAndName(req.body.player_id, "budget");
        let budgetIndicator = indicators[0];

        // get the building template
        let currentTemplate = await buildingRepo.getBuildingTemplateById(req.body.building_template_id);

        // if the player don't have the budget to buy the new building
        if (budgetIndicator.value - currentTemplate.price < 0) {
            res.json("You can not buy this building you do not have the necessary budget.");
            return;
        }

        // get all the buildings of the player
        let playerBuildings = await buildingRepo.getOnePlayerBuildings(req.body.player_id);

        // if the player already have the same type of building
        for (let i = 0; i < playerBuildings.length; i++) {
            if (playerBuildings[i].name == currentTemplate.name) {
                res.json("You already have this building.");
                return;
            }
        }

        // creation of the new building
        let buildingPlayer = new PlayerBuilding(req.body.player_id, currentTemplate.name, currentTemplate.price);
        let mutators = Mutator.cloneListWithIndicators(currentTemplate.mutators, indicators);
        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            buildingPlayer.mutators = mutators;
        }
        let building = await buildingRepo.savePlayerBuilding(buildingPlayer);

        // update of the budget indicator
        budgetIndicator.value -= buildingPlayer.price;
        let updatedIndicator = await indicatorRepo.saveIndicator(budgetIndicator);

        res.send({ building: building, budget: updatedIndicator });

    }
    catch (e) {
        res.status(501).json(e);
    }

}