import amqp from "amqplib";
import rabbitObj from "./rabbitInterface";

const connect=async ():Promise<rabbitObj>=>{
    try{
        console.log("trying to connect")
        const connection:amqp.Connection=await amqp.connect("amqp://localhost");
        const channel:amqp.Channel=await connection.createChannel();
        const results:any=await channel.assertQueue("orders");

        return ({channelProp:channel,resultsProp:results});
    }
    catch(err){
        console.log(err," error connecting to rabbit");
        await wait();
        const obj:rabbitObj=await connect();
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


export default connect;

