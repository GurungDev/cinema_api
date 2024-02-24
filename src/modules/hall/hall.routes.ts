import { Router } from "express";
import { hallController } from "./hall.controller";
import authMiddleware, { cinemaChecker } from "../auth/middleware/auth.middleware";
import { Validator } from "../../common/class/validator";
import { HallRegisterDto } from "./hall.dto";
import { RequestDataPaths } from "../../common/enum";
import { IdDto } from "../../common/validation/idValidation";

const hallRouter = Router({mergeParams: true})

hallRouter.post("/",authMiddleware, cinemaChecker, Validator.validate(HallRegisterDto, RequestDataPaths.Body), hallController.post.bind(hallController) )
hallRouter.get("/cinema-halls",authMiddleware, cinemaChecker, hallController.getAccordingToCinema.bind(hallController) )
hallRouter.delete("/:id", authMiddleware, cinemaChecker,Validator.validate(IdDto, RequestDataPaths.Params), hallController.deleteHall.bind(hallController));
hallRouter.get("/:id", hallController.retrieve.bind(hallController) )

 export default hallRouter;