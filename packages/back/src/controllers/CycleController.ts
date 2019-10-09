import { Request, Response } from "express";
import { Indicator } from "../entities/Indicator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { PlayerBuildingsRepository } from "../repositories/PlayerBuildingsRepository";
import { PlayerBuilding } from "../entities/PlayerBuilding";
import { Mutator } from "../entities/Mutator";
let indicatorRepo = new IndicatorRepository();
let buildingRepo = new PlayerBuildingsRepository();

export let doCycle = async (req: Request, res: Response) => {
    try {
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(req.body.player_id);
        // console.log("Indicators: ", indicators)
        let buildings = await buildingRepo.getOnePlayerBuildings(req.body.player_id); 
        // console.log("Buildings: ", buildings);

        buildings.map(
            (currentBuilding:PlayerBuilding) => {
                currentBuilding.mutators.map(
                    (currentMutator:Mutator) => {
                        indicators.map(
                            (currentIndicator:Indicator) => {
                                if( currentIndicator.id == currentMutator.indicator_id ){
                                    currentIndicator.value += currentMutator.value;
                                }
                            }
                        );
                    }
                );
            }
        ); 

        await indicatorRepo.saveAllIndicators(indicators);
        // console.log("Indicators Updated: ", indicators);
        res.send(indicators);
    }
    catch(e) {
        res.status(501).json(e);
    }
}
