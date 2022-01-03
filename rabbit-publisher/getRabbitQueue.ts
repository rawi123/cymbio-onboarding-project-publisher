import RabbitClass from "./rabbitConnect";
import {ordersQueue} from "./createRabbitOrders";

const getRabbitQueue=(queueName:string):RabbitClass|null=>{
    if(queueName==="orders")
        return ordersQueue;
    return null
}
export default getRabbitQueue;
