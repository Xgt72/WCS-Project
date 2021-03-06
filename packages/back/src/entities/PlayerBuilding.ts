import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Mutator } from "./Mutator";

@Entity("player_buildings")
export class PlayerBuilding {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player_id: number;

    @Column({length: 100})
    name: string;

    @Column()
    isTemplate: boolean;

    @Column()
    price: number;

    @OneToMany(type => Mutator, mutator => mutator.playerBuilding)
    mutators: Mutator[];

    constructor(player_id: number, name: string, price: number, isTemplate: boolean = false ) {
        this.player_id = player_id;
        this.name = name;
        this.price = price;
        this.isTemplate = isTemplate;
    }
}