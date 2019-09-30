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
const Indicator_1 = require("../entities/Indicator");
const IndicatorRepository_1 = require("../repositories/IndicatorRepository");
let indicatorRepo = new IndicatorRepository_1.IndicatorRepository();
exports.getAllIndicators = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicators = yield indicatorRepo.getAllIndicators();
        res.send(indicators);
    }
    catch (e) {
        res.json(e);
    }
});
exports.getIndicatorsByPlayerId = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicators = yield indicatorRepo.getAllIndicatorsByPlayerId(req.body.player_id);
        res.send(indicators);
    }
    catch (e) {
        res.json(e);
    }
});
exports.getIndicatorById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicator = yield indicatorRepo.getIndicatorById(req.body.id);
        res.send(indicator);
    }
    catch (e) {
        res.json(e);
    }
});
exports.saveIndicator = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicator = new Indicator_1.Indicator(req.body.name, req.body.player_id, req.body.value);
        let result = yield indicatorRepo.saveIndicator(indicator);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
exports.deleteIndicator = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicator = yield indicatorRepo.getIndicatorById(req.body.id);
        let result = yield indicatorRepo.deleteIndicator(indicator);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
exports.updateIndicator = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let indicator = yield indicatorRepo.getIndicatorById(req.body.id);
        if (req.body.name != null) {
            indicator.name = req.body.name;
        }
        if (req.body.player_id != null) {
            indicator.player_id = req.body.player_id;
        }
        if (req.body.value != null) {
            indicator.value = req.body.value;
        }
        let result = yield indicatorRepo.saveIndicator(indicator);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
//# sourceMappingURL=IndicatorController.js.map