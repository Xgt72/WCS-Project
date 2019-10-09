import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { PlayerBuilding } from "./PlayerBuilding";

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

    
    @ManyToOne(type => PlayerBuilding, playerBuilding => playerBuilding.mutators, {onDelete: 'CASCADE'})
    playerBuilding: PlayerBuilding;
    

    constructor(name: string, indicator_id: number, value: number) {
        this.name = name;
        this.indicator_id = indicator_id;
        this.value = value;
    }
}