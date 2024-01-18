import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

 
 

@Entity({name: 'rooms'})
export default class Room {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column({ nullable: true})
    description: string

 
}