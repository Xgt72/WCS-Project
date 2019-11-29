import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("player")
export class Player {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    playerName: string;

    @Column()
    cyclesNumber: number;

    @Column({length: 100})
    email: string;

    @Column({length: 100})
    password: string

    constructor(playerName: string, email: string, password: string) {
        this.playerName = playerName;
        this.cyclesNumber = 0;
        this.email = email;
        this.password = password;
    }
}