import { NextFunction, Response, Request } from "express";
 import { ResponseHandler } from "../../common/class/success.response";
import { plainToInstance } from "class-transformer";
import { ValidateId } from "../../common/validation/id.validate";
import { ExpressError } from "../../common/class/error";
import MovieService, { movieService } from "./movie.service";

export default class MovieController{
    private readonly service: MovieService
    constructor(){
        this.service = movieService;
    }

    async get(req: Request, res: Response, next: NextFunction){
        try {
            const movie = await this.service.getAll();
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                movie
            )
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = plainToInstance(ValidateId, req.params);
            const movie = await this.service.getMovieAccordingToId(id);
            if(!movie){
                throw new ExpressError(404, "Boat not found.")
            }
            return ResponseHandler.success(res, 
                "Successfully retrieved",
                movie
            )
        } catch (error) {
            next(error)
        }
    }

}

export const movieController = new MovieController();