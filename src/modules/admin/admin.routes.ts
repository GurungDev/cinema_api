import { Router } from "express";
 
import adminCustomerRouter from "../user/customer/admin/admin.routes";

const adminRouter = Router({mergeParams: true});

// adminRouter.use("/cinema", adminStoreRouter);
adminRouter.use("/customer", adminCustomerRouter);

export default adminRouter;
