import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("mutator")
export class Mutator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column()
    indicator_id: number;

    @Column()
    value: number;

    constructor(name: string, indicator_id: number, value: number) {
        this.name = name;
        this.indicator_id = indicator_id;
        this.value = value;
    }
}