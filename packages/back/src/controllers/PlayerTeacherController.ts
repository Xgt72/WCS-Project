import { Request, Response } from "express";
import { PlayerTeacher } from "../entities/PlayerTeacher";
import { PlayerTeacherRepository } from "../repositories/PlayerTeacherRepository";
import { request } from "https";
let playerTeacherRepo = new PlayerTeacherRepository();

export let getAllPlayersTeachers = async (req: Request, res: Response) => {
    try {
        let playersTeachers = await playerTeacherRepo.getAllPlayersTeachers();
        res.send(playersTeachers);
    }
    catch(e) {
        res.json(e);
    }
 }

 export let getOnePlayerTeachers = async (req: Request, res: Response) => {
     try {
         let playerTeachers = await playerTeacherRepo.getOnePlayerTeachers(req.body.player_id);
         res.send(playerTeachers);
     }
     catch(e) {
         res.json(e);
     }
 }

 export let getPlayerTeacherById = async (req: Request, res: Response) => {
     try {
        let playerTeacher = await playerTeacherRepo.getPlayerTeacherById(req.body.id);
     res.send(playerTeacher); 
     }
     catch(e) {
         res.json(e);
     }   
 }

 export let savePlayerTeacher = async (req: Request, res: Response) => {
     try {
         let playerTeacher = new PlayerTeacher(req.body.player_id, req.body.name, req.body.price);
         let result = await playerTeacherRepo.savePlayerTeacher(playerTeacher);
         res.send(result);
     }
     catch(e) {
         res.json(e);
     }
 }

 export let deletePlayerTeacher = async (req: Request, res: Response) => {
     try {
         let playerTeacher = await playerTeacherRepo.getPlayerTeacherById(req.body.id);
         let result = await playerTeacherRepo.deletePlayerTeacher(playerTeacher);
         res.send(result);
     }
     catch(e) {
         res.json(e);
     }
 }

 export let updatePlayerTeacher = async (req: Request, res: Response) => {
     try {
        let playerTeacher = await playerTeacherRepo.getPlayerTeacherById(req.body.id);
        if(req.body.player_id != null) {
            playerTeacher.player_id = req.body.player_id;
        }
        if(req.body.name != null) {
            playerTeacher.name = req.body.name;
        }
        if(req.body.price != null) {
            playerTeacher.price = req.body.price;
        }
        let result = await playerTeacherRepo.savePlayerTeacher(playerTeacher);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
 }