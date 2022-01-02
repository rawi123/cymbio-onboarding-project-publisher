import express,{Request,Response} from "express";
import {addToQueue, healthCheck} from "../controller/controller";
import {ordersQueue} from "../rabbit-publisher/createRabbitOrders"

const router:express.Router=express.Router();



router.get("/healthcheck",(req:Request,res:Response):void=>{
    healthCheck(req,res);
})

router.post("/add-order",async(req:Request,res:Response):Promise<void>=>{
    await addToQueue(req,res,ordersQueue);
})

export default router;