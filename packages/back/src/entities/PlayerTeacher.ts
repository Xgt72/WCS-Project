import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("player_teacher")
export class PlayerTeacher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    player_id: number;

    @Column({length: 100})
    name: string;

    @Column()
    price: number;

    constructor(player_id: number, name: string, price: number) {
        this.player_id = player_id;
        this.name = name;
        this.price = price;
    }
}