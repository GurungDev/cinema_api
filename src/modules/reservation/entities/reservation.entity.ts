import { Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import SeatEntity from "../../seat/entities/seat.entity";
import ShowEntity from "../../show/entities/show.entity";
import CustomerEntity from "../../user/customer/entities/customer.entity";
 

@Entity({name: 'reservation'})
export default class ReservationEntity extends CustomBaseEntity {
    
    @ManyToOne(() => ShowEntity, (show) => show.reservations)
    show: ShowEntity

   @ManyToOne(() => CustomerEntity, (customer) => customer.id)
    customer: CustomerEntity

    @ManyToMany(() => SeatEntity)
    @JoinTable()
    seats: SeatEntity[]
}