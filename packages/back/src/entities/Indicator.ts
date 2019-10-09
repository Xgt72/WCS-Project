import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("indicator")
export class Indicator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    player_id: number;

    @Column()
    value: number;

    constructor(name: string, player_id: number, value: number) {
        this.name = name;
        this.player_id = player_id;
        this.value = value;
    }
}