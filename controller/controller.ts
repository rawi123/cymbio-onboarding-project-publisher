import {Request, Response} from "express";
import RabbitClass from "../rabbit-publisher/rabbitConnect"
import {ordersQueue} from "../rabbit-publisher/createRabbitOrders";
import amqp from "amqplib";


export const healthCheck = (req: Request, res: Response): void => {
    const queueNameToCheck:string=req.body.queue;
    const queue:RabbitClass|null=getQueue(queueNameToCheck);

    if(!queue?.getChannel())
        res.status(200).json("Server up but queue down")

    else
        res.status(200).json("Server & rabbit up");
}

const getQueue=(queueName:string):RabbitClass|null=>{
    if(queueName==="orders")
        return ordersQueue;
    return null
}

export const addToQueue = async (req: Request, res: Response, rabbitQueue: RabbitClass): Promise<void> => {

    let rabbitChannel: amqp.Channel | null = rabbitQueue.getChannel();


    try {
        if (rabbitChannel === null) throw ("channel is null");
        const messageBuffed = Buffer.from(JSON.stringify(req.body));

        rabbitChannel.sendToQueue("orders", messageBuffed);
        console.log("sent message to queue - orders");

        res.status(200).json("message added to queue");
    } catch (err) {
        console.log(err);
    }
}