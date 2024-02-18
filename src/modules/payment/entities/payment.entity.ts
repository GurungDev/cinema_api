import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import ReservationEntity from "../../reservation/entities/reservation.entity";
import CustomerEntity from "../../user/customer/entities/customer.entity";
 

@Entity({name: 'payment'})
export default class PaymentEntity extends CustomBaseEntity {
 
   @ManyToOne(() => CustomerEntity, (customer) => customer.id)
    customer: CustomerEntity
 
    @Column()
    amountInRs: number;

    @Column()
    paymentType: string;

    @Column()
    paymentId: string;

    @OneToOne(() => ReservationEntity)
    @JoinColumn()
    reservation: ReservationEntity
}