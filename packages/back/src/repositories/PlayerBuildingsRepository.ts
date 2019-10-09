import { PlayerBuilding } from "../entities/PlayerBuilding";
import { getManager } from "typeorm";

export class PlayerBuildingsRepository {
    getAllPlayersBuildings() {
        return getManager().getRepository(PlayerBuilding).find();
    }

    getOnePlayerBuildings(playerId: number) {
        return getManager().getRepository(PlayerBuilding).createQueryBuilder("pb").where("pb.player_id = :id", {id: playerId}).getMany();
    }

    getAllBuildingTemplates() {
        return getManager().getRepository(PlayerBuilding).createQueryBuilder("pb").where("pb.isTemplate = true").getMany();
    }

    savePlayerBuilding(playerBuilding: PlayerBuilding) {
        return getManager().getRepository(PlayerBuilding).save(playerBuilding);
    }

    deletePlayerBuilding(playerBuilding: PlayerBuilding) {
        return getManager().getRepository(PlayerBuilding).remove(playerBuilding);
    }

    getPlayerBuildingById(playerBuildingId: number) {
        return getManager().getRepository(PlayerBuilding).findOne(playerBuildingId);
    }
}