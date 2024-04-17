import { Router } from "express";
import authMiddleware, { adminChecker, cinemaChecker } from "../auth/middleware/auth.middleware";
import { ShowController, showController } from "./show.controller";
 
import { RequestDataPaths } from "../../common/enum";
import { ShowRegisterDto } from "./show.dto";
import { Validator } from "../../common/class/validator";
import { IdDto } from "../../common/validation/idValidation";

const showRoutes = Router();

showRoutes.post("/",authMiddleware, cinemaChecker, Validator.validate(ShowRegisterDto, RequestDataPaths.Body), showController.creatAShow.bind(showController) )
showRoutes.get("/cinema-shows",authMiddleware, cinemaChecker, showController.getAccordingToCinema.bind(showController) )
showRoutes.delete("/delete/:id",authMiddleware, cinemaChecker, Validator.validate(IdDto, RequestDataPaths.Params), showController.deleteShow.bind(showController) )
showRoutes.get("/admin/movies",authMiddleware, adminChecker, showController.getTOPmovies.bind(showController) )

showRoutes.get("/movie/:id", showController.getAccordingToMovie.bind(showController) )
showRoutes.get("/:id", showController.retrieve.bind(showController) )

 export default showRoutes;