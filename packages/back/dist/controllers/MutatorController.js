"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mutator_1 = require("../entities/Mutator");
const MutatorRepository_1 = require("../repositories/MutatorRepository");
let mutatorRepo = new MutatorRepository_1.MutatorRepository();
exports.getAllMutators = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let mutators = yield mutatorRepo.getAllMutators();
        res.send(mutators);
    }
    catch (e) {
        res.json(e);
    }
});
exports.getMutatorsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let mutator = yield mutatorRepo.getMutatorById(req.body.id);
        res.send(mutator);
    }
    catch (e) {
        res.json(e);
    }
});
exports.saveMutator = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let mutator = new Mutator_1.Mutator(req.body.name, req.body.player_id, req.body.value);
        let result = yield mutatorRepo.saveMutator(mutator);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
exports.deleteMutator = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicator = yield mutatorRepo.getMutatorById(req.body.id);
        let result = yield mutatorRepo.deleteMutator(indicator);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
exports.updateMutator = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let mutator = yield mutatorRepo.getMutatorById(req.body.id);
        if (req.body.name != null) {
            mutator.name = req.body.name;
        }
        if (req.body.indicator_id != null) {
            mutator.indicator_id = req.body.indicator_id;
        }
        if (req.body.value != null) {
            mutator.value = req.body.value;
        }
        let result = yield mutatorRepo.saveMutator(mutator);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
//# sourceMappingURL=MutatorController.js.map