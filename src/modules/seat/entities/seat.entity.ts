import { Column, Entity, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import HallEntity from "../../hall/entities/hall.entity";
 

@Entity({name: 'seat'})
export default class SeatEntity extends CustomBaseEntity {
    
    @Column()
    seat_no: number;

    @ManyToOne(() => HallEntity, (hall) => hall.id)
    hall: HallEntity
}