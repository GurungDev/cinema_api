import { Router } from "express";

const MainRouter = Router({mergeParams: true})

MainRouter.get('/', ()=>{console.log('hello')})

export default MainRouter;