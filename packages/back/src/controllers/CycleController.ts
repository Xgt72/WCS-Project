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
        // get all indicators of the player
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(req.body.player_id);

        // get all the buildings of the player
        let buildings = await buildingRepo.getOnePlayerBuildings(req.body.player_id); 

        // update all the indicators of the player
        buildings.map(
            (currentBuilding:PlayerBuilding) => {

                if( currentBuilding.isTemplate )
                    return; 
                    
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
        
        // save all the new values of the indicators
        await indicatorRepo.saveAllIndicators(indicators);

        res.send(indicators);
    }
    catch(e) {
        res.status(501).json(e);
    }
}
