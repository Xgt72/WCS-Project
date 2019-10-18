import { PlayerTeacher } from "../entities/PlayerTeacher";
import { getManager } from "typeorm";

export class PlayerTeacherRepository {
    getAllPlayersTeachers() {
        return getManager()
            .getRepository(PlayerTeacher)
            .createQueryBuilder("pt")
            .innerJoinAndSelect("pt.mutators", "mutator")
            .getMany();
    }

    getOnePlayerTeachers(playerId: number) {
        return getManager()
            .getRepository(PlayerTeacher)
            .createQueryBuilder("pt")
            .innerJoinAndSelect("pt.mutators", "mutator")
            .where("pt.player_id = :id", { id: playerId })
            .getMany();
    }

    savePlayerTeacher(playerTeacher: PlayerTeacher) {
        return getManager().getRepository(PlayerTeacher).save(playerTeacher);
    }

    deletePlayerTeacher(playerTeacher: PlayerTeacher) {
        return getManager().getRepository(PlayerTeacher).remove(playerTeacher);
    }

    getPlayerTeacherById(playerTeacherId: number) {
        return getManager()
            .getRepository(PlayerTeacher)
            .createQueryBuilder("pt")
            .innerJoinAndSelect("pt.mutators", "mutator")
            .where("pt.id = :id", { id: playerTeacherId })
            .getOne();
    }
}