import { Request, Response } from "express";
import { Mutator } from "../entities/Mutator";
import { MutatorRepository } from "../repositories/MutatorRepository";
let mutatorRepo = new MutatorRepository();

export let getAllMutators = async (req: Request, res: Response) => {
    try {
        let mutators = await mutatorRepo.getAllMutators();
        res.send(mutators);
    }
    catch(e) {
        res.json(e);
    }
}

export let getMutatorsById = async (req: Request, res: Response) => {
    try {
        let mutator = await mutatorRepo.getMutatorById(req.body.id);
        res.send(mutator);
    }
    catch(e) {
        res.json(e);
    }
}

export let saveMutator = async (req: Request, res: Response) => {
    try {
        let mutator = new Mutator(req.body.name, req.body.indicator_id, req.body.value);
        let result = await mutatorRepo.saveMutator(mutator);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
}

export let deleteMutator = async (req: Request, res: Response) => {
    try {
        let mutator = await mutatorRepo.getMutatorById(req.body.id);
        let result = await mutatorRepo.deleteMutator(mutator);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
}

export let updateMutator = async (req: Request, res: Response) => {
    try {
        let mutator = await mutatorRepo.getMutatorById(req.body.id);
        if(req.body.name != null) {
            mutator.name = req.body.name;
        }
        if(req.body.indicator_id != null) {
            mutator.indicator_id = req.body.indicator_id;
        }
        if(req.body.value != null) {
            mutator.value = req.body.value;
        }
        let result = await mutatorRepo.saveMutator(mutator);
        res.send(result);
    }
    catch(e) {
        res.json(e);
    }
}