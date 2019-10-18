import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("teacher_activities_calendar")
export class TeacherActivitiesCalendar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacher_id: number;

    @Column()
    activity_id: number;

    @Column()
    morning: boolean;

    @Column()
    afternoon: boolean;

    @Column()
    day: number;

    constructor(teacher_id: number, activity_id: number, morning: boolean, afternoon: boolean, day: number) {
        this.teacher_id = teacher_id;
        this.activity_id = activity_id;
        this.morning = morning;
        this.afternoon = afternoon;
        this.day = day;
    }
}