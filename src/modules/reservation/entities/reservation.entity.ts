import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import SeatEntity from "../../seat/entities/seat.entity";
import ShowEntity from "../../show/entities/show.entity";
import CustomerEntity from "../../user/customer/entities/customer.entity";
import SeatTakenEntity from "../../seat/seat_taken/entities/seat_taken.entity";
import { SeatStatus } from "../../../common/enum";
import PaymentEntity from "../../payment/entities/payment.entity";


@Entity({ name: 'reservation' })
export default class ReservationEntity extends CustomBaseEntity {

    @ManyToOne(() => ShowEntity, (show) => show.reservations)
    show: ShowEntity

    @ManyToOne(() => CustomerEntity, (customer) => customer.id)
    customer: CustomerEntity

    @Column({ enum: SeatStatus })
    status: SeatStatus

    @OneToMany(() => SeatTakenEntity, (seat) => seat.reservation)
    @JoinTable()
    seats: SeatTakenEntity[]

    @OneToOne(() => PaymentEntity)
    @JoinColumn()
    payment: PaymentEntity
}