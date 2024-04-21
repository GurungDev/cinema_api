import { Router } from "express";
import authMiddleware, { userChecker } from "../../auth/middleware/auth.middleware";
import { CustomerController, customerController } from "./customer.controller";
import { Validator } from "../../../common/class/validator";
import { ChangePasswordUSerDTO } from "./customer.dto";
import { RequestDataPaths } from "../../../common/enum";

const userRouter = Router({ mergeParams: true });

userRouter.post("/change-password", authMiddleware, userChecker, Validator.validate(ChangePasswordUSerDTO, RequestDataPaths.Body), customerController.changePassword.bind(customerController))

export default userRouter;