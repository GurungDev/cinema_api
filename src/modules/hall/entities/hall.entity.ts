import { Column, DeleteDateColumn, Entity, Index, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CinemaEntity from "../../user/cinema/entities/cinema.entity";
import SeatEntity from "../../seat/entities/seat.entity";
 
 
 
@Entity({name: 'hall'})
export default class HallEntity extends CustomBaseEntity {
    @Column() 
    name: string;

    @ManyToOne(() => CinemaEntity, (cinema) => cinema.halls)
    cinema: CinemaEntity

    @OneToMany(() => SeatEntity, (seat) => seat.hall)
    seats: SeatEntity[]

    @DeleteDateColumn()
    deletedDate: Date
}