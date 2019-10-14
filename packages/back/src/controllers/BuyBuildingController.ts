import { Request, Response } from "express";
import { PlayerBuildingsRepository } from "../repositories/PlayerBuildingsRepository";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { Mutator } from "../entities/Mutator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { Indicator } from "../entities/Indicator";
let buidlindRepo = new PlayerBuildingsRepository();
let indicatorRepo = new IndicatorRepository();

export let buyBuilding = async (req: Request, res: Response) => {
    try {
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(req.body.playerId);

        let buidldingTemplate = await buidlindRepo.getBuildingTemplateById(1);
        
        let buildingPlayer = new PlayerBuilding(req.body.playerId, buidldingTemplate.name, buidldingTemplate.price);
        buildingPlayer.mutators = Mutator.cloneListWithIndicators(buidldingTemplate.mutators, indicators);
        let building = await buidlindRepo.savePlayerBuilding(buildingPlayer);

        let budgetIndicator = indicators.filter(indicator => 
            indicator.name == "budget"
        )[0];

        budgetIndicator.value -= buildingPlayer.price;
        let updatedIndicator = await indicatorRepo.saveIndicator(budgetIndicator);

        res.send({building: building, budget: updatedIndicator});
    }
    catch(e) {
        res.status(501).json(e);
    }

}