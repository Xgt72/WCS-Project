import { PlayerCampusManager } from "../entities/PlayerCampusManager";
import { getManager } from "typeorm";

export class PlayerCampusManagerRepository {
    getAllPlayersCampusManagers() {
        return getManager().getRepository(PlayerCampusManager).find();
    }

    getOnePlayerCampusManagers(playerId: number) {
        return getManager().getRepository(PlayerCampusManager).createQueryBuilder("pt").where("pt.player_id = :id", {id: playerId}).getMany();
    }

    savePlayerCampusManager(playerCampusManager: PlayerCampusManager) {
        return getManager().getRepository(PlayerCampusManager).save(playerCampusManager);
    }

    deletePlayerCampusManager(playerCampusManager: PlayerCampusManager) {
        return getManager().getRepository(PlayerCampusManager).remove(playerCampusManager);
    }

    getPlayerCampusManagerById(playerCampusManagerId: number) {
        return getManager().getRepository(PlayerCampusManager).findOne(playerCampusManagerId);
    }
}