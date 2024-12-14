import express, { Express } from "express";
import messagesRouter from "./routes/message";
import { errorConverter, errorHandler } from "./middlewares";

var app:Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(messagesRouter);

app.use(errorConverter);
app.use(errorHandler);

export default app;
