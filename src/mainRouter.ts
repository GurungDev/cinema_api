import { Router } from "express";
import authRouter from "./modules/auth/auth.routes";
import cinemaRouter from "./modules/user/cinema/cinema.routes";
import movieRouter from "./modules/movie/movie.routes";
import hallRouter from "./modules/hall/hall.routes";
import showRoutes from "./modules/show/show.routes";

const MainRouter = Router({mergeParams: true})
MainRouter.use("/auth", authRouter)
MainRouter.use("/cinema", cinemaRouter)
MainRouter.use("/movie", movieRouter)
MainRouter.use("/hall", hallRouter)
MainRouter.use("/show", showRoutes)
 
export default MainRouter;