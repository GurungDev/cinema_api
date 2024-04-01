import { Router } from "express";
import { Validator } from "../../../common/class/validator";
import { RequestDataPaths } from "../../../common/enum";
import { IdDto } from "../../../common/validation/idValidation";
import authMiddleware, { adminChecker, cinemaChecker } from "../../auth/middleware/auth.middleware";
import { cinemaController } from "./ciniema.controller";
import { CinemaPatchDto } from "./cinema.dto";



const cinemaRouter = Router({ mergeParams: true });

cinemaRouter.get("/admin/get-count", authMiddleware, adminChecker, cinemaController.getCount.bind(cinemaController));
cinemaRouter.get("/admin/getAll", authMiddleware, adminChecker, cinemaController.get.bind(cinemaController))
cinemaRouter.get("/admin/:id", authMiddleware, adminChecker, Validator.validate(IdDto, RequestDataPaths.Params), cinemaController.retrieve.bind(cinemaController))
cinemaRouter.post("/admin/:id", authMiddleware, adminChecker, Validator.validate(IdDto, RequestDataPaths.Params), cinemaController.changeSatatus.bind(cinemaController))
cinemaRouter.get("/", authMiddleware, cinemaChecker, cinemaController.getByCinema.bind(cinemaController))
cinemaRouter.patch("/", authMiddleware, cinemaChecker, Validator.validate(CinemaPatchDto, RequestDataPaths.Body), cinemaController.update.bind(cinemaController))


export default cinemaRouter;