import { IsEnum } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import { ShowTime } from "../../../common/enum";
import HallEntity from "../../hall/entities/hall.entity";
import MovieEntity from "../../movie/entities/movie.entity";
import ReservationEntity from "../../reservation/entities/reservation.entity";
import CinemaEntity from "../../user/cinema/entities/cinema.entity";
 

@Entity({name: 'show'})
export default class ShowEntity extends CustomBaseEntity {
    @Column()
    date: Date;

    @Column()
    @IsEnum(ShowTime)
    start_time: ShowTime;

    @ManyToOne(() => CinemaEntity, (cinema) => cinema.shows)
    cinema: CinemaEntity

    @ManyToOne(() => HallEntity, (hall) => hall.id)
    hall: HallEntity

    @ManyToOne(() => MovieEntity, (movie) => movie.id)
    movie: MovieEntity

    @OneToMany(() => ReservationEntity, (reservation) => reservation.show)
    reservations: ReservationEntity[]
}