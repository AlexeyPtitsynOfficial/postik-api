import express, { Express } from "express";
//import indexRoutes from "./routes/index";
import authRoutes from "./routes/auth";
import usersRoutes from "./routes/users";
import { errorConverter, errorHandler } from "./middlewares";
import connection from "./database/connection";
//const bodyParser = require("body-parser");
//const multer = require("multer");

var path = require("path");
require("dotenv").config();

var app: Express = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.text({ type: "/" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(multer().any());

//app.use("/", indexRoutes);
app.use(authRoutes);
app.use(usersRoutes);

connection
  .sync()
  .then(() => {
    //initial();
    console.log("Synced db.");
  })
  .catch((err: any) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(errorConverter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

export default app;
