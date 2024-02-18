import { Router } from "express";
import { movieController } from "./movie.controller";
 
const movieRouter = Router({mergeParams: true});

movieRouter.get("/",  movieController.get.bind(movieController));
movieRouter.get("/:id",  movieController.retrieve.bind(movieController));

export default movieRouter;
