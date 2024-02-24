import otpGenerator from "otp-generator";
import { OtpRepository, otpRepository } from "./repository/otp.repository";
 
import { ExpressError } from "../../common/class/error";
import { OtpEntity } from "./entities/otp.entity";
import { DeepPartial } from "typeorm";
 
import { OtpPurpose } from "../../common/enum";
 

export class OTPService {
  private readonly repository: OtpRepository;
  constructor() {
    this.repository = otpRepository;
  }
  async buildOtp(email: string, purpose: OtpPurpose, duration?: number) {
    const otp = otpGenerator.generate(6);

    let verificationToken: DeepPartial<OtpEntity> = {
      purpose,
      email,
      otp: otp
    };

    await this.repository.update({ purpose, email }, { isRevoked: true });
    return await this.repository.create(verificationToken).save();
  }

  async getOTP(otp: string) {
    return await this.repository.find({ where: { otp } });
  }

  async verifyOtp(purpose: OtpPurpose, otp: string, email?: string) {
    const vToken = await this.repository.findOne({
      where: {
        purpose,
        otp,
        email,
      },
    });
 
    if (!vToken) {
      throw new ExpressError(
        400,
        `Invalid token provided. Couldn't find token for this puropse.`
      );
    }
    if (vToken.isRevoked) {
      throw new ExpressError(400, `Can't verify token. Token no longer valid.`);
    }

    return vToken;
  }
   async revokeAllSimilarOtp(
    purpose: OtpPurpose,
    email: string
  ) {
    return await this.repository.update(
      { purpose, email },
      { isRevoked: true }
    );
  }
  async revokeAOtp(otp: string) {
    return await this.repository.update({ otp }, { isRevoked: true });
  }
}

export const otpService = new OTPService();
