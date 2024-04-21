import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { OtpPurpose } from "../../common/enum";
import { OTPService, otpService } from "../otp/otp.service";
import {
  ChangePasswordDto,
  CinemaRegisterDto,
  CustomerRegisterDto,
  OtpDto,
} from "./auth.dto";
import { AuthService } from "./auth.service";
import otpGenerator from "otp-generator";
import emailService from "../email/emai.service";
import { ExpressError } from "../../common/class/error";
import { CinemaService } from "../user/cinema/cinema.service";

export default class AuthController {
  private readonly service: AuthService;
  private readonly otpService: OTPService;
  private readonly cinema: CinemaService

  constructor() {
    this.service = new AuthService();
    this.otpService = otpService;
    this.cinema = new CinemaService();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, validateFor } = req.body;
      const { id, name }: any = await this.service.validate(
        email,
        password,
        validateFor
      );
      const token = await this.service.createToken(id, validateFor);
      return res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
          id,
          name,
          token,
        },
      });
  
    } catch (error) {
      next(error);
    }
  }

  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, purpose } = plainToInstance(OtpDto, req.body);
      await this.service.send(email, purpose);
      return res.status(200).json({
        success: true,
        message: "OTP SENT",
      });
    } catch (error) {
      next(error);
    }
  }

  async RegisterCinema(req: Request, res: Response, next: NextFunction) {
    try {
      const {  name, email,   address} = plainToInstance(
        CinemaRegisterDto,
        req.body
      );
      const store = await this.cinema.findByEmail(email);
      if (store) {
        throw new ExpressError(
          400,
          `Cinema with email ${email} already exists. Please login.`
        );
      }
      const password = otpGenerator.generate(6);
      emailService.cinemaRegisterEmailSend(email, password);
      const newCinema = await this.service.registerCinema(name, address, password, email );
      return res.status(200).json({
        success: true,
        message: "cinema created",
        data:{
          id: newCinema.id,
          name: newCinema.name,
          email: newCinema.email,
        }
      });
 
    } catch (error) {
      next(error);
    }
  }

  async RegisterUser(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto = plainToInstance(CustomerRegisterDto, req.body);
      await this.otpService.verifyOtp(
        OtpPurpose.SIGNUP_CUSTOMER,
        registerDto.otp,
        registerDto.email
      );
      await this.otpService.revokeAOtp(registerDto.otp);
      const newUser = await this.service.registerUser(registerDto);
      return res.status(200).json({
        success: true,
        message: "User Created",
        data:{
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }
      });
    
    } catch (error) {
      next(error);
    }
  }

  async ChangePasword(req: Request, res: Response, next: NextFunction) {
    try {
      const changePasswordPayload = plainToInstance(
        ChangePasswordDto,
        req.body
      );
       await this.otpService.verifyOtp(
        changePasswordPayload.purpose,
        changePasswordPayload.otp,
        changePasswordPayload.email
      );
      await this.otpService.revokeAOtp(changePasswordPayload.otp);
      await this.service.changePassword(
        changePasswordPayload.password,
        changePasswordPayload.email,
        changePasswordPayload.purpose
      )
      return res.status(200).json({
        success: true,
        message: "Sucess"
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
