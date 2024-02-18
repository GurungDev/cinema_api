import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CinemaEntity from "../../user/cinema/entities/cinema.entity";
 

@Entity({name: 'movie'})
export default class MovieEntity extends CustomBaseEntity {
    
    @Column()
    genre: number;

    @Column()
    durationInMinute: number;

    @Column()
    title: string;

    @Column({ nullable: true})
    description: string

    @ManyToOne(() => CinemaEntity, (cinema) => cinema.movies)
    cinema: CinemaEntity
}