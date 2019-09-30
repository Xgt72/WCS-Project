"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerTeacher_1 = require("../entities/PlayerTeacher");
const typeorm_1 = require("typeorm");
class PlayerTeacherRepository {
    getAllPlayersTeachers() {
        return typeorm_1.getManager().getRepository(PlayerTeacher_1.PlayerTeacher).find();
    }
    getOnePlayerTeachers(playerId) {
        return typeorm_1.getManager().getRepository(PlayerTeacher_1.PlayerTeacher).createQueryBuilder("pt").where("pt.id = :id", { id: playerId });
    }
    savePlayerTeacher(playerTeacher) {
        return typeorm_1.getManager().getRepository(PlayerTeacher_1.PlayerTeacher).save(playerTeacher);
    }
    deletePlayerTeacher(playerTeacher) {
        return typeorm_1.getManager().getRepository(PlayerTeacher_1.PlayerTeacher).remove(playerTeacher);
    }
    getPlayerTeacherById(playerTeacherId) {
        return typeorm_1.getManager().getRepository(PlayerTeacher_1.PlayerTeacher).findOne(playerTeacherId);
    }
}
exports.PlayerTeacherRepository = PlayerTeacherRepository;
//# sourceMappingURL=PlayerTeacherRepository.js.map