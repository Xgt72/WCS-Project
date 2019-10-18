import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("campus_manager_activities_calendar")
export class CampusManagerActivitiesCalendar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    campus_manager_id: number;

    @Column()
    activity_id: number;

    @Column()
    morning: boolean;

    @Column()
    afternoon: boolean;

    @Column()
    day: number;

    constructor(campus_manager_id: number, activity_id: number, morning: boolean, afternoon: boolean, day: number) {
        this.campus_manager_id = campus_manager_id;
        this.activity_id = activity_id;
        this.morning = morning;
        this.afternoon = afternoon;
        this.day = day;
    }
}