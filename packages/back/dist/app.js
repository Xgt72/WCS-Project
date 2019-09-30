"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const typeorm_1 = require("typeorm");
/**
 * Controllers (route handlers).
 */
const studentController = __importStar(require("./controllers/StudentController"));
/**
 * Create Express server.
 */
const app = express_1.default();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 5000);
/**
 * Start Express server.
 */
app.listen(app.get("port"), (err) => {
    if (err) {
        console.error(`ERROR: ${err.message}`);
    }
    else {
        console.log(`Listening on port ${app.get("port")}`);
    }
});
/**
 * Primary app routes.
 */
app.get("/getAllStudents", studentController.getAllStudents);
app.post("/saveStudent", studentController.saveStudent);
app.delete("/deleteStudent", studentController.deleteStudent);
/**
 * Create connection to DB using configuration provided in app-config file.
 */
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log("Connected to DB");
})).catch(error => console.log("TypeORM connection error: ", error));
module.exports = app;
//# sourceMappingURL=app.js.map