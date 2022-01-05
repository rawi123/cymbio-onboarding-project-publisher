import amqp from "amqplib";
import rabbitObj from "./rabbitInterface";

const connectRabbit = async (tries: number = 0): Promise<rabbitObj> => {//class- connect get channel
    try {
        console.log("trying to connect to rabbitmq")
        const connection: amqp.Connection = await amqp.connect("amqp://localhost");
        const channel: amqp.Channel = await connection.createChannel();
        const queue: any = await channel.assertQueue("orders");
        return ({channelProp: channel, resultsProp: queue});

    }
    catch (err) {
        console.log(err, " error connecting to rabbit");
        let obj:rabbitObj=await handelRabbitReconnect(tries);

        return obj;
    }
}

const handelRabbitReconnect=async (tries:number):Promise<rabbitObj>=>{
    let obj:rabbitObj;


    if (tries >= 3) {
        obj = {channelProp: null, resultsProp: null};
        console.log("connection failed 3 retries");
    }

    else {
        await waitForMS(3000)
        obj= await connectRabbit(tries + 1);
    }

    return obj;
}

const waitForMS = async (number: number): Promise<Boolean> => {

    const prom = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, number);
    })

    await prom;
    return true;
}


export default connectRabbit;

