import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("player")
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    playerName: string;

    @Column()
    cyclesNumber: number;

    constructor(playerName: string) {
        this.playerName = playerName;
        this.cyclesNumber = 0;
    }
}