import { Router } from "express";
import authMiddleware, { userChecker } from "../auth/middleware/auth.middleware";
import { Validator } from "../../common/class/validator";
import { IdDto } from "../../common/validation/idValidation";
import { RequestDataPaths } from "../../common/enum";
import { PaymentDto } from "./payment.dto";
import { paymentController } from "./payment.controller";

const paymentRoutes = Router();
// paymentRoutes.get("/bookings", authMiddleware, userChecker,  paymentController.getAllBookings.bind(paymentController))
// paymentRoutes.get("/all", authMiddleware, cinemaChecker,  paymentController.getAllByAdmin.bind(paymentController))

paymentRoutes.post("/:id", authMiddleware, userChecker, Validator.validate(IdDto, RequestDataPaths.Params), Validator.validate(PaymentDto, RequestDataPaths.Body), paymentController.create.bind(paymentController))
 
export default paymentRoutes;