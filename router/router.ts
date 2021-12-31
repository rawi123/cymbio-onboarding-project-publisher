import express from "express";
import connectRabbit from "../rabbit-publisher/rabbitPublisher";
import {addToQueue} from "../controller/controller";
import amqp from "amqplib";


const router:express.Router=express.Router();

let channel:amqp.Channel|null,results; //rabbit mq channel and queue

connectRabbit().then(({channelProp,resultsProp})=>{
    channel=channelProp;
    results=resultsProp;
    console.log(channelProp?"connected to rabbitmq":"ERROR COULD NOT CONNECT TO RABBITMQ");
});

router.get("/healthcheck",(req:express.Request,res:express.Response)=>{
    res.status(200).json("server up")
})

router.post("/add-order",async(req:express.Request,res:express.Response):Promise<any>=>{
    await addToQueue(req,res,channel);
})

export default router;