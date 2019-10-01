import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("student")
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    firstName: string;

    @Column({length: 100})
    lastName: string;

    @Column({length: 100})
    school: string;

    constructor(firstName: string, lastName: string, school: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.school = school;
    }
}