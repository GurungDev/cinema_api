import { Column, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CinemaEntity from "../../user/cinema/entities/cinema.entity";
import SeatEntity from "../../seat/entities/seat.entity";
import ShowEntity from "../../show/entities/show.entity";
 
 
 
@Entity({name: 'hall'})
export default class HallEntity extends CustomBaseEntity {
    @Column() 
    name: string;

    @ManyToOne(() => CinemaEntity, (cinema) => cinema.halls)
    cinema: CinemaEntity

    @OneToMany(() => SeatEntity, (seat) => seat.hall , {onDelete: "CASCADE"})
    seats: SeatEntity[]

    @OneToMany(() => ShowEntity, (show) => show.hall, {onDelete: "CASCADE"})
    shows: ShowEntity[]

    @DeleteDateColumn()
    deletedDate: Date
}