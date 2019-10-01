import { Request, Response } from "express";
import { inspect } from 'util';
import { Student } from "../entities/Student";
import { StudentRepository } from "../repositories/StudentRepository";
import { BaseResponse } from "../BaseResponse";

export let getAllStudents = async (req: Request, res: Response) => {
    console.log("GET => GetAllStudents");
    let studRepo: StudentRepository = new StudentRepository();
    let baseResponse: BaseResponse = new BaseResponse();

    try{
        let students = await studRepo.getAllStudents();
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify(students);
        res.send(students);
    }
    catch(e) {
        console.log(e);
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(e);
    }

    
}

export let saveStudent = async (req: Request, res: Response) => {
    console.log("POST => SaveStudent");
    let studRepo: StudentRepository = new StudentRepository();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        let student: Student = new Student(req.body.firstName, req.body.lastName, req.body.school);
        let result = await studRepo.saveStudent(student);
        console.log(result);
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify('success');
        res.json(result);
    }
    catch(e) {
        console.log(inspect(e));
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(inspect(e));
    }
    
}

export let deleteStudent = async (req: Request, res: Response) => {
    console.log("DELETE => DeleteStudent");
    let studRepo: StudentRepository = new StudentRepository();
    let baseResponse: BaseResponse = new BaseResponse();

    try {
        let studentId = await studRepo.getStudentById(req.body.id);
        let result = await studRepo.deleteStudent(studentId);
        console.log(result);
        baseResponse.isSuccess = true;
        baseResponse.response = JSON.stringify('success');
    }
    catch(e) {
        console.log(inspect(e));
        baseResponse.isSuccess = false;
        baseResponse.response = JSON.stringify(inspect(e));
    }
    res.send(baseResponse);
}