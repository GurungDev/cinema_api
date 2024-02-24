 import morgan from "morgan";
 import express from 'express';
import cors from "cors";
import MainRouter from "./mainRouter";
import { errorHandler } from "./common/middleware/error.middleware";

const cinema = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan("dev"));
    app.use( MainRouter);

    app.use(errorHandler)
    return app;
  };
  
  export default cinema;