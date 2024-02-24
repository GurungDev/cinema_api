import { Router } from "express";
import { authController } from "./auth.controller";
import { ChangePasswordDto, CinemaRegisterDto, CustomerRegisterDto, LoginDto, OtpDto } from "./auth.dto";
 import { Validator } from "../../common/class/validator";
import { RequestDataPaths } from "../../common/enum";

const authRouter = Router({ mergeParams: true });

authRouter.post(
  "/login",
  Validator.validate(LoginDto, RequestDataPaths.Body),
  authController.login.bind(authController)
);

authRouter.post(
  "/send-otp",
  Validator.validate(OtpDto, RequestDataPaths.Body),
  authController.sendOtp.bind(authController)
);

authRouter.post(
  "/register/cinema",
  Validator.validate(CinemaRegisterDto, RequestDataPaths.Body),
  authController.RegisterCinema.bind(authController)
);

authRouter.post(
  "/register/user",
  Validator.validate(CustomerRegisterDto, RequestDataPaths.Body),
  authController.RegisterUser.bind(authController)
);

 
authRouter.post(
  "/change-password",
  Validator.validate(ChangePasswordDto, RequestDataPaths.Body),
  authController.ChangePasword.bind(authController)
);

export default authRouter;
