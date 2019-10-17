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
        // get the number of teachers for the player 
        let numberOfPlayerTeacher = await playerTeacherRepository.getOnePlayerTeachers(req.body.playerId);

        // get all the player indicators
        let indicators = await indicatorRepository.getAllIndicatorsByPlayerId(req.body.playerId);

        // get the budget indicator
        let budgetIndicator = await indicatorRepository.getAllIndicatorsByPlayerIdAndName(req.body.playerId, "budget");

        // if the player don't have the budget to hire the teacher, he can not hire a teacher
        if (budgetIndicator.value - teacherTemplate.price < 0) {
            res.json("You can't hire this teacher, you don't have the necessary budget.");
            return;
        }

        // if the player already have 2 teachers, he can not hire an other
        if (numberOfPlayerTeacher.length >= 2) {
            res.json("You already have two teachers, you can't hire one more.");
            return;
        }

        // creation of the new teacher
        let teacher = new PlayerTeacher(req.body.playerId, req.body.teacherName, teacherTemplate.price);
        let mutators = Mutator.cloneListWithIndicators(teacherTemplate.mutators, indicators);
        if (mutators.length > 0) {
            for (let i = 0; i < mutators.length; i++) {
                mutators[i] = await mutatorRepository.saveMutator(mutators[i]);
            }

            teacher.mutators = mutators;
        }
        let playerTeacher = await playerTeacherRepository.savePlayerTeacher(teacher);

        // update of the budget indicator
        budgetIndicator.value -= teacher.price;
        let updatedIndicator = await indicatorRepository.saveIndicator(budgetIndicator);

        res.send({ teacher: playerTeacher, budget: updatedIndicator });
    }
    catch (e) {
        res.status(501).json(e);
    }
}