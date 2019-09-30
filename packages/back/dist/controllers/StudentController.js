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
const util_1 = require("util");
const Student_1 = require("../entities/Student");
const StudentRepository_1 = require("../repositories/StudentRepository");
const BaseResponse_1 = require("../BaseResponse");
exports.getAllStudents = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("GET => GetAllStudents");
    let studRepo = new StudentRepository_1.StudentRepository();
    let baseResponse = new BaseResponse_1.BaseResponse();
    try {
        let students = yield studRepo.getAllStudents();
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify(students);
        res.send(students);
    }
    catch (e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(e);
    }
});
exports.saveStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("POST => SaveStudent");
    let studRepo = new StudentRepository_1.StudentRepository();
    let baseResponse = new BaseResponse_1.BaseResponse();
    try {
        let student = new Student_1.Student(req.body.firstName, req.body.lastName, req.body.school);
        let result = yield studRepo.saveStudent(student);
        console.log(result);
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify('success');
        res.json(result);
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(util_1.inspect(e));
    }
});
exports.deleteStudent = (req, res) => __awaiter(this, void 0, void 0, function* () {
    console.log("DELETE => DeleteStudent");
    let studRepo = new StudentRepository_1.StudentRepository();
    let baseResponse = new BaseResponse_1.BaseResponse();
    try {
        let studentId = yield studRepo.getStudentById(req.body.id);
        let result = yield studRepo.deleteStudent(studentId);
        console.log(result);
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify('success');
    }
    catch (e) {
        console.log(util_1.inspect(e));
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(util_1.inspect(e));
    }
    res.send(baseResponse);
});
//# sourceMappingURL=StudentController.js.map