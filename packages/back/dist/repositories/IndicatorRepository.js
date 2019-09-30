"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Indicator_1 = require("../entities/Indicator");
const typeorm_1 = require("typeorm");
class IndicatorRepository {
    getAllIndicators() {
        return typeorm_1.getManager().getRepository(Indicator_1.Indicator).find();
    }
    getAllIndicatorsByPlayerId(playerId) {
        return typeorm_1.getManager().getRepository(Indicator_1.Indicator).createQueryBuilder("indicator").where("indicator.player_id = :id", { id: playerId });
    }
    saveIndicator(indicator) {
        return typeorm_1.getManager().getRepository(Indicator_1.Indicator).save(indicator);
    }
    deleteIndicator(indicator) {
        return typeorm_1.getManager().getRepository(Indicator_1.Indicator).remove(indicator);
    }
    getIndicatorById(indicatorId) {
        return typeorm_1.getManager().getRepository(Indicator_1.Indicator).findOne(indicatorId);
    }
}
exports.IndicatorRepository = IndicatorRepository;
//# sourceMappingURL=IndicatorRepository.js.map