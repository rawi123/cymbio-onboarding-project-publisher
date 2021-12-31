import amqp from "amqplib";
import rabbitObj from "./rabbitInterface";

const connectRabbit=async ():Promise<rabbitObj>=>{
    try{
        console.log("trying to connect to rabbitmq")
        const connection:amqp.Connection=await amqp.connect("amqp://localhost");
        const channel:amqp.Channel=await connection.createChannel();
        const queue:any=await channel.assertQueue("orders");

        return ({channelProp:channel,resultsProp:queue});
    }
    catch(err){
        console.log(err," error connecting to rabbit");
        await wait();
        const obj:rabbitObj=await connectRabbit();
        return obj;
    }
}

const wait=async ():Promise<Boolean>=>{

    const prom=new Promise<void>((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },3000);
    })

    await prom;
    return true;
}


export default connectRabbit;

