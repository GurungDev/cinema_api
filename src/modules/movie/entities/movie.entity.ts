import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CinemaEntity from "../../user/cinema/entities/cinema.entity";
import { GenreEnum } from "../../../common/enum";
 

@Entity({name: 'movie'})
export default class MovieEntity extends CustomBaseEntity {
    
    @Column({enum: GenreEnum})
    genre: GenreEnum;

    @Column()
    durationInMinute: number;

    @Column()
    title: string;
    
    @Column({nullable:true})
    image: string;

    @Column({ nullable: true})
    description: string

    @ManyToOne(() => CinemaEntity, (cinema) => cinema.movies)
    cinema: CinemaEntity

    @DeleteDateColumn()
    deletedDate: Date
}