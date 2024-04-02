import { ExpressError } from "../../common/class/error";
 import { AdminService, adminService } from "../admin/admin.service";
import {
  CustomerService,
  customerService,
} from "../user/customer/customer.service";
import jwt from "jsonwebtoken";
 import { CustomerRegisterDto, CinemaDto, CinemaRegisterDto } from "./auth.dto";
 import 'dotenv/config';
import emailService, { EmailService } from "../email/emai.service";
import { OTPService, otpService } from "../otp/otp.service";
import { OtpPurpose, UserEnum } from "../../common/enum";
import { CinemaService, cinemaService } from "../user/cinema/cinema.service";
 
export class AuthService {
  private cinema: CinemaService;
  private customerService: CustomerService;
  private adminService: AdminService;
  private readonly emailService: EmailService;
  private readonly otpService: OTPService;
  constructor() {
    this.cinema = cinemaService;
    this.customerService = customerService;
    this.adminService = adminService;
    this.emailService = emailService;
    this.otpService = otpService;
  }

  async createToken(id: number, role: UserEnum, extraData?: any) {
    return jwt.sign({ id, role, extraData }, "secret", {
      expiresIn: 8640000,
    });
  }

  async verifyToken(token: string) {
    return jwt.verify(token, "secret") as {
      id: number;
      role: string;
      extraData?: any;
    };
  }

  async send(email: string, purpose: OtpPurpose) {
    let otp;
    switch (purpose) {
      case OtpPurpose.SIGNUP_CUSTOMER:
        const user = await this.customerService.findByEmail(email);

        if (user) {
          throw new ExpressError(
            400,
            `User with email ${email} already exists. Please login.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);

        this.emailService.mailCustomerRegister(email, otp.otp);
        break;

      case OtpPurpose.FORGOT_PASSWORD_CUSTOMER:
        const userForForgotPassword = await this.customerService.findByEmail(
          email
        );
        if (!userForForgotPassword) {
          throw new ExpressError(
            400,
            `User with email ${email} doesn't exists. Please signup.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);
        this.emailService.mailPasswordChange(email, otp.otp);
        break;

      case OtpPurpose.FORGOT_PASSWORD_CINEMA:
        const storePasswordForgot = await this.cinema.findByEmail(
          email
        );
        if (!storePasswordForgot) {
          throw new ExpressError(
            400,
            `User with email ${email} doesn't exists. Please signup.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);

        this.emailService.mailPasswordChange(email, otp.otp);
        break;

      default:
        throw new ExpressError(400, "Invalid purpose");
    }
  }

  async registerCinema(name: string, address:string, password: string, email: string) {
   
    const store = await this.cinema.createOne({
      name,
      password,
      email,
      address
    });
    return store;
  }

  async registerUser(customerRegisterDto: CustomerRegisterDto) {
    const { name, password, email, phone } = customerRegisterDto;
    const newUser = await this.customerService.createOne({
      name,
      password,
      email,
      phone,
    });
    return newUser;
  }

  async changePassword(
    password: string,
    email: string,
    otpPurpose: OtpPurpose
  ) {
    switch (otpPurpose) {
      case OtpPurpose.FORGOT_PASSWORD_CUSTOMER:
        const customer = await this.customerService.changePassword(
          email,
          password
        );
        return "Sucesssfully Changed Password";
      case OtpPurpose.FORGOT_PASSWORD_CINEMA:
        const store = await this.cinema.changePassword(email, password);
        return "Sucesssfully Changed Password";
      default:
        return "Invalid Purpose";
    }
  }

  async validate(email: string, password: string, validateFor: UserEnum) {
    let validationResponse;
    if (validateFor == UserEnum.CINEMA) {
      validationResponse = await this.cinema.findByEmail(email);
      
      if (!validationResponse) {
        throw new ExpressError(404, "Cinema not found");
      }
      if(!validationResponse.isActive){
        throw new ExpressError(404, "Cinema not active");
      }
    } else if (validateFor == UserEnum.CUSTOMER) {
      validationResponse = await this.customerService.findByEmail(email);
      if (!validationResponse) {
        throw new ExpressError(404, "User not found");
      }
    } else {
      validationResponse = await this.adminService.findByEmail(email);
      if (!validationResponse) {
        throw new ExpressError(404, "Admin not found");
      }
    }
    //checking password
    const checkPassword = await validationResponse.verifyPassword(password);
    if (!checkPassword) {
      throw new ExpressError(400, "Incorrect password");
    }
    //creating token
    this.createToken(validationResponse.id, validateFor);

    return validationResponse;
  }
}

export const authService = new AuthService();
