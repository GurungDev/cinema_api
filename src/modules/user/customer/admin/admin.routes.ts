import { Router } from "express";
import { Validator } from "../../../../common/class/validator";
 import { IdDto } from "../../../../common/validation/idValidation";
import authMiddleware, { adminChecker } from "../../../auth/middleware/auth.middleware";
import { adminStoreController } from "./admin.controller";
import { RequestDataPaths } from "../../../../common/enum";

const adminCustomerRouter = Router({ mergeParams: true });

 

adminCustomerRouter.get(
    "/",
    authMiddleware,
    adminChecker,
    adminStoreController.get.bind(adminStoreController)
  );   
  adminCustomerRouter.get(
    "/number",
    authMiddleware,
    adminChecker,
    adminStoreController.getCount.bind(adminStoreController)
  );  

adminCustomerRouter.get(
    "/:id",
    authMiddleware,
    adminChecker,
    Validator.validate(IdDto, RequestDataPaths.Params),

    adminStoreController.retrieve.bind(adminStoreController)
); 


export default adminCustomerRouter;
