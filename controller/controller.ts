import {Request, Response} from "express";
import amqp from "amqplib";

export const addToQueue = async (req: Request, res: Response,channel:amqp.Channel|null): Promise<any> => {
    try {
        if(channel===null) throw ("channel is null");
        const messageBuffed=Buffer.from(JSON.stringify(req.body));

        channel.sendToQueue("orders",messageBuffed);
        console.log("sent message to queue - orders");

        return res.status(200).json("message added to queue");
    }
    catch(err){
        console.log(err);
    }
}