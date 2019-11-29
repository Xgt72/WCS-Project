import { Mutator } from "../entities/Mutator";
import { getManager } from "typeorm";

export class MutatorRepository {
    getAllMutators() {
        return getManager().getRepository(Mutator).find();
    }

    getMutatorByIndicatorId(indicatorId: number) {
        return getManager()
            .getRepository(Mutator)
            .createQueryBuilder("m")
            .where("m.indicator_id = :id", {id: indicatorId})
            .getMany();
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