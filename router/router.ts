import express from "express";
import connect from "../rabbit-publisher/rabbitPublisher";
import {addToQueue} from "../controller/controller";
import amqp from "amqplib";

// @ts-ignore
const router:express.Router=new express.Router();

let channel:amqp.Channel|null,results; //rabbit mq channel and queue

connect().then(({channelProp,resultsProp})=>{
    channel=channelProp;
    results=resultsProp;
    console.log(channelProp?"connected to rabbitmq":"ERROR COULD NOT CONNECT TO RABBITMQ");
});

router.get("/healthcheck",(req:express.Request,res:express.Response)=>{
    res.status(200).json("server up")
})

router.post("/add-order",(req:express.Request,res:express.Response)=>{
    addToQueue(req,res,channel);
})

export default router;