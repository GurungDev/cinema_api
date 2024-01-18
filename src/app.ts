 import morgan from "morgan";
 import express from 'express';
import cors from "cors";
import MainRouter from "./mainRouter";


const pokharaRental = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan("dev"));
    app.use(MainRouter);
    return app;
  };
  
  export default pokharaRental;