import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginValidation } from "../jwtToken/validation";
import { PlayerRepository } from "../repositories/PlayerRepository";

let playerRepo = new PlayerRepository();

export let playerLogin = async (req: Request, res: Response) => {
    try {
        //Validation of the user
        const validation = loginValidation(req.body);
        if (validation.error) return res.status(400).send(validation.error.details[0].message);
        //Checking if the email exists in database
        let player = await playerRepo.getPlayerByEmail(req.body.email);
        if (!player) return res.status(400).send("Email or password is wrong");
        //Password is correct
        const validPass = await bcrypt.compare(req.body.password, player.password);
        if (!validPass) return res.status(400).send("Email or password is wrong");
        //Create and assign a token
        const token = jwt.sign({ id: player.id }, process.env.TOKEN_SECRET, { expiresIn: 3600 });
        res.setHeader('auth-token', token);
        res.json(player);
    }
    catch (e) {
        res.status(501).json(e);
    }
};