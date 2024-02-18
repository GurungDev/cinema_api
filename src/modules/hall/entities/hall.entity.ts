import { Column, Entity, Index, ManyToOne, OneToMany, Point, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CinemaEntity from "../../user/cinema/entities/cinema.entity";
 
 
 
@Entity({name: 'hall'})
export default class HallEntity extends CustomBaseEntity {
    @Column() 
    name: string;

    @ManyToOne(() => CinemaEntity, (cinema) => cinema.halls)
    cinema: CinemaEntity
}