import { Router } from "express";
import authRouter from "./modules/auth/auth.routes";
import cinemaRouter from "./modules/user/cinema/cinema.routes";
import movieRouter from "./modules/movie/movie.routes";
import hallRouter from "./modules/hall/hall.routes";
import showRoutes from "./modules/show/show.routes";
import seatRoute from "./modules/seat/seat.routes";
import ReservationRouter from "./modules/reservation/reservation.routes";
import paymentRoutes from "./modules/payment/payment.routes";
import adminRouter from "./modules/admin/admin.routes";
import userRouter from "./modules/user/customer/customer.routes";

const MainRouter = Router({ mergeParams: true })
MainRouter.use("/auth", authRouter)
MainRouter.use("/cinema", cinemaRouter)
MainRouter.use("/movie", movieRouter)
MainRouter.use("/hall", hallRouter)
MainRouter.use("/show", showRoutes)
MainRouter.use("/seat", seatRoute)
MainRouter.use("/reservation", ReservationRouter)
MainRouter.use("/payment", paymentRoutes)
MainRouter.use("/admin", adminRouter)
MainRouter.use("/user", userRouter)


export default MainRouter;