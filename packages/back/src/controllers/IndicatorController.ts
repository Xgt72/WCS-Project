import { Request, Response } from "express";
import { Indicator } from "../entities/Indicator";
import { IndicatorRepository } from "../repositories/IndicatorRepository";
let indicatorRepo = new IndicatorRepository();

export let getAllIndicators = async (req: Request, res: Response) => {
    try {
        let indicators = await indicatorRepo.getAllIndicators();
        res.send(indicators);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let getIndicatorsByPlayerId = async (req: Request, res: Response) => {
    try {
        let indicators = await indicatorRepo.getAllIndicatorsByPlayerId(parseInt(req.params.id));
        res.send(indicators);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let getIndicatorById = async (req: Request, res: Response) => {
    try {
        let indicator = await indicatorRepo.getIndicatorById(parseInt(req.params.id));
        res.send(indicator);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let getAllIndicatorsByPlayerIdAndName = async (req: Request, res: Response) => {
    try {
        let indicator = await indicatorRepo.getAllIndicatorsByPlayerIdAndName(parseInt(req.params.id), req.params.name);
        res.send(indicator);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let saveIndicator = async (req: Request, res: Response) => {
    try {
        let indicator = new Indicator(req.body.name, req.body.player_id, req.body.value);
        let result = await indicatorRepo.saveIndicator(indicator);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let saveAllIndicators = async (req: Request, res: Response) => {
    try {
        let indicators = req.body.map((indicator: Indicator) => indicator);
        let result = await indicatorRepo.saveAllIndicators(indicators);
        res.send(result);
    }
    catch (e) {
        res.status(501).json(e);
    }
}

export let deleteIndicator = async (req: Request, res: Response) => {
    try {
        let indicator = await indicatorRepo.getIndicatorById(parseInt(req.params.id));
        let result = await indicatorRepo.deleteIndicator(indicator);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}

export let updateIndicator = async (req: Request, res: Response) => {
    try {
        let indicator = await indicatorRepo.getIndicatorById(req.body.id);
        if(req.body.name != null) {
            indicator.name = req.body.name;
        }
        if(req.body.player_id != null) {
            indicator.player_id = req.body.player_id;
        }
        if(req.body.value != null) {
            indicator.value = req.body.value;
        }
        let result = await indicatorRepo.saveIndicator(indicator);
        res.send(result);
    }
    catch(e) {
        res.status(501).json(e);
    }
}