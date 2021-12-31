
import bodyParser from "body-parser";
import express from "express";
import router from "./router/router"
import cors from "cors";

const app:express.Application = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);



app.listen(5000, () => {
    console.log("starting server");
});
