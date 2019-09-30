"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerBuilding_1 = require("../entities/PlayerBuilding");
const typeorm_1 = require("typeorm");
class PlayerBuildingsRepository {
    getAllPlayersBuildings() {
        return typeorm_1.getManager().getRepository(PlayerBuilding_1.PlayerBuilding).find();
    }
    getOnePlayerBuildings(playerId) {
        return typeorm_1.getManager().getRepository(PlayerBuilding_1.PlayerBuilding).createQueryBuilder("pb").where("pb.id = :id", { id: playerId });
    }
    savePlayerBuilding(playerBuilding) {
        return typeorm_1.getManager().getRepository(PlayerBuilding_1.PlayerBuilding).save(playerBuilding);
    }
    deletePlayerBuilding(playerBuilding) {
        return typeorm_1.getManager().getRepository(PlayerBuilding_1.PlayerBuilding).remove(playerBuilding);
    }
    getPlayerBuildingById(playerBuildingId) {
        return typeorm_1.getManager().getRepository(PlayerBuilding_1.PlayerBuilding).findOne(playerBuildingId);
    }
}
exports.PlayerBuildingsRepository = PlayerBuildingsRepository;
//# sourceMappingURL=PlayerBuildingsRepository.js.map