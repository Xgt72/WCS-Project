"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = require("../entities/Student");
const typeorm_1 = require("typeorm");
class StudentRepository {
    getAllStudents() {
        return typeorm_1.getManager().getRepository(Student_1.Student).find();
    }
    saveStudent(student) {
        return typeorm_1.getManager().getRepository(Student_1.Student).save(student);
    }
    deleteStudent(student) {
        return typeorm_1.getManager().getRepository(Student_1.Student).remove(student);
    }
    getStudentById(studentId) {
        return typeorm_1.getManager().getRepository(Student_1.Student).findOne(studentId);
    }
}
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=StudentRepository.js.map