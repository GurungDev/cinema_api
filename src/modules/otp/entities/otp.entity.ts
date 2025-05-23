import { Column, Entity, Index } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import { OtpPurpose } from "../../../common/enum";

@Entity({
  name: "otp",
})
export class OtpEntity extends CustomBaseEntity {
  @Column({})
  @Index()
  otp: string; // unique id

  @Column({ enum: OtpPurpose })
  purpose: OtpPurpose; // Otp purpose for register, forgot password 

  @Column({})
  email: string; //OTP issued for email

  @Column({
    default: false,
  })
  isRevoked: boolean; 
}
