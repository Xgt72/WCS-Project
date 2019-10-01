import { PlayerTeacher } from "../entities/PlayerTeacher";
import { getManager } from "typeorm";

export class PlayerTeacherRepository {
    getAllPlayersTeachers() {
        return getManager().getRepository(PlayerTeacher).find();
    }

    getOnePlayerTeachers(playerId: number) {
        return getManager().getRepository(PlayerTeacher).createQueryBuilder("pt").where("pt.id = :id", {id: playerId});
    }

    savePlayerTeacher(playerTeacher: PlayerTeacher) {
        return getManager().getRepository(PlayerTeacher).save(playerTeacher);
    }

    deletePlayerTeacher(playerTeacher: PlayerTeacher) {
        return getManager().getRepository(PlayerTeacher).remove(playerTeacher);
    }

    getPlayerTeacherById(playerTeacherId: number) {
        return getManager().getRepository(PlayerTeacher).findOne(playerTeacherId);
    }
}