import express,{Request,Response} from "express";
import {addToQueue, healthCheck} from "../controller/controller";
import {ordersQueue} from "../rabbit-publisher/createRabbitOrders"
import {reConnectRabbitIfDown} from "../rabbit-publisher/rabbitHealthCheck";

const router:express.Router=express.Router();



router.get("/health-check",async (req:Request,res:Response):Promise<void>=>{
    await healthCheck(req,res);
})

router.get("/rabbit-health-check",async(req:Request,res:Response):Promise<void>=>{
    await reConnectRabbitIfDown(req,res);
})

router.post("/add-order",async(req:Request,res:Response):Promise<void>=>{
    await addToQueue(req,res,ordersQueue);
})

export default router;