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
const PlayerBuilding_1 = require("../entities/PlayerBuilding");
const PlayerBuildingsRepository_1 = require("../repositories/PlayerBuildingsRepository");
let playerBuildingsRepo = new PlayerBuildingsRepository_1.PlayerBuildingsRepository();
exports.getAllPlayersBuildings = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let playersBuildings = yield playerBuildingsRepo.getAllPlayersBuildings();
        res.send(playersBuildings);
    }
    catch (e) {
        res.json(e);
    }
});
exports.getOnePlayerBuildings = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let playerBuildings = yield playerBuildingsRepo.getOnePlayerBuildings(req.body.id);
        res.send(playerBuildings);
    }
    catch (e) {
        res.json(e);
    }
});
exports.getPlayerBuildingById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let playerBuilding = yield playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        res.send(playerBuilding);
    }
    catch (e) {
        res.json(e);
    }
});
exports.savePlayerBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let playerBuilding = new PlayerBuilding_1.PlayerBuilding(req.body.player_id, req.body.name, req.body.price);
        let result = yield playerBuildingsRepo.savePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
exports.deletePlayerBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let playerBuilding = yield playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        let result = yield playerBuildingsRepo.deletePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
exports.updatePlayerBuilding = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        let playerBuilding = yield playerBuildingsRepo.getPlayerBuildingById(req.body.id);
        if (req.body.name != null) {
            playerBuilding.name = req.body.name;
        }
        if (req.body.player_id != null) {
            playerBuilding.player_id = req.body.player_id;
        }
        if (req.body.price != null) {
            playerBuilding.price = req.body.price;
        }
        let result = yield playerBuildingsRepo.savePlayerBuilding(playerBuilding);
        res.send(result);
    }
    catch (e) {
        res.json(e);
    }
});
//# sourceMappingURL=PlayerBuildingsControllers.js.map