import { Mutator } from "../entities/Mutator";
import { getManager } from "typeorm";

export class MutatorRepository {
    getAllMutators() {
        return getManager().getRepository(Mutator).find();
    }

    saveMutator(mutator: Mutator) {
        return getManager().getRepository(Mutator).save(mutator);
    }

    deleteMutator(mutator: Mutator) {
        return getManager().getRepository(Mutator).remove(mutator);
    }

    getMutatorById(mutatorId: number) {
        return getManager().getRepository(Mutator).findOne(mutatorId);
    }
}