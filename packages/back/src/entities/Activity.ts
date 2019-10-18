import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Mutator } from "./Mutator";

@Entity("activity")
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    value: number;

    @Column({ length: 6 })
    color: string;

    @OneToMany(type => Mutator, mutator => mutator.activity)
    mutators: Mutator[];

    constructor(name: string, value: number, color: string) {
        this.name = name;
        this.value = value;
        this.color = color;
    }
}