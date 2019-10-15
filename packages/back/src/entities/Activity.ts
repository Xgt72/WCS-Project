import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("activity")
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    value: number;

    @Column({length: 6})
    color: string;

    constructor(name: string, value: number, color: string) {
        this.name = name;
        this.value = value;
        this.color = color;
    }
}