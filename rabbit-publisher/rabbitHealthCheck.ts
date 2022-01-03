import RabbitClass from "./rabbitConnect";
import getRabbitQueue from "./getRabbitQueue";
import {Request, Response} from "express";
import rabbitHealthCheck from "./healthCheck";


export const reConnectRabbitIfDown = async (req: Request, res: Response): Promise<void> => {
    const queue: RabbitClass | null = getRabbitQueue(req.body?.queueName || "");
    if (!queue) {
        res.status(404).json("queue not found!");
        return;
    }

    if (await rabbitHealthCheck()) {
        if (await reConnectRabbit(queue))
            res.status(200).json(`${queue.channelName} is up`);
        else
            res.status(404).json(`connection to ${queue.channelName} queue has failed`);
        return;
    }
    ;

    queue.resetChannel();
    console.log("Could not connect to rabbitmq resetting channel");
    res.status(404).json("Could not connect to rabbitmq resetting channel");

}


const reConnectRabbit = async (queue: RabbitClass): Promise<boolean> => {
    try {
        if (queue.getChannel()) {
            return true;
        }
        await queue.initializeQueue();
        console.log(`${queue.channelName} queue is up!`);
        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
}