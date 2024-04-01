import { Router } from "express";
import { Validator } from "../../common/class/validator";
import { RequestDataPaths } from "../../common/enum";
import authMiddleware, { cinemaChecker } from "../auth/middleware/auth.middleware";
import { movieController } from "./movie.controller";
import { MovieRegisterDto } from "./movie.dto";
import { IdDto } from "../../common/validation/idValidation";
import uploadImage from "../../common/middleware/fileupload.middleware";

const movieRouter = Router({ mergeParams: true });

//create movie api
movieRouter.post("/", authMiddleware, cinemaChecker, uploadImage(), Validator.validate(MovieRegisterDto, RequestDataPaths.Body), movieController.post.bind(movieController));


//create movie api
movieRouter.patch("/:id", authMiddleware, cinemaChecker, uploadImage(false), Validator.validate(IdDto, RequestDataPaths.Params), Validator.validate(MovieRegisterDto, RequestDataPaths.Body), movieController.updateMovie.bind(movieController));

//get movies according to cinema
movieRouter.get("/cinema-movies", authMiddleware, cinemaChecker, movieController.getAccordingToCinema.bind(movieController));

//delete movies according to cinema
movieRouter.delete("/:id", authMiddleware, cinemaChecker, Validator.validate(IdDto, RequestDataPaths.Params), movieController.deleteMovie.bind(movieController));

movieRouter.get("/", movieController.get.bind(movieController));
movieRouter.get("/:id", movieController.retrieve.bind(movieController));

export default movieRouter;
