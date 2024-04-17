import { Router } from "express";
import { Validator } from "../../common/class/validator";
import { IdDto } from "../../common/validation/idValidation";
import { RequestDataPaths } from "../../common/enum";
import { ResevationDto } from "./reservation.dto";
import { reservationController } from "./reservation.controller";
import authMiddleware, { adminChecker, cinemaChecker, userChecker } from "../auth/middleware/auth.middleware";

const ReservationRouter = Router();
ReservationRouter.get("/bookings", authMiddleware, userChecker,  reservationController.getAllBookings.bind(reservationController))
ReservationRouter.get("/all", authMiddleware, cinemaChecker,  reservationController.getAllByAdmin.bind(reservationController))

ReservationRouter.get("/admin/all", authMiddleware, adminChecker,  reservationController.getAllBySuperAdmin.bind(reservationController))

ReservationRouter.post("/:id", authMiddleware, userChecker, Validator.validate(IdDto, RequestDataPaths.Params), Validator.validate(ResevationDto, RequestDataPaths.Body), reservationController.create.bind(reservationController))
ReservationRouter.get("/:id", authMiddleware, cinemaChecker, Validator.validate(IdDto, RequestDataPaths.Params), reservationController.getAll.bind(reservationController))

export default ReservationRouter;