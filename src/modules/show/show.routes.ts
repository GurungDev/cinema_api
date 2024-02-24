import { Router } from "express";
import authMiddleware, { cinemaChecker } from "../auth/middleware/auth.middleware";
import { ShowController, showController } from "./show.controller";
 
import { RequestDataPaths } from "../../common/enum";
import { ShowRegisterDto } from "./show.dto";
import { Validator } from "../../common/class/validator";

const showRoutes = Router();

showRoutes.post("/",authMiddleware, cinemaChecker, Validator.validate(ShowRegisterDto, RequestDataPaths.Body), showController.creatAShow.bind(showController) )
showRoutes.get("/cinema-shows",authMiddleware, cinemaChecker, showController.getAccordingToCinema.bind(showController) )

showRoutes.get("/movie/:id", showController.getAccordingToMovie.bind(showController) )
showRoutes.get("/:id", showController.retrieve.bind(showController) )

 export default showRoutes;