import { Request, Response } from "express";
import { teacherTemplate } from "../models/Templates";
import { PlayerTeacher } from "../entities/PlayerTeacher";
import { PlayerTeacherRepository } from "../repositories/PlayerTeacherRepository";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
import { Mutator } from "../entities/Mutator";
import { MutatorRepository } from "../repositories/MutatorRepository";

let playerTeacherRepository = new PlayerTeacherRepository();
let indicatorRepository = new IndicatorRepository();
let mutatorRepository = new MutatorRepository();

export let hireTeacher = async (req: Request, res: Response) => {
    try {
        let numberOfPlayerTeacher = await playerTeacherRepository.getOnePlayerTeachers(req.body.playerId);
        let indicators = await indicatorRepository.getAllIndicatorsByPlayerId(req.body.playerId);
        let budgetIndicator = indicators.filter(indicator =>
            indicator.name == "budget"
        )[0];

        if (numberOfPlayerTeacher.length < 2 && (budgetIndicator.value - teacherTemplate.price) >= 0) {
            let teacher = new PlayerTeacher(req.body.playerId, req.body.teacherName, teacherTemplate.price);
            let mutators = Mutator.cloneListWithIndicators(teacherTemplate.mutators, indicators);
            if (mutators.length > 0) {
                for (let i = 0; i < mutators.length; i++) {
                    mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
                }

                teacher.mutators = mutators;
            }
            let playerTeacher = await playerTeacherRepository.savePlayerTeacher(teacher);


            budgetIndicator.value -= teacher.price;
            let updatedIndicator = await indicatorRepository.saveIndicator(budgetIndicator);

            res.send({ teacher: playerTeacher, budget: updatedIndicator });
        }
        else {
            res.json("You can not hire one more teacher or you do not have the necessary budget.");
        }
    }
    catch (e) {
        res.status(501).json(e);
    }
}