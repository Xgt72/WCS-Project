import { Player } from "../entities/Player";
import { getManager } from "typeorm";

export class PlayerRepository {
    getAllPlayers() {
        return getManager().getRepository(Player).find();
    }

    getPlayerById(id: number) {
        return getManager().getRepository(Player).findOne(id);
    }

    getPlayerByEmail(email: string) {
        return getManager()
            .getRepository(Player)
            .createQueryBuilder("p")
            .where("p.email = :email", { email: email })
            .getOne();
    }

    savePlayer(player: Player) {
        return getManager().getRepository(Player).save(player);
    }

    deletePlayer(player: Player) {
        return getManager().getRepository(Player).remove(player);
    }
}