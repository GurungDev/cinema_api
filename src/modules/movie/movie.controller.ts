import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../common/class/error";
import { IdDto } from "../../common/validation/idValidation";
import MovieService, { movieService } from "./movie.service";
import { MovieRegisterDto } from "./movie.dto";

export default class MovieController {
    private readonly service: MovieService
    constructor() {
        this.service = movieService;
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const { genre, title, description, durationInMin } = plainToInstance(MovieRegisterDto, req.body);
            const cinemaId = req.userId;
            const image = req.body.image;
            const movie = await this.service.createOne({ genre, image, title, description, durationInMinute: durationInMin });
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: movie
            });

        } catch (error) {
            next(error)
        }
    }

    async updateMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { genre, title, description, durationInMin } = plainToInstance(MovieRegisterDto, req.body);

            const image = req.body.image;
            const { id } = plainToInstance(IdDto, req.params);

            const movie = await this.service.getMovieAccordingToId(id);

            if (!movie) {
                throw new ExpressError(404, "Movie not found.")
            }

            if (genre) {
                movie.genre = genre
            }
            if (title) {
                movie.title = title
            }
            if (description) {
                movie.description = description
            }
            if (durationInMin) {
                movie.durationInMinute = durationInMin
            }
            if (image) {
                movie.image = image;
            }
            await movie.save()
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: movie
            });

        } catch (error) {
            next(error)
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const movie = await this.service.getAll();
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: movie
            });

        } catch (error) {
            next(error)
        }
    }

    async getAccordingToCinema(req: Request, res: Response, next: NextFunction) {
        try {

            const movie = await this.service.getMovieAccordingToCinemaId();
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: movie
            });

        } catch (error) {
            next(error)
        }
    }


    async deleteMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
        
            const movie = await this.service.delete(id);
            return res.status(200).json({
                success: true,
                message: "Sucess"
            });
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
            const movie = await this.service.getMovieAccordingToId(id);
            if (!movie) {
                throw new ExpressError(404, "Movie not found.")
            }
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: movie
            });

        } catch (error) {
            next(error)
        }
    }

}

export const movieController = new MovieController();