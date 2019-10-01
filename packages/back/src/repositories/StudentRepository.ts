import { Student } from "../entities/Student";
import { getManager } from "typeorm";

export class StudentRepository {
    getAllStudents() {
        return getManager().getRepository(Student).find();
    }

    saveStudent(student: Student) {
        return getManager().getRepository(Student).save(student);
    }

    deleteStudent(student: Student) {
        return getManager().getRepository(Student).remove(student);
    }

    getStudentById(studentId: number) {
        return getManager().getRepository(Student).findOne(studentId);
    }
}