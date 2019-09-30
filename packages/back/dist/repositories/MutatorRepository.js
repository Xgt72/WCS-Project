"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mutator_1 = require("../entities/Mutator");
const typeorm_1 = require("typeorm");
class MutatorRepository {
    getAllMutators() {
        return typeorm_1.getManager().getRepository(Mutator_1.Mutator).find();
    }
    saveMutator(mutator) {
        return typeorm_1.getManager().getRepository(Mutator_1.Mutator).save(mutator);
    }
    deleteMutator(mutator) {
        return typeorm_1.getManager().getRepository(Mutator_1.Mutator).remove(mutator);
    }
    getMutatorById(mutatorId) {
        return typeorm_1.getManager().getRepository(Mutator_1.Mutator).findOne(mutatorId);
    }
}
exports.MutatorRepository = MutatorRepository;
//# sourceMappingURL=MutatorRepository.js.map