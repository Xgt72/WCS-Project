import { Request, Response } from "express";
import { Player } from "../entities/Player";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { IndicatorRepository } from "../repositories/IndicatorRepository";

let playerRepo = new PlayerRepository();
let indicatorRepo = new IndicatorRepository();
let playerId: number = 0;

export let createPlayer = async (req: Request, res: Response) => {
    try {
        // create the new player
        let player = await playerRepo.savePlayer(new Player(req.body.player_name));
        playerId = player.id;

        // get all the indicators templates
        let reputation = await indicatorRepo.getIndicatorById(1);
        let budget = await indicatorRepo.getIndicatorById(2);
        let studentsNumber = await indicatorRepo.getIndicatorById(3);
        let futureStudentsNumber = await indicatorRepo.getIndicatorById(4);
        let forecastSalesTurnover = await indicatorRepo.getIndicatorById(5);

        // create all the indicators of this new player
        reputation.id = null;
        reputation.player_id = playerId;

        budget.id = null;
        budget.player_id = playerId;

        studentsNumber.id = null;
        studentsNumber.player_id = playerId;

        futureStudentsNumber.id = null;
        futureStudentsNumber.player_id = playerId;

        forecastSalesTurnover.id = null;
        forecastSalesTurnover.player_id = playerId;

        let indicators = await indicatorRepo.saveAllIndicators(
            [
                reputation,
                budget,
                studentsNumber,
                futureStudentsNumber,
                forecastSalesTurnover
            ]
        );

        // return the new player with his indicators
        res.send({ player: player, indicators: indicators });
    }
    catch (e) {
        res.status(501).json(e);
    }
}