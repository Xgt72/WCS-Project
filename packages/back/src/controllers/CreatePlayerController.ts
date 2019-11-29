import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { registerValidation } from "../jwtToken/validation";
import { Player } from "../entities/Player";
import { PlayerRepository } from "../repositories/PlayerRepository";
import { IndicatorRepository } from "../repositories/IndicatorRepository";

let playerRepo = new PlayerRepository();
let indicatorRepo = new IndicatorRepository();
let playerId: number = 0;

export let createPlayer = async (req: Request, res: Response) => {
    try {
        // Validation of the user
        const validation = registerValidation(req.body);
        if (validation.error) return res.status(400).send(validation.error.details[0].message);
        const { player_name, email, password } = req.body;

        // Checking if the user is already in database
        let player = await playerRepo.getPlayerByEmail(email);
        if (player) return res.status(400).send("Email already exists");

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the new player
        player = await playerRepo.savePlayer(new Player(player_name, email, hashedPassword));
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