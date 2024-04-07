import { Router } from "express";
import { seatController } from "./seat.controller";
import { Validator } from "../../common/class/validator";
import { IdDto } from "../../common/validation/idValidation";
import { RequestDataPaths } from "../../common/enum";
import { seatTakenController } from "./seat_taken/seat.taken.controller";


const seatRoute = Router({ mergeParams: true });
seatRoute.get("/taken/:id", Validator.validate(IdDto, RequestDataPaths.Params), seatTakenController.getAllByReservation.bind(seatTakenController))

seatRoute.get("/:id", Validator.validate(IdDto, RequestDataPaths.Params), seatController.getAll.bind(seatController))



export default seatRoute;
