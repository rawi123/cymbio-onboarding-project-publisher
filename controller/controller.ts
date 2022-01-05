import {Request, Response} from "express";
import RabbitClass from "../rabbit-publisher/rabbitConnect"
import getRabbitQueue from "../rabbit-publisher/getRabbitQueue";
import amqp from "amqplib";
import rabbitHealthCheck from "../rabbit-publisher/healthCheck";


export const healthCheck = async(req: Request, res: Response): Promise<void> => {
    const queueNameToCheck:string=req.body.queue;
    const queue:RabbitClass|null=getRabbitQueue(queueNameToCheck);

    if(!queue?.getChannel() || !await rabbitHealthCheck())
        res.status(200).json("Server up but queue down, try get rabbit-health-check request to restart rabbit")

    else
        res.status(200).json("Server & rabbit up");
}


export const addToQueue = async (req: Request, res: Response, rabbitQueue: RabbitClass): Promise<void> => {
    if(!await rabbitHealthCheck()){
        res.status(404).json("rabbitmq down")
        return;
    }

    let rabbitChannel: amqp.Channel | null = rabbitQueue.getChannel();


    try {
        if (rabbitChannel === null) throw ("channel is null");
        const messageBuffed = Buffer.from(JSON.stringify(req.body));

        rabbitChannel.sendToQueue(rabbitQueue.channelName, messageBuffed);
        console.log("sent message to queue - ",rabbitQueue.channelName);

        res.status(200).json("message added to queue");
    } catch (err) {
        console.log(err);
    }
}