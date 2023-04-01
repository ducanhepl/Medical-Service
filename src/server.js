import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require('dotenv').config();   // giup chay dong process.env

let app = express();

//config app
viewEngine(app);
initWebRoutes(app);


let port = process.env.PORT || 8088;
app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
});