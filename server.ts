
import bodyParser from "body-parser";
import express from "express";
import router from "./router/router"
import cors from "cors";

const app:express.Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

const PORT:Number=5000;

app.listen(PORT, () => {
    console.log("starting server");
});
