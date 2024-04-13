import { Entity, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "../../../../common/baseEntity/custom-base-entity";
import ReservationEntity from "../../../reservation/entities/reservation.entity";
import SeatEntity from "../../entities/seat.entity";
 
 

@Entity({name: 'seat_taken'})
export default class SeatTakenEntity extends CustomBaseEntity {

    @ManyToOne(() => SeatEntity, (seat) => seat.id)
    seat: SeatEntity

    @ManyToOne(() => ReservationEntity, (reservation) => reservation.id)
    reservation: ReservationEntity
}