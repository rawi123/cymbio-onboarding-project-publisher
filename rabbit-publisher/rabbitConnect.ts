import amqp from "amqplib";
import rabbitObj from "./rabbitInterface";
import connectRabbit from "./rabbitPublisher";



class RabbitClass{
    channelName:string;
    channel:amqp.Channel | null=null ;
    results:any;

    constructor(channel:string) {
        this.channelName=channel;
    }

    async initializeQueue(){
        const rabbitRes:rabbitObj=await connectRabbit();
        this.channel=rabbitRes.channelProp;
        this.results=rabbitRes.resultsProp;
        console.log(this.channel ? `connected to rabbitmq, ${this.channelName}` : "ERROR COULD NOT CONNECT TO RABBITMQ");
    }

    getChannel():amqp.Channel|null{
        return this.channel;
    }

    resetChannel():void{
        this.channel=null;
    }

}
export default RabbitClass;
