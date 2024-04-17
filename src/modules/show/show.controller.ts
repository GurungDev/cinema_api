import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { ShowService, showService } from "./show.service";
import { HallService, hallService } from "../hall/hall.service";
import { ShowRegisterDto } from "./show.dto";
import { DeepPartial } from "typeorm";
import ShowEntity from "./entities/show.entity";
import { IdDto } from "../../common/validation/idValidation";
import { ExpressError } from "../../common/class/error";
import MovieService, { movieService } from "../movie/movie.service";

export class ShowController {
    private readonly service: ShowService
    private readonly hallService: HallService
    private readonly movieService: MovieService
    constructor() {
        this.service = showService;
        this.hallService = hallService;
        this.movieService = movieService
    }

    async creatAShow(req: Request, res: Response, next: NextFunction) {
        try {
            const { hall_id, date, price, start_time, movie_id } = plainToInstance(ShowRegisterDto, req.body);
            const cinemaId = req.userId;
            const hall = await this.hallService.getById(hall_id);
            if (!hall) {
                throw new ExpressError(404, "Hall not found")
            }
            const movie = await this.movieService.getMovieAccordingToId(movie_id);

            if (!movie) {
                throw new ExpressError(404, "movie not found")
            }

            const errorList: string[] = [];
            const seatList: DeepPartial<ShowEntity>[] = [];

            for (const item of start_time) {
                const checkSHow = await this.service.getMovie(hall_id, movie_id, date, item);

                if (checkSHow) {
                    errorList.push(`Show already exists on this date and at ${item} time.`);
                }
                seatList.push({
                    date: date,
                    price: price,
                    start_time: item,
                    hall: { id: hall_id },
                    movie: { id: movie_id },
                    cinema: { id: cinemaId },
                });
            }

            if (errorList.length > 0) {
                throw new ExpressError(400, errorList[0]);
            }
            const show = await this.service.createMany(seatList);

            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: show
            });

        } catch (error) {
            next(error)
        }
    }


    async getAccordingToCinema(req: Request, res: Response, next: NextFunction) {
        try {
            const cinemaId = req.userId;
            const shows = await this.service.getAllByCinemaId(cinemaId);
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: shows
            });

        } catch (error) {
            next(error)
        }
    }

    async deleteShow(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
            const cinemaId = req.userId;
            const show = await this.service.getById(id);
            if (!show) {
                throw new ExpressError(404, "Show not found");
            }
            console.log(show)
            if (show?.cinema?.id != cinemaId) {
                throw new ExpressError(400, "Cinema doesn't own this show.");
            }

            show.isActive = false;
            await show.softRemove();
            return res.status(200).json({
                success: true,
                message: "Sucess"
            });
        } catch (error) {
            next(error)
        }
    }


    async getAccordingToMovie(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
            const shows = await this.service.getAllByMovieId(id);
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: shows
            });
        } catch (error) {
            next(error)
        }
    }

    async getTOPmovies(req: Request, res: Response, next: NextFunction) {
        try {

            const shows = await this.service.getTopMovies();
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: shows
            });
        } catch (error) {
            next(error)
        }
    }

    async retrieve(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = plainToInstance(IdDto, req.params);
            const show = await this.service.getById(id);
            if (!show) {
                throw new ExpressError(404, "Hall not found.")
            }
            return res.status(200).json({
                success: true,
                message: "Sucess",
                data: show
            });

        } catch (error) {
            next(error)
        }
    }

}

export const showController = new ShowController();