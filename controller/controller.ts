import {Request, Response} from "express";
import amqp from "amqplib";

export const addToQueue = async (req: Request, res: Response,channel:amqp.Channel|null): Promise<any> => {
    try {
        if(channel===null) throw ("channel is null");
        channel.sendToQueue("orders",Buffer.from(JSON.stringify(req.body)));
        console.log("sent message to queue - orders");
        return res.status(200).json(req.body);
    }
    catch(err){
        console.log(err);
    }
}