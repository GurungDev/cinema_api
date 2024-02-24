import { Router } from "express";
import { Validator } from "../../../common/class/validator";
import { RequestDataPaths } from "../../../common/enum";
import { IdDto } from "../../../common/validation/idValidation";
import authMiddleware, { adminChecker } from "../../auth/middleware/auth.middleware";
import { cinemaController } from "./ciniema.controller";



const cinemaRouter = Router({ mergeParams: true });
 
cinemaRouter.get("/admin/get-count", authMiddleware, adminChecker, cinemaController.getCount.bind(cinemaController));
cinemaRouter.get("/admin/getAll", authMiddleware, adminChecker, cinemaController.get.bind(cinemaController))
cinemaRouter.get("/admin/:id", authMiddleware, adminChecker, Validator.validate(IdDto, RequestDataPaths.Params), cinemaController.retrieve.bind(cinemaController))


export default cinemaRouter;