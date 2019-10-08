import { Indicator } from "../entities/Indicator";
import { getManager } from "typeorm";

export class IndicatorRepository {
    getAllIndicators() {
        return getManager().getRepository(Indicator).find();
    }

    getAllIndicatorsByPlayerId(playerId: number) {
        return getManager().getRepository(Indicator).createQueryBuilder("indicator").where("indicator.player_id = :id", {id: playerId}).getMany();
    }

    saveAllIndicators(indicators: Indicator[]){
        return getManager().getRepository(Indicator).save(indicators);
    }

    saveIndicator(indicator: Indicator) {
        return getManager().getRepository(Indicator).save(indicator);
    }

    deleteIndicator(indicator: Indicator) {
        return getManager().getRepository(Indicator).remove(indicator);
    }

    getIndicatorById(indicatorId: number) {
        return getManager().getRepository(Indicator).findOne(indicatorId);
    }
}