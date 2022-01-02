import bodyParser from "body-parser";
import express from "express";
import router from "./router/router";
import cors from "cors";
import {ordersQueue} from "./rabbit-publisher/createRabbitOrders";


const app: express.Application = express();
const PORT: number = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", router);


ordersQueue.initializeQueue().then();//TODO place in the right place


app.listen(PORT, () => {
    console.log("starting server");
});

