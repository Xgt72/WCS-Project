import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Mutator } from "./Mutator";


@Entity("player_campus_manager")
export class PlayerCampusManager {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player_id: number;

    @Column({length: 100})
    name: string;

    @Column()
    price: number;


    @OneToMany(type => Mutator, mutator => mutator.playerCampusManager)
    mutators: Mutator[];

    constructor(player_id: number, name: string, price: number) {
        this.player_id = player_id;
        this.name = name;
        this.price = price;
    }
}